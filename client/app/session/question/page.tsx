import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ModeToggle } from '@/components/ui/toggle-theme'
import Link from 'next/link'

type CardDataFormat = {
  "question" : string,
  "id": number,
}

export default function question(questionData : CardDataFormat) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-slate-800 bg-[#f7f8fa]">
      <div className="z-10 max-w-3xl w-full flex-col items-center justify-center font-sans mt-28">
      <Card className='rounded-2xl shadow-xl p-3'>
        <CardHeader>
          <CardTitle className='text-gray-600'>Can you please tell me a bit about yourself?</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <div className='flex w-full justify-between items-center'>
            <div>
              <Button className='' size={'icon'}></Button>
            </div>
            <div className='flex gap-8 items-center'>
              <Button></Button>
              <Button></Button>
            </div>
          </div>
        </CardFooter>
      </Card>
      </div>
    </main>
  )
}
