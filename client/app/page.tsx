"use client"

import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ui/toggle-theme'
import Link from 'next/link'
import {useState, useEffect} from 'react'

export default function Home() {
  const subjects = ["Cybersecurity","Software Engineering", "UI/UX designer","Web developer","App Developer","Management"]

  const [subIdx, setSubIdx] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSubIdx((subIdx) => (subIdx+1)%subjects.length)
    }, 2000);

    return () => clearInterval(interval);
  }, []);
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-slate-800 bg-[#f7f8fa]">
      <div className="z-10 max-w-3xl w-full flex-col items-center justify-center font-sans mt-28">
        <div className='flex flex-col max-w-xl m-auto items-center justify-center gap-2 space-x-3'>
          <div className="text-7xl font-semibold flex-col justify-center items-center w-max text-gray-600 space-x-0"> elevate 
            <span className="pl-2 text-6xl font-bold text-blue-600">U</span> 
          </div>
          <div className='text-3xl w-max font-light italic antialiased'>AI Mock Interviews</div>
        </div>
        <div className='mt-12 flex flex-col justify-center items-center text-lg font-medium text-gray-600'>
          <div className=''>
            A quick way to prepare for your next interview in 
          </div>
          <span className='text-sky-600 font-semibold px-2 py-1 mx-1 bg-sky-100 rounded-md'>
            {subjects[subIdx]}
          </span>
          <div className='justify-center text-center pt-6 max-w-xl leading-6 font-normal'>Pepare for your next interview. Practice key questions, get insights about your answers, and get more comfortable interviewing.
</div>
        </div>
        <div className='actions mt-16 flex gap-6 items-center justify-center'>
          <Button variant={'ghost'} size={'lg'} className='text-gray-600 text-md hover:bg-blue-50 hover:text-gray-700' asChild> 
            <Link href="/info">How it Works?</Link>
          </Button>
          <Button variant={'default' } size={'lg'} className='bg-blue-600 text-md hover:bg-blue-700 hover:shadow-sm hover:drop-shadow-md' asChild> 
            <Link href="/session">Start Practicing</Link> 
          </Button>
        </div>
      </div>
    </main>
  )
}
