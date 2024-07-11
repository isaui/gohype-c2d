"use client"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronRight } from "lucide-react"

type EmailModalProps = {
    children: React.ReactNode
}

const EmailModal: React.FC<EmailModalProps> = ({children}) => {
    const [open, setOpen] = useState(false)
    const [email, setEmail] = useState("isadestroyed17@gmail.com")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
               {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-md">
                <DialogHeader>
                    <DialogTitle className="text-left">
                        Update Email
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-2 py-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="email" className="text-left">
                                Email
                            </Label>
                            <Input 
                                id="email" 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                className="col-span-3" 
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <div className="flex w-full">
                            <div className="flex items-center space-x-2 w-fit ml-auto">
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary" className="border-none">
                                        Close
                                    </Button>
                                </DialogClose>
                                <Button type="submit">Save</Button>
                            </div>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default EmailModal