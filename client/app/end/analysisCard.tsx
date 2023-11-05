"use client";

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ModeToggle } from '@/components/ui/toggle-theme'
import { ArrowLeft, ArrowRight, Check, KeyboardIcon, Mic, Text } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react';

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

type CardDataFormat = {
  "question" : string,
  "analysis": string | null,
  "response": string | null,
  "Rating": number,
  "Confidence and Clarity": string | null,
  "Depth of knowledge": string | null,
  "Relevance and Accuracy": string | null,
  "Strong topics": string | null,
  "Weak topics": string | null,
}

export default function Analysis({ 
  questionData,
  curQstNum,
  totQstNum,
  nextQst,
  prevQst
} : {
  questionData:CardDataFormat,
  curQstNum:number,
  totQstNum:number,
  nextQst: ()=>void
  prevQst: ()=>void
}) {

  
  const [isOpen, setIsOpen] = useState(false)
  const [qstState, setQstState] = useState(0)
  const [scoreInfo, setScoreInfo] = useState(["text-","",""])

  const score_type = () => {
      if(questionData.Rating <= 4){
        setScoreInfo(["text-red-600", "😔", "Poor  "])
      }
      else if(questionData.Rating <=7){
        setScoreInfo(["text-orange-600", "😎", "Great!"])
      }
      else{
        setScoreInfo(["text-green-600", "🫡", "Awesome!"])
      }
  }

  useEffect(() => {
    score_type();
  
  }, [])
  


  return (
      <Card className='rounded-2xl shadow-xl p-1 pt-3 w-[800px] flex-none shrink-0 text-or'>
      <CardHeader>
          <div className='w-full flex justify-center items-center gap-8'>
            <Button size={'icon'} variant={`${curQstNum > 1 ? 'outline' : 'ghost'}`}  className={`${curQstNum > 1 ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-600'}`} disabled={curQstNum == 1} onClick={prevQst}>
              <ArrowLeft className='h-6 w-6 text-blue-600'/>
            </Button>
            <div className='flex gap-1'>
              <div className='w-max text-gray-600 font-medium'>{curQstNum}</div>
              <div className='w-max text-blue-600 font-medium'>{`/ ${totQstNum}`}</div>
            </div>
            <Button size={'icon'} variant={`${curQstNum > 1 ? 'outline' : 'ghost'}`}  className={`${curQstNum < totQstNum ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-600'}`} disabled={curQstNum == totQstNum} onClick={nextQst}>
              <ArrowRight className='h-6 w-6 text-blue-600'/>
            </Button>
          </div>
          <CardTitle className='text-gray-600 leading-8 pr-[1rem] flex justify-between items-center gap-2'>
            <span>{questionData.question ? questionData.question : 'Can you please tell me a bit about yourself?'}</span>
            <span className="text-md text-blue-600 p-4 bg-blue-50 rounded-lg">{`${questionData.Rating}/10`}</span>
          </CardTitle>
      </CardHeader>
      <Separator/>
      <CardContent className='pt-4 bg-[#fafbfc]'>
          <div className='flex w-full justify-center items-center'>
            <div className='flex w-full justify-center items-center flex-col'>
                      {/* <div className="w-full flex justify-center items-center p-4 gap-2">
                        <span className='text-2xl leading-6'>{scoreInfo[1]}</span>
                        <p className={`text-xl leading-6 ${scoreInfo[0]} text-center align-middle font-semibold`}>{`${scoreInfo[2]}  You Scored ${questionData.Rating} in this Question`}</p>
                      </div>
                    <br/> */}

                  <Tabs defaultValue="account" className="w-full">
                      <TabsList className="grid w-full grid-cols-2 p-2 h-auto">
                        <TabsTrigger value="account" className="text-base text-gray-800 data-[state=active]:bg-white data-[state=active]:drop-shadow-sm">Analysis</TabsTrigger>
                        <TabsTrigger value="password" className="text-base text-gray-800 data-[state=active]:bg-white data-[state=active]:drop-shadow-sm">Your Response</TabsTrigger>
                      </TabsList>
                      <TabsContent value="account" className='bg-transparent outline-none ring-0'>
                        <Card className='outline-0 border-0 p-0 m-0 bg-transparent shadow-none'>
                          <CardHeader className='p-4'>
                            <CardDescription className="text-base flex flex-col gap-2">
                              <div className="flex gap-2">{questionData['analysis']}</div>
                              {
                                questionData['Confidence and Clarity'] && 
                                <div className="flex gap-2"><span className="min-w-[200px] font-bold ">{"Confidence and Clarity: "}</span>{questionData['Confidence and Clarity']}</div>
                              }
                              {
                                questionData['Depth of knowledge'] && 
                                <div className="flex gap-2"><span className="min-w-[200px] font-bold ">{"Depth of knowledge: "}</span>{questionData['Depth of knowledge']}</div>
                              }
                              {
                                questionData['Relevance and Accuracy'] && 
                                <div className="flex gap-2"><span className="min-w-[200px] font-bold ">{"Relevance and Accuracy: "}</span>{questionData['Relevance and Accuracy']}</div>
                              }
                              {
                                questionData['Strong topics'] && 
                                <div className="flex gap-2"><span className="min-w-[200px] font-bold ">{"Strong topics: "}</span>{questionData['Strong topics']}</div>
                              }
                              {
                                questionData['Weak topics'] && 
                                <div className="flex gap-2"><span className="min-w-[200px] font-bold ">{"Weak topics: "}</span>{questionData['Weak topics']}</div>
                              }
                            </CardDescription>
                          </CardHeader>

                        </Card>
                      </TabsContent>
                      <TabsContent value="password">
                        <Card className='outline-0 border-0 p-0 m-0 bg-transparent shadow-none'>
                          <CardHeader className='p-4'>
                            <CardDescription className="text-base">
                              {questionData.response}
                            </CardDescription>
                          </CardHeader>
                        </Card>
                      </TabsContent>
                  </Tabs>
            </div>
          </div>
      </CardContent>
      </Card>
  )
}
