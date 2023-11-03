"use client";

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Separator } from '@/components/ui/separator'
import { ModeToggle } from '@/components/ui/toggle-theme'
import { ArrowLeft, ArrowRight, Check, KeyboardIcon, Mic, Text } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react';

type CardDataFormat = {
  "question" : string,
  "id": number,
  "analysis": string,
  "response": string,
  "score": number,
  "total": number
}

export default function Analysis({ 
  questionData,
  curQstNum,
  nextQst,
  prevQst
} : {
  questionData:CardDataFormat,
  curQstNum:number,
  nextQst: ()=>void
  prevQst: ()=>void
}) {

  
  const [isOpen, setIsOpen] = useState(false)
  const [qstState, setQstState] = useState(0);


  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      asChild
    >
      <Card className='rounded-2xl shadow-xl p-1 pt-3 w-[800px] flex-none shrink-0'>
      <CardHeader>
          <div className='w-full flex justify-center items-center gap-8'>
            <Button size={'icon'} variant={`${curQstNum > 1 ? 'outline' : 'ghost'}`}  className={`${curQstNum > 1 ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-600'}`} disabled={curQstNum == 1} onClick={prevQst}>
              <ArrowLeft className='h-6 w-6 text-blue-600'/>
            </Button>
            <div className='flex gap-1'>
              <div className='w-max text-gray-700'>{curQstNum}</div>
              <div className='w-max text-blue-600 font-medium'>{`/ ${questionData.total}`}</div>
            </div>
            <Button size={'icon'} variant={`${curQstNum > 1 ? 'outline' : 'ghost'}`}  className={`${curQstNum < questionData.total ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-600'}`} disabled={curQstNum == questionData.total} onClick={nextQst}>
              <ArrowRight className='h-6 w-6 text-blue-600'/>
            </Button>
          </div>
          <CardTitle className='text-gray-600 leading-8 pr-4'>{questionData.question ? questionData.question : 'Can you please tell me a bit about yourself?'}</CardTitle>
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
              <KeyboardIcon className='h-8 w-8 text-blue-600 font-thin'></KeyboardIcon>
              </Button>
          </div>
          <div className='flex gap-4 items-center'>
              {
                (qstState === 0) && (
                  <Button className='h-12 w-16 accent-blue-600 outline-blue-600 outline-1 text-md text-blue-600 hover:text-blue-700 bg-blue-50' variant={'outline'} onClick={nextQst}>
                    Skip
                  </Button>
                )
              }
              {/* {
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
                        Next
                    </span>
                  </Button> 
                )
              } */}
          </div>
          </div>
      </CardFooter>
      </Card>
    </Collapsible>
  )
}
