"use client";

import { useState, useEffect } from "react";
import Analysis from "./analysisCard";
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

type CardDataFormat = {
  "question" : string,
  "id": number,
  "analysis": string,
  "response": string,
  "score": number
}

const data : CardDataFormat[] = [
  {
    "question" : "Explain the concepts of inheritance, encapsulation, and polymorphism in OOP. Provide an example for each.",
    "id": 0,
    "response" : "Question 1 response",
    "analysis" : "Analyze question 1 response",
    "score" : 8
  },
  {
    "question" : "Design a URL shortening service like Bitly. Discuss the key components and considerations in your design.",
    "id": 1,
    "response" : "Question 2 response",
    "analysis" : "Analyze question 2 response",
    "score" : 5
  },
  {
    "question" : "What is the difference between TCP and UDP? When would you choose one over the other for a network application?",
    "id": 2,
    "response" : "Question 3 response",
    "analysis" : "Analyze question 3 response",
    "score" : 7
  },
  {
    "question" : "Explain the difference between a process and a thread in the context of an operating system. What are the advantages of using threads over processes?",
    "id": 3,
    "response" : "Question 4 response",
    "analysis" : "Analyze question 4 response",
    "score" : 9
  },
  {
    "question" : "Implement a function to check if a given string is a palindrome. Describe the time and space complexity of your solution.",
    "id": 4,
    "response" : "Question 5 response",
    "analysis" : "Analyze question 5 response",
    "score" : 9
  },
]



export default function Analyses() {
  
  const router = useRouter()
  const [qsts, setqsts] = useState(data);
  const [curQst, setqst] = useState(0);

  const nextQst = () => {
    setqst((curQst) => curQst+1)
  }
  const prevQst = () => {
    setqst((curQst) => curQst-1)
  }

  useEffect(() => {
    const getDataFromLocalStorage = () => {
      const questionsData = localStorage.getItem('questionsData'); 
      if (questionsData) {
        const parsedData = JSON.parse(questionsData);
  
        const parsedList = parsedData.split('\n');
  
        // @ts-ignore
        const questions = parsedList.map(line=> line.slice(line.indexOf(' ') + 1));
  
        // @ts-ignore
        const filteredDescriptions = questions.filter(question => question.trim() !== '');
  
        console.log(filteredDescriptions)

        // setqsts(parsedList);
      }
    };
  
    getDataFromLocalStorage();
  }, []);


  const deleteFromLocalStorage = (key : string) => {
    if (localStorage.getItem(key) !== null){
      localStorage.removeItem(key); 
    }
  };


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-slate-800 bg-[#f7f8fa] ">
      <div className="w-3xl max-w-3xl flex flex-col">
        <p className="text-3xl font-semibold text-gray-600 text-center align-middle">{`🎊 Congrats, you did it! Let's review.`}</p>
        <p className="text-lg font-normal text-gray-500 align-middle text-center leading-6 pt-8 max-w-2xl">{`Use the insight buttons to learn more about your answers. Try to reflect on what you said from the perspective of an interviewer. Identify what you'd like to improve, then practice again.`}</p>
      </div>
      <div className="z-10 h-fit pt-8 pb-8 w-full flex font-sans justify-center items-start">
        {
          qsts.map((qst, idx) => {
            return (
            <div key={qst.id} className={`flex-shrink-0 flex-grow-0 flex-none ${idx === curQst ? 'block' : 'hidden' }`}>
              <Analysis questionData={{...qst,total:qsts.length}} curQstNum={idx+1} nextQst={nextQst} prevQst={prevQst}/>
            </div>)
            } )
        }
      </div>
      <div>
        <Button variant={'outline'} className="bg-blue-50 hover:bg-blue-50 text-blue-600 hover:text-blue-700 text-md font-medium py-3 px-4" onClick={() => {deleteFromLocalStorage("questionsData")}}>
          <RotateCcw className="h-6 w-6"></RotateCcw>
          <span className="pl-2">Practice Again</span>
        </Button>
      </div>
    </main>
  )
}
