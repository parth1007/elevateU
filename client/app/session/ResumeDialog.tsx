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

export function UploadResume() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full h-24 bg-blue-100 my-5 mb-8 flex justify-center items-center text-lg text-blue-700 rounded-md borer border-4 border-dashed border-blue-700 hover:border-blue-800 hover:bg-blue-200 cursor-pointer transition-all ease-in-out">
            <UploadCloud ></UploadCloud>
            <span className="pl-2 font-semibold">
                Upload your Resume
            </span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[725px] bg-white rounded-xl">
        <DialogHeader>
          <DialogTitle>Input Job Description</DialogTitle>
          <DialogDescription>
            {"Make changes to the Job Description here. Click save when you're done."}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
            <Textarea className="text-sm"/>
            <p className="text-sm text-muted-foreground">
                Job Description will be used to find relevent tags for interview
            </p>
        </div>
        <DialogFooter className="mt-4">
            <DialogClose asChild>
            <Button type="submit">Upload</Button>
            </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
