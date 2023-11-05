"use client";

import { useState, useEffect } from "react";
import Analysis from "./analysisCard";
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Link from 'next/link'
import MainLogo from '../ElevateULogo'
import MainLogoMini from '../ElevateULogoShort'
import { ModeToggle } from '@/components/ui/toggle-theme'
import { FinalAnalysis } from "./AnalysisDialog";
import axios from "axios";

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
const HOST = "http://localhost:8000/"







export default function Analyses() {
  
  const router = useRouter()
  const [qsts, setqsts] = useState<CardDataFormat[]>([]);
  const [qstsTemp, setqstsTemp] = useState<Object[]>([]);
  const [curQst, setqst] = useState(0);
  const [netScore, setNetScore] = useState(0);
  const [totQsts, setTotQsts] = useState(0);
  const [finalAnalysis,setFinalAnalysis] = useState("")

  const nextQst = () => {
    setqst((curQst) => curQst+1)
  }
  const prevQst = () => {
    setqst((curQst) => curQst-1)
  }


  const testCall = async () => {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const input_data ={
          "combined_analysis" : localStorage.getItem('analysis'),
        }
        console.log(input_data)

        const {data} = await axios.post(`${HOST}final/`,input_data, config);
        console.log(data)
        setFinalAnalysis(data);
        
      } catch (error) {
        alert("Some error occured. Please try again");
        console.log(error);
      }
}

  
  const filterPipeline = (data : string) => {

      const parsedData = JSON.parse(data);
      const parsedList = parsedData.split('\n');
      // @ts-ignore
      const vals = parsedList.map(line=> line.slice(line.indexOf(' ') + 1));
      // @ts-ignore
      const filteredData = vals.filter(val => val.trim() !== '');

      return filteredData;
  }

  useEffect(() => {
    
    const getDataFromLocalStorage = () => {

      let cummulData : CardDataFormat[] = []
      
      // Question Data
      const questionsData = localStorage.getItem('questionsData'); 
      if (questionsData) {
        const data = filterPipeline(questionsData)

        if(cummulData.length === 0){
          cummulData = new Array(data.length).fill({})
        }

        cummulData = cummulData.map((el, idx) => {
          return {
            ...el,
            'question' : data[idx]
          }
        })
      }
      
      //analysis
      const analysisData = localStorage.getItem('analysis'); 
      if (analysisData) {
        const parsedList = analysisData.split("<SEP>").filter(val => val.trim() !== '').map((el)=>JSON.parse(el));
        cummulData = cummulData.map((el, idx) => {
          return {
            ...el,
            ...parsedList[idx]
          }
        })
      }

      //response
      const responseData = localStorage.getItem('responseData'); 
      if (responseData) {
        const parsedList = responseData.split("<SEP>").filter(val => val.trim() !== '');
        cummulData = cummulData.map((el, idx) => {
          return {
            ...el,
            'response': parsedList[idx] || "Not Answered"
          }
        })
      }
      cummulData = cummulData.map((el, idx) => {
          let rat = 0;
          if(el['Rating']){
            //@ts-ignore
            rat = parseInt(el['Rating'].split('/')[0])
          }
          return {
            ...el,
            'Rating' : rat
          }
      })

      console.log(cummulData);
      setqstsTemp(cummulData);
      
      // setqstsTemp(cummulData);
      if(cummulData.length > 0){
        cummulData.forEach((el) => {
          setNetScore((netScore) => netScore + el['Rating'])
        })
        setNetScore((netScore) => netScore/cummulData.length)
      }
      setTotQsts(cummulData.length)
      setqsts(cummulData)
    };
    getDataFromLocalStorage();

    testCall();
  }, []);


  const deleteFromLocalStorage = (key : string) => {
    if (localStorage.getItem(key) !== null){
      localStorage.removeItem(key); 
    }
  };


  return (
    <>
    <nav className="flex w-screen absolute top-0 left-0 justify-between">
      <Link href="/">
        <MainLogoMini className="h-16 w-16 mt-4 ml-4" />
      </Link>
      {/* <div className="h-16 w-16 mt-4 ml-4">
        <ModeToggle/>
      </div> */}
    </nav>
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-slate-800 bg-[#f7f8fa] ">
      <div className="w-3xl max-w-3xl flex flex-col">
        <p className="text-3xl font-semibold text-gray-600 text-center align-middle">{`🎊 Congrats, you did it! Let's review.`}</p>
        <div className="flex gap-8 mt-10 justify-center items-center">
          <div className="h-32 w-32 shrink-0 grow-0 flex-none">
            <CircularProgressbar 
              value={netScore || 3.5} text={`${netScore || 3.5} / 10`} maxValue={10}
              // value={7.5} text={`7.5 / 10`} maxValue={10}
              styles={buildStyles({
                pathColor: `#1d4ed8`,
                textColor: '#1d4ed8',
                trailColor: '#dbeafe',
                backgroundColor: '#eff6ff',
                textSize: '20px',
              })}
             />
          </div>
          <div className="text-base text-gray-600 leading-6 h-max flex flex-col">
            <p>{`Use the insight buttons to learn more about your answers. Try to reflect on what you said from the perspective of an interviewer. Identify what you'd like to improve, then practice again.`}</p>
            <div className="flex">{<FinalAnalysis data={finalAnalysis}/>}</div>
          </div>
        </div>
      </div>
      <div className="z-10 h-fit pt-8 pb-8 w-full flex font-sans justify-center items-start">
        {
          qsts.map((qst, idx) => {
            return (
            <div key={idx} className={`flex-shrink-0 flex-grow-0 flex-none ${idx === curQst ? 'block' : 'hidden' }`}>
              <Analysis questionData={{...qst}} totQstNum={totQsts} curQstNum={idx+1} nextQst={nextQst} prevQst={prevQst}/>
            </div>)
            } )
        }
      </div>
      <div>
        <Button variant={'outline'} className="bg-blue-50 hover:bg-blue-50 text-blue-600 hover:text-blue-700 text-md font-medium py-3 px-4" 
          onClick={() => {
            deleteFromLocalStorage("questionsData");
            deleteFromLocalStorage("analysis")
            deleteFromLocalStorage("responseData")
            router.push('/session', { scroll: false })
          }}>
          <RotateCcw className="h-6 w-6"></RotateCcw>
          <span className="pl-2">Practice Again</span>
        </Button>
      </div>
    </main>
    </>
  )
}
