"use client";

import * as React from "react"
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ui/toggle-theme'
import Link from 'next/link'
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from 'react'
import { X, PlusCircle } from 'lucide-react'
import tags from './tags.json';

// @ts-ignore
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"





export default function Session() {

  // const initialArray = []
  const [selectedTags, setSelectedTags] = useState([])
  const [difficulty, setDifficulty] = useState("Beginner")

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  const handleRemoveItem = (index : number) => {
      const updatedItems = [...selectedTags];
      updatedItems.splice(index, 1);
      setSelectedTags(updatedItems);
  };


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-slate-800 bg-[#f7f8fa]">
      <div className="z-10 max-w-3xl w-full flex-col items-center justify-center font-sans mt-28">
        <div >
            <div className="border-[1px] min-h-[3rem]">

              <Dialog>
                <DialogTrigger asChild>
                  <div className="text-xl flex p-[1rem] pl-[1.5rem]">Add Tags Profile <PlusCircle className="ml-[0.7rem]"></PlusCircle></div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-white">
                  <DialogHeader>
                  <div className="flex flex-wrap border-1">
                  </div>
                    <DialogTitle>Add Tags</DialogTitle>
                    <DialogDescription>
                      {"Make changes to your profile here. Click save when you're done."}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={open}
                              className="w-[200px] justify-between"
                            >
                              {value
                                ? tags.find((tag) => tag.value === value)?.label
                                : "Select tags..."}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput placeholder="Search tag..." className="h-9" />
                              <CommandEmpty>No tag found.</CommandEmpty>
                              <CommandGroup>
                                {tags.map((tag) => (
                                  <CommandItem
                                    key={tag.value}
                                    value={tag.value}
                                    onSelect={(currentValue) => {
                                      // setValue(currentValue === value ? "" : currentValue)
                                      // @ts-ignore
                                      setSelectedTags(selectedTags => [...selectedTags, currentValue])
                                      console.log(selectedTags)
                                      setOpen(false)
                                    }}
                                  >
                                    {tag.label}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        value === tag.value ? "opacity-100" : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">

                    </div>
                  </div>
                  <div className="flex flex-wrap border-1">
                      {selectedTags.map((item, index) => (
                        <div key={index} className="flex p-[0.5rem] m-[0.5rem] border-[1px]">
                            {item}
                            <X className="cursor-pointer" onClick={() => handleRemoveItem(index)}> </X>
                        </div>  
                      ))}
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="submit">Save changes</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <div className="mt-[0.5rem] min-h-[2rem] border-[1px] flex flex-wrap">
                  {selectedTags.map((item, index) => (
                          <div key={index} className="flex p-[0.5rem] m-[0.5rem] border-[1px]">
                              {item}
                              <X className="cursor-pointer" onClick={() => handleRemoveItem(index)}> </X>
                          </div>  
                  ))}
              </div>
            </div>
            <div className="flex">
                <div className={`flex border-[1px] p-[1rem] m-[1rem] ${(difficulty == "Beginner") ? 'ring-2 ring-blue-600' : ''}`}
                      onClick={() => setDifficulty("Beginner")}>
                      Beginner
                </div>
                <div className={`flex border-[1px] p-[1rem] m-[1rem] ${(difficulty == "Professional") ? 'ring-2 ring-blue-600' : ''}`}
                      onClick={() => setDifficulty("Professional")}>
                      Professional
                </div>
            </div>

            <Button>Start Practicing</Button>
        </div>
      </div>
    </main>
  )
}






