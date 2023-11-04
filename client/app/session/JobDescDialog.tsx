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

export function UploadJD() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="ml-3 text-sm gap-1 flex cursor-pointer">
            <span>
            or Upload 
            </span>
            <span className="text-blue-600 font-semibold cursor-pointer">
            Job Description
            </span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[725px] bg-white rounded-xl">
        <DialogHeader>
          <DialogTitle>Input Job Description</DialogTitle>
          <DialogDescription>
            {"Make changes to your profile here. Click save when you're done."}
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
