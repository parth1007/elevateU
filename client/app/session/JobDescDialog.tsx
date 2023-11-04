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
import axios from "axios";
import { useState, Dispatch, SetStateAction } from "react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"


export function UploadJD({
  setSelectedTags, 
  selectedTags
}:{
  setSelectedTags:Dispatch<SetStateAction<string[]>> , 
  selectedTags:string[]
}) {

  // const [tags, setTags] = useState([])
  const [jobDesc, setJobDesc] = useState("")


  const makeAPICall = async () => {
    const apiKey = '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'; 
    const endpoint = 'https://api.openai.com/v1/engines/gpt-3.5-turbo-instruct/completions'; 
    
    if(jobDesc === ""){
      alert("Please enter Job description")
      return;
    }

    try {
      const input_prompt = {
        prompt: `Job description - ${jobDesc}
        Extract the top 5 necessary keywords for the interview from the given job description. Don't include extra words above or below the list.` ,
        max_tokens: 200
      };

      const config = {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          "Content-type": "application/json",
        },
      };

      const {data} = await axios.post(endpoint,input_prompt, config);
      const data_list = data["choices"][0]["text"].trim().split('\n').map((tx:string) =>{ 
          const tp = tx.trim().split(' ').slice(1).join(' ')
          return tp
      })
      // setTags(data)
      console.log("data: ",data_list);
      
      //@ts-ignore
      setSelectedTags((selectedTags) => selectedTags.concat(data_list).filter((value, index, self) => self.indexOf(value) === index));
      setJobDesc("")
      
    } catch (error) {
        alert("Some error occured. Please try again");
        console.log(error);
    }
}

  //@ts-ignore
  const handleInputChange = (event) => {
    setJobDesc(event.target.value);
    console.log(jobDesc);
  };



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
            {"Make changes to the Job Description here. Click save when you're done."}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
            <Textarea className="text-sm min-h-[260px] p-4 resize-none bg-gray-50"  value={jobDesc} onChange={handleInputChange}/>
            <p className="text-sm text-muted-foreground">
                Job Description will be used to find relevent tags for interview
            </p>
        </div>
        <DialogFooter className="mt-4">
            <DialogClose asChild>
            <Button type="submit" onClick={makeAPICall}>Upload</Button>
            </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
