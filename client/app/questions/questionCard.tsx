"use client";

import axios from 'axios';
import { useTts } from 'tts-react'
import 'regenerator-runtime/runtime'
import speak from '@/util/textToSpeech';
import type { TTSHookProps } from 'tts-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ModeToggle } from '@/components/ui/toggle-theme'
import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Check, KeyboardIcon, Mic, Text, Speaker } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

// @ts-ignore
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


const HOST = "http://localhost:8000/"

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

  useEffect(() => {
      makeSpeech();
  }, [])

  useEffect(() => {
      if (audioRef.current) {
        //@ts-ignore
        audioRef.current.play();
      }
  }, [audioUrl, audioRef.current, audioRef])


  

  const [isOpen, setIsOpen] = useState(false)
  const [qstState, setQstState] = useState(0);
  // 0 -> Answer --> on click start listening, convert to Done
  // 1 -> Done --> on click end listening --> show transcribed ans
  // 2 -> Next --> on click submit and move to next question


  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const microphoneRef = useRef<HTMLDivElement | null>(null);
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="mircophone-container">
        Browser is not Support Speech Recognition.
      </div>
    );
  }
  const handleListing = () => {
    setIsListening(true);

    if (microphoneRef.current) {
      microphoneRef.current.classList.add("listening");
    }
    SpeechRecognition.startListening({
      continuous: true,
    });
    setQstState(1);
  };
  const stopHandle = () => {
    setIsListening(false);
    if (microphoneRef.current) {
      microphoneRef.current.classList.remove("listening");
    }
    SpeechRecognition.stopListening();
    setQstState(2);

  };
  const handleReset = () => {
    stopHandle();
    resetTranscript();
  };


  // Send User response to Backend
  // @ts-ignore
  const handleNext = async (e) => {
      
      e.preventDefault();

      let answer = transcript
      let question = questionData?.question; 


      if(answer === ""){
        answer = "Sorry, I don't know the answer for this."
      }
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
          const input_data ={
            "question" : question,
            "answer" : answer
          }
          console.log(input_data)
  
          const {data} = await axios.post(`${HOST}analyse/`,input_data, config);

          let analysisData = ""
          if(localStorage.getItem("analysis")){
            // @ts-ignore
            analysisData = localStorage.getItem("analysis")
          }
          localStorage.setItem("analysis", analysisData + "<SEP>" + JSON.stringify(data));


          let responseData = ""
          if(localStorage.getItem("responseData")){
            // @ts-ignore
            responseData = localStorage.getItem("responseData")
          }
          localStorage.setItem("responseData", responseData + "<SEP>" + JSON.stringify(answer));


        } catch (error) {
          alert("API Rate Limit Error. Please try again");

            const error_answer = "Sorry, I'm not sure about this answer"
            const error_data = {
              "Relevance and Accuracy": "Your answer is not relevant to the question as you have stated that you do not know the answer. It is not accurate in providing the necessary information about RESTful services.",
              "Depth of knowledge": "From your answer, it can be inferred that you do not possess knowledge about RESTful services.",
              "Confidence and Clarity": "Your answer lacks confidence and clarity as you have stated that you do not know the answer.",
              "Strong topics": "It is evident that you do not have knowledge about RESTful services.",
              "Weak topics": "Your answer shows a lack of knowledge about RESTful services and its benefits.",
              "Rating": "1/10"
            }

            let analysisData = ""
            if(localStorage.getItem("analysis")){
              // @ts-ignore
              analysisData = localStorage.getItem("analysis")
            }
            localStorage.setItem("analysis", analysisData + "<SEP>" + JSON.stringify(error_data));


            let responseData = ""
            if(localStorage.getItem("responseData")){
              // @ts-ignore
              responseData = localStorage.getItem("responseData")
            }
            localStorage.setItem("responseData", responseData + "<SEP>" + JSON.stringify(error_answer));



          console.log(error);
        }
  
    
      nextQst()
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
              {transcript ? transcript: "Transcribing answer..."}
              </p>
            </div>
          </CardContent>
          <Separator/>
      </CollapsibleContent> 
      <CardFooter className='pt-4'>
          <div className='flex w-full justify-between items-center'>
          <div>
              <Button className='h-12 w-12 accent-blue-600 outline-blue-600 outline-1 bg-blue-50' variant={'outline'} size={'icon'}>
              <KeyboardIcon className='h-8 w-8 text-blue-600 font-thin' onClick={makeSpeech}></KeyboardIcon>
              </Button>
          </div>
          <div className='flex gap-4 items-center'>
              {
                (qstState === 0) && (
                  <Button className='h-12 w-16 accent-blue-600 outline-blue-600 outline-1 text-md text-blue-600 hover:text-blue-700 bg-blue-50' variant={'outline'} onClick={handleNext}>
                    {questionData.idx !== questionData.total-1 ? "Skip" : "End" }
                  </Button>
                )
              }
              {
                (qstState === 0) && (
                  <CollapsibleTrigger asChild>
                    <Button className='bg-blue-600 h-12 px-6 hover:bg-blue-700 hover:shadow-md' 
                      // @ts-ignore
                      ref={microphoneRef}
                      onClick={handleListing}
                    >
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
                  <Button className='bg-blue-600 h-12 px-6 hover:bg-blue-700 hover:shadow-md' onClick={stopHandle}>
                    <Check className='h-6 w-6'></Check>
                    <span className='pl-2 text-lg'>
                        Done
                    </span>
                  </Button>
                )
              } 
              {
                (qstState === 2) && (
                  <Button className='bg-blue-600 h-12 px-6 hover:bg-blue-700 hover:shadow-md' onClick={handleNext}>
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


