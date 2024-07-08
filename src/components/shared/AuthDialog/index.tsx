"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import Stack from "../Stack"

type AuthDialogProps = {
    isInitialOpen: boolean
}

const AuthDialog: React.FC<AuthDialogProps> = ({isInitialOpen}) => {

    const [isOpen, setIsOpen] = useState(isInitialOpen);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <div>
      <Dialog  open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-screen md:max-w-[425px] px-0 py-3 ">
          <DialogHeader className="px-4">
            <DialogTitle>Sign In / Register</DialogTitle>
            
          </DialogHeader>
          <Separator className="mt-1"/>

          <div className="grid gap-4 py-4 px-4">
            <div className="flex w-full">
              <Button className="w-full">
                <div className="flex items-center space-x-2">
              <img src="/google-icon.svg"/>
              <p>Continue with Google</p>
                </div>
              </Button>
            </div>
            <div className="flex w-full">
              <div className="w-full bg-transparent text-primary border-0">
                <div className="flex items-center space-x-2 justify-center">
              <p className=" font-semibold">Use other method</p>
                </div>
              </div>
            </div>
            <div className="flex w-full justify-center text-center">
                <Label className=" text-secondary">By registering, you agree to the applicable Terms & Conditions and you have read our Privacy Policy.</Label>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AuthDialog