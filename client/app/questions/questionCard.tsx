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
import 'regenerator-runtime/runtime'

//@ts-ignore
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

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



// function SpeakerApp() {
//   const { transcript, resetTranscript } = useSpeechRecognition();
//   const [isListening, setIsListening] = useState(false);
//   const microphoneRef = useRef(null);
//   if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
//     return (
//       <div className="mircophone-container">
//         Browser is not Support Speech Recognition.
//       </div>
//     );
//   }
//   const handleListing = () => {
//     setIsListening(true);
//     // @ts-ignore
//     microphoneRef.current.classList.add("listening");
//     SpeechRecognition.startListening({
//       continuous: true,
//     });
    
//   };
//   const stopHandle = () => {
//     console.log(transcript)
//     setIsListening(false);
//     // @ts-ignore
//     microphoneRef.current.classList.remove("listening");
//     SpeechRecognition.stopListening();
//     console.log("this:", transcript)

//   };
//   const handleReset = () => {
//     stopHandle();
//     resetTranscript();
//   };
//   return (
//     <div className="microphone-wrapper">
//       <div className="mircophone-container">
//         <div
//           className="microphone-icon-container"
//           ref={microphoneRef}
//           onClick={handleListing}
//         >
//           {/* <img src={microPhoneIcon} className="microphone-icon" /> */}
//           <p>Speak</p>
//         </div>
//         <div className="microphone-status">
//           {isListening ? "Listening........." : "Click to start Listening"}
//         </div>
//         {isListening && (
//           <button className="microphone-stop btn" onClick={stopHandle}>
//             Stop
//           </button>
//         )}
//       </div>
//       {transcript && (
//         <div className="microphone-result-container">
//           <div className="microphone-result-text">{transcript}</div>
//           <button className="microphone-reset btn" onClick={handleReset}>
//             Reset
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }





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
  }, [audioUrl, audioRef.current, audioRef])


  

  const [isOpen, setIsOpen] = useState(false)
  const [qstState, setQstState] = useState(0);
  // 0 -> Answer --> on click start listening, convert to Done
  // 1 -> Done --> on click end listening --> show transcribed ans
  // 2 -> Next --> on click submit and move to next question

  // const [audioBlob, setAudioBlob] = useState(new Blob);
  // const [recorder, setRecorder] = useState(null);
  // const [transcription, setTranscription] = useState("");





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
    console.log("hhh",transcript)
    setIsListening(false);
    if (microphoneRef.current) {
      microphoneRef.current.classList.remove("listening");
    }
    SpeechRecognition.stopListening();
    console.log("this:", transcript)

    setQstState(2);

  };
  const handleReset = () => {
    stopHandle();
    resetTranscript();
  };


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
      {/* <SpeakerApp/> */}
      <Separator/>
      <CollapsibleContent>
          <CardContent className='bg-[#fafbfc] p-4'>
            <div className='w-full flex gap-4 items-center pl-3'>
              <Text className='text-gray-700'></Text>
              <p className='text-gray-500 text-lg font-medium'>
                {/* Transcribing answer... */}
                {transcript}
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
                  <Button className='h-12 w-16 accent-blue-600 outline-blue-600 outline-1 text-md text-blue-600 hover:text-blue-700 bg-blue-50' variant={'outline'} onClick={nextQst}>
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
