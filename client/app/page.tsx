"use client"

import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ui/toggle-theme'
import Link from 'next/link'
import {useState, useEffect} from 'react'
import MainLogo from './ElevateULogo'
import MainLogoMini from './ElevateULogoShort'

export default function Home() {
  const subjects = ["Cybersecurity","Software Engineering", "UI/UX designer","Web developer","App Developer","Management"]

  const [subIdx, setSubIdx] = useState(0)

  
  const deleteFromLocalStorage = (key : string) => {
    if (localStorage.getItem(key) !== null){
      localStorage.removeItem(key); 
    }
  };

  useEffect(() => {
    deleteFromLocalStorage("questionsData")
    deleteFromLocalStorage("analysis")
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSubIdx((subIdx) => (subIdx+1)%subjects.length)
    }, 2000);

    return () => clearInterval(interval);

  }, []);


  
  

  return (
    <>
      <nav className="flex w-screen absolute top-0 left-0 justify-between">
        <Link href="/">
          <MainLogoMini className="h-16 w-16 mt-4 ml-4" />
        </Link>
        <div className="h-16 w-16 mt-4 ml-4">
          <ModeToggle/>
        </div>
      </nav>
      <main className="flex min-h-screen flex-col items-center justify-between p-24 text-slate-800 bg-[#f7f8fa] dark:bg-gray-900">
        <div className="z-10 max-w-3xl w-full flex-col items-center justify-center font-sans mt-28">
          <div className='flex flex-col max-w-xl mx-auto items-center justify-center gap-2 space-x-3 w-full'>
            {/* <div className="text-7xl font-semibold flex-col justify-center items-center w-max text-gray-600 space-x-0"> elevate 
              <span className="pl-2 text-6xl font-bold text-blue-600">U</span> 
            </div> */}
            <MainLogo className="h-[108px]"/>
            <span className="h-[136px]"></span>
            <div className='text-3xl w-max font-light italic antialiased mt-1 dark:text-white'>AI Mock Interviews</div>
          </div>
          <div className='mt-12 flex flex-col justify-center items-center text-lg font-medium text-gray-600 dark:text-gray-300'>
            <div className=''>
              A quick way to prepare for your next interview in 
            </div>
            <span className='text-sky-600 font-semibold px-2 py-1 mx-1 bg-sky-100 rounded-md dark:bg-slate-700 dark:text-slate-300'>
              {subjects[subIdx]}
            </span>
            <div className='justify-center text-center pt-6 max-w-xl leading-6 font-normal dark:text-gray-400'>Pepare for your next interview. Practice key questions, get insights about your answers, and get more comfortable interviewing.
  </div>
          </div>
          <div className='actions mt-16 flex gap-6 items-center justify-center'>
            <Button variant={'ghost'} size={'lg'} className='text-gray-600 text-md hover:bg-blue-50 hover:text-gray-700 dark:text-gray-400' asChild> 
              <Link href="/">How it Works?</Link>
            </Button>
            <Button variant={'default' } size={'lg'} className='bg-blue-600 text-md hover:bg-blue-700 hover:shadow-sm hover:drop-shadow-md text-white' asChild> 
              <Link href="/session">Start Practicing</Link> 
            </Button>
          </div>
        </div>
      </main>
    </>
  )
}
