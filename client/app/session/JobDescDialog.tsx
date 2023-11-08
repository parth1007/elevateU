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
        prompt : `Job Description - ${jobDesc}

            Interview Topics-
            1. Data Structures and Algorithms
            2. Object-Oriented Programming
            3. Web Development
            4. Relational Databases
            5. NoSQL Databases
            6. Mobile App Development (iOS/Android)
            7. Networking and Protocols
            8. Cloud Computing (AWS, Azure, GCP)
            9. Big Data and Hadoop
            10. Machine Learning and AI
            11. Cybersecurity and Network Security
            12. Operating Systems (Windows, Linux)
            13. Software Development Life Cycle (SDLC)
            14. Version Control (Git)
            15. Front-end Frameworks (e.g., React, Angular)
            16. Back-end Frameworks
            17. DevOps and Continuous Integration/Continuous Deployment (CI/CD)
            18. Test-Driven Development (TDD)
            19. Docker and Containerization
            20. Microservices Architecture
            21. Web APIs and RESTful Services
            22. Internet of Things (IoT)
            23. Blockchain Technology
            24. Data Analytics and Visualization
            25. User Interface (UI) Design
            26. Virtual Reality (VR) and Augmented Reality (AR)
            27. Embedded Systems
            28. Natural Language Processing (NLP)
            29. Quantum Computing
            30. Robotics and Automation
            31. Leadership
            32. Communication
            33. Decision-Making
            34. Problem-Solving
            35. Time Management
            36. Strategic Thinking
            37. Adaptability
            38. Conflict Resolution
            39. Team Building
            40. Delegation
            41. Project Management
            42. Performance Management
            43. Financial Management
            44. Data Analysis
            45. Emotional Intelligence
            46. Risk Management
            47. Decision Analysis
            48. Negotiation Skills
            49. Change Management
            50. Ethical Leadership
            51. Innovation
            52. Customer Focus
            53. Cross-Functional Collaboration
            54. Performance Appraisals
            55. Conflict Management
            56. Technical Competence
            57. Sustainability
            58. Marketing and Sales
            59. Regulatory Compliance
            60. Quality Assurance
            
            Extract the top 5 to 10 interview topics out of the given list of provided interview topics which are most suitable according to the given job description. Don't include any interview topics from outside the list. Use exact names as shown in the list. Just give  the list Don't include any extra text above or below the list.
        `,
        
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
