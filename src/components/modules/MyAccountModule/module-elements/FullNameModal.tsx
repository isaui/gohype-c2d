"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type FullNameModalProps = {
    children: React.ReactNode
}

const FullNameModal: React.FC<FullNameModalProps> = ({children}) => {
    const [open, setOpen] = useState(false)
    const [fullName, setFullName] = useState("Pedro Duarte")

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
                        Update Fullname
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-2 py-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="name" className="text-left">
                                Fullname
                            </Label>
                            <Input 
                                id="name" 
                                value={fullName} 
                                onChange={(e) => setFullName(e.target.value)}
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

export default FullNameModal