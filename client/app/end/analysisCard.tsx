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
  const [qstState, setQstState] = useState(0)
  const [scoreInfo, setScoreInfo] = useState(["text-","",""])

  const score_type = () => {
      if(questionData.score <= 4){
        setScoreInfo(["text-red-600", "😔", "Poor  "])
      }
      else if(questionData.score <=7){
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
              <div className='w-max text-blue-600 font-medium'>{`/ ${questionData.total}`}</div>
            </div>
            <Button size={'icon'} variant={`${curQstNum > 1 ? 'outline' : 'ghost'}`}  className={`${curQstNum < questionData.total ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-600'}`} disabled={curQstNum == questionData.total} onClick={nextQst}>
              <ArrowRight className='h-6 w-6 text-blue-600'/>
            </Button>
          </div>
          <CardTitle className='text-gray-600 leading-8 pr-[1rem]'>{questionData.question ? questionData.question : 'Can you please tell me a bit about yourself?'}</CardTitle>
      </CardHeader>
      <Separator/>
      <CardContent className='pt-4 bg-[#fafbfc]'>
          <div className='flex w-full justify-center items-center'>
            <div className='flex w-full justify-center items-center flex-col'>
                      <div className="w-full flex justify-center items-center p-4 gap-2">
                        <span className='text-2xl leading-6'>{scoreInfo[1]}</span>
                        <p className={`text-xl leading-6 ${scoreInfo[0]} text-center align-middle font-semibold`}>{`${scoreInfo[2]}  You Scored ${questionData.score} in this Question`}</p>
                      </div>
                    <br/>

                  <Tabs defaultValue="account" className="w-full">
                      <TabsList className="grid w-full grid-cols-2 p-2 h-auto">
                        <TabsTrigger value="account" className="text-base text-gray-800">Analysis</TabsTrigger>
                        <TabsTrigger value="password" className="text-base text-gray-800">Your Response</TabsTrigger>
                      </TabsList>
                      <TabsContent value="account">
                        <Card className='bg-transparent'>
                          <CardHeader>
                            {/* <CardTitle>Analysis</CardTitle> */}
                            <CardDescription>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit voluptas cupiditate velit minima accusamus mollitia ad praesentium voluptate eveniet. Similique illo repellendus ratione, sint qui, fugit aut quibusdam excepturi sequi sapiente optio, voluptates facere quod sed blanditiis eum temporibus iste placeat facilis libero iure praesentium? Dolores magnam distinctio neque, odio molestiae, tempore nobis maiores quibusdam commodi veritatis illo ratione provident at. Recusandae sapiente ut accusantium quasi non doloremque! Animi, nulla sed consequatur esse quas quibusdam corporis consectetur illo repudiandae beatae, iure magni! Maiores ipsa id earum, perferendis eum suscipit eveniet at molestias cum excepturi, reprehenderit laboriosam velit. Itaque accusamus, corrupti repellat vel sunt maxime. Numquam sed iusto quos, magnam quo accusamus rem, laboriosam ad blanditiis, magni tempora beatae expedita praesentium quasi? Officiis eos, commodi distinctio fugit dolorum neque animi dicta quibusdam soluta quaerat maiores illum nesciunt magnam enim beatae, tempora illo deserunt minus. Reiciendis, maxime eos quisquam voluptatum repudiandae id doloremque delectus atque dolores enim suscipit hic modi saepe, laborum deleniti. Tenetur corporis a iure, quo dolor recusandae voluptates commodi. Corrupti corporis itaque molestias debitis deleniti dolores blanditiis sequi magnam a, ad similique quia, animi maxime quisquam eos ut quae mollitia fugiat excepturi? Tempora quidem inventore, sed id accusantium similique, ipsam incidunt excepturi voluptatem in quia ullam maiores eos officia rem numquam quaerat placeat saepe et quisquam consectetur beatae cumque aliquid. Quaerat dolor sequi maiores facilis vel, reprehenderit, enim atque unde nulla dolore libero aliquid nam laudantium placeat sapiente corporis? Repellendus nulla reiciendis maxime nostrum libero deserunt saepe labore, illo velit ut corrupti dicta modi corporis.
                            </CardDescription>
                          </CardHeader>

                        </Card>
                      </TabsContent>
                      <TabsContent value="password">
                        <Card className='bg-transparent'>
                          <CardHeader>
                            <CardDescription>
                              Response...
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit voluptas cupiditate velit minima accusamus mollitia ad praesentium voluptate eveniet. Similique illo repellendus ratione, sint qui, fugit aut quibusdam excepturi sequi sapiente optio, voluptates facere quod sed blanditiis eum temporibus iste placeat facilis libero iure praesentium? Dolores magnam distinctio neque, odio molestiae, tempore nobis maiores quibusdam commodi veritatis illo ratione provident at. Recusandae sapiente ut accusantium quasi non doloremque! Animi, nulla sed consequatur esse quas quibusdam corporis consectetur illo repudiandae beatae, iure magni! Maiores ipsa id earum, perferendis eum suscipit eveniet at molestias cum excepturi, reprehenderit laboriosam velit. Itaque accusamus, corrupti repellat vel sunt maxime. Numquam sed iusto quos, magnam quo accusamus rem, laboriosam ad blanditiis, magni tempora beatae expedita praesentium quasi? Officiis eos, commodi distinctio fugit dolorum neque animi dicta quibusdam soluta quaerat maiores illum nesciunt magnam enim beatae, tempora illo deserunt minus. Reiciendis, maxime eos quisquam voluptatum repudiandae id doloremque delectus atque dolores enim suscipit hic modi saepe, laborum deleniti. Tenetur corporis a iure, quo dolor recusandae voluptates commodi. Corrupti corporis itaque molestias debitis deleniti dolores blanditiis sequi magnam a, ad similique quia, animi maxime quisquam eos ut quae mollitia fugiat excepturi? Tempora quidem inventore, sed id accusantium similique, ipsam incidunt excepturi voluptatem in quia ullam maiores eos officia rem numquam quaerat placeat saepe et quisquam consectetur beatae cumque aliquid. Quaerat dolor sequi maiores facilis vel, reprehenderit, enim atque unde nulla dolore libero aliquid nam laudantium placeat sapiente corporis? Repellendus nulla reiciendis maxime nostrum libero deserunt saepe labore, illo velit ut corrupti dicta modi corporis.
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
