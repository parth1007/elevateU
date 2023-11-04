"use client";

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Separator } from '@/components/ui/separator'
import { ModeToggle } from '@/components/ui/toggle-theme'
import { ArrowRight, Check, KeyboardIcon, Mic, Text, Speaker } from 'lucide-react'
import Link from 'next/link'
import { useTts } from 'tts-react'
import type { TTSHookProps } from 'tts-react'
import React, { useState, useEffect, useRef } from 'react';
import {audioBlobToBase64, convertToMP3} from '@/util/transcribe';
import axios from 'axios';
import speak from '@/util/textToSpeech';

type CardDataFormat = {
  "question" : string,
  "id": number,
  "idx": number,
  "total": number
}
type SpeakProps = Pick<TTSHookProps, 'children'>

const Speak = ({ children }: SpeakProps) => (
  <>{useTts({ children, autoPlay: true }).ttsChildren}</>
)

export default function Question({ 
  questionData,
  curQstNum,
  nextQst
} : {
  questionData:CardDataFormat,
  curQstNum:number,
  nextQst: ()=>void
}) {

  // Text to Speech
  const [audioUrl, setAudioUrl] = useState<string>('');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const makeSpeech = async () => {
    await speak(questionData.question, setAudioUrl);
    
  }
  // Call the function to make the API request
  useEffect(() => {
    // makeSpeech()
    makeSpeech();
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      //@ts-ignore
      audioRef.current.play();
    }
  }, [audioUrl])


  

  const [isOpen, setIsOpen] = useState(false)
  const [qstState, setQstState] = useState(0);
  // 0 -> Answer --> on click start listening, convert to Done
  // 1 -> Done --> on click end listening --> show transcribed ans
  // 2 -> Next --> on click submit and move to next question

  const [audioBlob, setAudioBlob] = useState(new Blob);
  const [recorder, setRecorder] = useState(null);
  const [transcription, setTranscription] = useState("");

  // Cleanup function to stop recording and release media resources
  useEffect(() => {
    return () => {
      if (recorder) {
        //@ts-ignore
        recorder.stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [recorder]);

  const startListening = async () => {
    try {
      setQstState(1);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      recorder.start();

      let recData : Blob[] = [];

      recorder.addEventListener('start', e => {
        recData.length = 0;
      })

      recorder.addEventListener('dataavailable', async (event: BlobEvent) => {
        // console.log(event.data);
        recData.push(event.data)
      });

      recorder.addEventListener('stop', async () => {
        //@ts-ignore
        const finData = new Blob(recData, {
          'type': 'audio/mp3'
        });
        console.log(finData);
        
        // API Call to Eden
        try{
          const startTime = performance.now();
          
          const apiConfig = {
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_KEY_EDEN}`,
          }

          const response = await axios.post(
            `https://api.edenai.run/v2/audio/speech_to_text_async`,
            apiConfig,
            // data: {

            // }
            );

          const endTime = performance.now();
          const elapsedTime = endTime - startTime;
          console.log('Time taken (ms):', elapsedTime);

          if (response.data.results && response.data.results.length > 0) {
            setTranscription(response.data.results[0].alternatives[0].transcript);
          } else {
            console.log('No transcription results in the API response:', response.data);
            setTranscription('');
          }

        } catch(error){
          //@ts-ignore
          console.error('Error with Google Speech-to-Text API:', error.response.data)
          setTranscription('');
        }

      })

      //@ts-ignore
      setRecorder(recorder);
      setQstState(1);
      
    } catch (error) {
      console.error('Error getting user media:', error);
      setTranscription("");
      setQstState(0);
    }
  }

  
  // const startListening = async () => {
  //   setQstState(1);
  //   navigator.mediaDevices.getUserMedia({ audio: true }).then(async (stream) => {
  //     // @ts-ignore
  //     setAudioStream(stream);

  //   });
  // }

  const endListening = () => {
    if (recorder) {
      //@ts-ignore
      recorder.stop();
      console.log('Recording stopped', recorder);
      setQstState(2);
    }
    setQstState(2);
  }

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      asChild
    >
      <Card className='rounded-2xl shadow-xl p-1 pt-3 w-[800px] flex-none shrink-0'>
      <CardHeader>
          <div className='w-full flex justify-end items-end'>
            <div className='flex gap-1'>
              <div className='w-max text-gray-700'>{questionData.idx+1}</div>
              <div className='w-max text-blue-600 font-medium'>{`/ ${questionData.total}`}</div>
            </div>
          </div>
          <CardTitle className='text-gray-600 leading-8 pr-4'>
            <Speak>
              {questionData.question}
            </Speak>
          </CardTitle>
      </CardHeader>
      <Separator/>
      <CollapsibleContent>
          <CardContent className='bg-[#fafbfc] p-4'>
            <div className='w-full flex gap-4 items-center pl-3'>
              <Text className='text-gray-700'></Text>
              <p className='text-gray-500 text-lg font-medium'>
                Transcribing answer...
              </p>
            </div>
          </CardContent>
          <Separator/>
      </CollapsibleContent> 
      <CardFooter className='pt-4'>
          <div className='flex w-full justify-between items-center'>
          <div>
              <Button className='h-12 w-12 accent-blue-600 outline-blue-600 outline-1 bg-blue-50' variant={'outline'} size={'icon'}>
              <Speaker className='h-8 w-8 text-blue-600 font-thin' onClick={makeSpeech}></Speaker>
              </Button>
          </div>
          <div className='flex gap-4 items-center'>
              {
                (qstState === 0) && (
                  <Button className='h-12 w-16 accent-blue-600 outline-blue-600 outline-1 text-md text-blue-600 hover:text-blue-700 bg-blue-50' variant={'outline'} onClick={nextQst}>
                    {questionData.idx !== questionData.total-1 ? "Skip" : "End" }
                  </Button>
                )
              }
              {
                (qstState === 0) && (
                  <CollapsibleTrigger asChild>
                    <Button className='bg-blue-600 h-12 px-6 hover:bg-blue-700 hover:shadow-md' onClick={startListening}>
                      <Mic className='h-6 w-6'></Mic>
                      <span className='pl-2 text-lg'>
                          Answer
                      </span>
                    </Button>
                  </CollapsibleTrigger>
                ) 
              }
              {  
                (qstState === 1) && (
                  <Button className='bg-blue-600 h-12 px-6 hover:bg-blue-700 hover:shadow-md' onClick={endListening}>
                    <Check className='h-6 w-6'></Check>
                    <span className='pl-2 text-lg'>
                        Done
                    </span>
                  </Button>
                )
              } 
              {
                (qstState === 2) && (
                  <Button className='bg-blue-600 h-12 px-6 hover:bg-blue-700 hover:shadow-md' onClick={nextQst}>
                    <ArrowRight className='h-6 w-6'></ArrowRight>
                    <span className='pl-2 text-lg'>
                    {questionData.idx !== questionData.total-1 ? "Next" : "End" }
                    </span>
                  </Button> 
                )
              }
          </div>
          </div>
      </CardFooter>
      </Card>
    </Collapsible>
  )
}
