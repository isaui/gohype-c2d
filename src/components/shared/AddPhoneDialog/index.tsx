"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { Input } from "@/components/ui/input"

type AddPhoneDialogProps = {
    isOpen: boolean
    setIsOpen: (val:boolean) => void
    onAddPhone: (phoneNumber: string) => void
}

const AddPhoneDialog: React.FC<AddPhoneDialogProps> = ({isOpen, setIsOpen, onAddPhone}) => {
    const [phoneNumber, setPhoneNumber] = useState("")
    const [error, setError] = useState("")

    const validatePhoneNumber = (number: string) => {
        // Regex untuk nomor telepon minimal 8 digit
        const regex = /^\d{6,}$/
        return regex.test(number)
    }

    const handleSubmit = () => {
        if (validatePhoneNumber(phoneNumber)) {
            onAddPhone("62"+phoneNumber)
            setIsOpen(false)
            setPhoneNumber("")
            setError("")
        } else {
            setError("Nomor telepon tidak valid. Masukkan minimal 8 digit angka.")
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="w-screen md:max-w-[425px] px-0 py-5">
                <DialogHeader className="px-4">
                    <DialogTitle>Add Phone Number</DialogTitle>
                </DialogHeader>
                <Separator className="mt-1"/>
                <div className="grid gap-4 px-4">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <span className="text-gray-500">+62</span>
                        </div>
                        <Input 
                            type="tel"
                            placeholder="Masukkan nomor telepon (min. 8 digit)"
                            className="pl-12"
                            value={phoneNumber}
                            onChange={(e) => {
                                const input = e.target.value.replace(/\D/g, ''); // Hanya menerima digit
                                setPhoneNumber(input)
                                setError("")
                            }}
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <Button onClick={handleSubmit} className="w-full bg-primary">
                        Add Phone Number
                    </Button>
                </div>
                <div className="flex w-full justify-center text-center px-4 mt-4">
                    <Label className="text-secondary text-sm">
                        We will not share your phone number with others or use it to send spam.
                    </Label>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default AddPhoneDialog