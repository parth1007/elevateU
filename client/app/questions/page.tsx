"use client";

import { useState } from "react";
import Question from "./questionCard";
import { useRouter } from 'next/navigation'

type CardDataFormat = {
  "question" : string,
  "id": number,
}

const data : CardDataFormat[] = [
  {
    "question" : "Explain the concepts of inheritance, encapsulation, and polymorphism in OOP. Provide an example for each.",
    "id": 0
  },
  {
    "question" : "Design a URL shortening service like Bitly. Discuss the key components and considerations in your design.",
    "id": 1
  },
  {
    "question" : "What is the difference between TCP and UDP? When would you choose one over the other for a network application?",
    "id": 2
  },
  {
    "question" : "Explain the difference between a process and a thread in the context of an operating system. What are the advantages of using threads over processes?",
    "id": 3
  },
  {
    "question" : "Implement a function to check if a given string is a palindrome. Describe the time and space complexity of your solution.",
    "id": 4
  },
]

export default function Questions() {
  
  const router = useRouter()
  const [qsts, setqsts] = useState(data);
  const [curQst, setqst] = useState(0);

  const nextQst = () => {
    if(curQst === (qsts.length-1)){
      router.push('/', { scroll: false })
    }
    setqst((curQst) => curQst+1)
  }

  return (
    <main className="flex h-screen flex-col items-center justify-between p-24 text-slate-800 bg-[#f7f8fa] ">
      <div className="z-10 h-full w-full flex font-sans justify-center items-center">
        {
          qsts.map((qst, idx) => {
            return (
            <div key={qst.id} className={`flex-shrink-0 flex-grow-0 flex-none ${idx === curQst ? 'block' : 'hidden' }`}>
              <Question questionData={{...qst,idx,total:qsts.length}} curQstNum={idx} nextQst={nextQst}/>
            </div>)
            } )
        }
      </div>
    </main>
  )
}
