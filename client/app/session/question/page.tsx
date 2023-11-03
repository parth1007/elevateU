import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Separator } from '@/components/ui/separator'
import { ModeToggle } from '@/components/ui/toggle-theme'
import { KeyboardIcon, Mic } from 'lucide-react'
import Link from 'next/link'

type CardDataFormat = {
  "question" : string,
  "id": number,
}

export default function question(questionData : CardDataFormat) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-slate-800 bg-[#f7f8fa]">
      <div className="z-10 max-w-3xl w-full flex-col items-center justify-center font-sans mt-28">
      <Card className='rounded-2xl shadow-xl p-1 pt-5'>
        <CardHeader>
          <CardTitle className='text-gray-600'>Can you please tell me a bit about yourself?</CardTitle>
        </CardHeader>
        <Separator/>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <Separator/>
        <CardFooter>
          <div className='flex w-full justify-between items-center'>
            <div>
              <Button className='h-12 w-12 accent-blue-600 outline-blue-600 outline-1 bg-blue-50' variant={'outline'} size={'icon'}>
                <KeyboardIcon className='h-8 w-8 text-blue-600 font-thin'></KeyboardIcon>
              </Button>
            </div>
            <div className='flex gap-4 items-center'>
              <Button className='h-12 w-16 accent-blue-600 outline-blue-600 outline-1 text-md text-blue-600 hover:text-blue-700 bg-blue-50' variant={'outline'}>
                Skip
              </Button>
              <Button className='bg-blue-600 h-12 px-6 hover:bg-blue-700 hover:shadow-md'>
                <Mic className='h-6 w-6'></Mic>
                <span className='pl-2 text-lg'>
                    Answer
                </span>
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
      </div>
    </main>
  )
}
