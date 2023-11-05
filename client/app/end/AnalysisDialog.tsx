import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { UploadCloud } from "lucide-react"
import { useState } from "react";
import axios from "axios";


export function FinalAnalysis({data} : {
    data:string
}) {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'default' } size={'default'} className='bg-blue-600 text-md hover:bg-blue-700 hover:shadow-sm hover:drop-shadow-md text-white px-4 mt-4 ml-auto'> 
            Analyze
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[725px] bg-white rounded-xl">
        <DialogHeader>
          <DialogTitle>Overall Analysis</DialogTitle>
          <DialogDescription className="mt-4 text-sm font-medium">
            {data}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
            <DialogClose asChild>
            <Button type="submit">Close</Button>
            </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
