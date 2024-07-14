"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from "react"
import { AuthStep } from "./constant"
import { Input } from "@/components/ui/input"

type AuthDialogProps = {
    isOpen: boolean
    setIsOpen: (val:boolean) => void
}

const AuthDialog: React.FC<AuthDialogProps> = ({isOpen, setIsOpen}) => {

    const [step, setStep] = useState<AuthStep>("SELECT_AUTH")

    const generateTitle = () => {
      if(step == 'SELECT_AUTH' || step == 'SELECT_OTHER_AUTH'){
        return <DialogTitle>Sign In / Register</DialogTitle>
      }
      return <div></div>
    }

    const generateLabel = () => {
      if(step == 'SELECT_AUTH' || step == 'SELECT_OTHER_AUTH'){
        return <div className="flex w-full justify-center text-center px-4">
          <Label className=" text-secondary text-sm">By registering, you agree to the applicable Terms & Conditions and you have read our Privacy Policy.</Label>
      </div>
      }

      if(step == 'WA_INPUT_PHONE_NUMBER'){
        return <div className="flex w-full justify-center text-center px-4">
        <Label className=" text-secondary text-sm">
        We will not share your phone number with others or use it to send spam.
        </Label>
    </div>
      }

      if(step == 'INPUT_EMAIL'){
        return <div className="flex w-full justify-center text-center px-4">
        <Label className=" text-secondary text-sm">
        We will not share your email with others or use it to send spam.
        </Label>
    </div>
      }
      return <div></div>
    }

  const generateContent = () => {
    if(step == 'SELECT_AUTH' || step == 'SELECT_OTHER_AUTH'){
      return <div className="grid gap-4 py-4 px-4">
      <div className="flex w-full">
        <Button className="w-full bg-[#282828]">
          <div className="flex items-center space-x-2">
        <img src="/google-icon.svg"/>
        <p>Continue with Google</p>
          </div>
        </Button>
      </div>
      {
        step == 'SELECT_AUTH' && <>
         <div onClick={()=> setStep("SELECT_OTHER_AUTH")} className="flex w-full">
        <div className="w-full bg-transparent text-primary border-0">
          <div className="flex items-center space-x-2 justify-center">
        <p className=" font-semibold">Use other method</p>
          </div>
        </div>
      </div>
        </>
      }
      {
        step == 'SELECT_OTHER_AUTH' && <>
        <div className="grid gap-2">
        <Button onClick={()=> setStep("WA_INPUT_PHONE_NUMBER")} variant={"outline"} className="w-full border-[#282828]">
          <div className="flex items-center space-x-2">
        <img src="/wa-icon.svg"/>
        <p>Continue with Whatsapp</p>
          </div>
        </Button>
        <Button onClick={()=>setStep("INPUT_EMAIL")} variant={"outline"} className="w-full border-[#282828]">
          <div className="flex items-center space-x-2">
        <p>Continue with Email</p>
          </div>
        </Button>
      </div>
        </>
      }
    </div>
    }

    if(step == 'WA_INPUT_PHONE_NUMBER'){
      return <div className="grid gap-4 px-4">
        <DialogTitle className=" text-center">Enter your phone number</DialogTitle>
            <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <span className="text-gray-500">+62</span>
      </div>
      <Input 
        type="tel"
        placeholder="Enter your phone number"
        className="pl-12"
      />
    </div>
    <Button onClick={()=>{
      setStep("WA_OTP_VERIFICATION")
    }} className="w-full bg-primary ">Continue</Button>
      </div>
    }

  



    if(step == 'WA_OTP_VERIFICATION'){
      return <div className="grid space-y-4 px-4">
        <DialogTitle className=" text-center">Enter the OTP code you received</DialogTitle>
      <p className="text-sm text-gray-600 flex items-center justify-center text-center">
        Weve sent a 4-digit code to +6285156240677<span onClick={()=>{setStep("WA_INPUT_PHONE_NUMBER")}} className="ml-2"><img src="/pencil-icon.svg"/></span>
      </p>
      <Input 
        type="text"
        placeholder="OTP Code"
        className="text-center"
      />
      <Button onClick={()=>{
        setStep("CREATE_PASSWORD")
      }} className="w-full">
        Continue
      </Button>
      <div 
        className="w-full text-blue-500 text-center text-sm"
      >
        Resend OTP (60 second)
      </div>
    </div>
    }

    if(step == 'CREATE_PASSWORD'){
      return <div className="grid space-y-4 px-4">
      <h2 className="text-xl font-semibold text-center">Create New Password</h2>
      <p className="text-base text-secondary text-center">
        Youve created a password for +6285156240677. This will help you sign-in faster next time.
      </p>
      <Input 
        type="password"
        placeholder="Create New Password"
        className="bg-gray-100"
      />
      <p className="text-base text-secondary">
        Use at least 6 characters, including at least one letter and one number.
      </p>
      <Input 
        type="password"
        placeholder="Retype New Password"
        className="bg-gray-100"
      />
      <Button className="w-full bg-primary">
        Continue
      </Button>
    </div>
    }

    if(step == 'INPUT_EMAIL'){
      return <div className="grid gap-4 px-4">
        <DialogTitle className=" text-center">Enter your email</DialogTitle>
            <div className="relative">
      <Input 
        placeholder="Enter your email"
        className=""
      />
    </div>
    <Button onClick={()=>{
      setStep("EMAIL_OTP_VERIFICATION")
    }} className="w-full bg-primary ">Continue</Button>
      </div>
    }

    if(step == 'EMAIL_OTP_VERIFICATION'){
      return <div className="grid space-y-4 px-4">
        <DialogTitle className=" text-center">Enter the OTP code you received</DialogTitle>
      <p className="text-sm text-gray-600 flex items-center justify-center text-center">
        Weve sent a 4-digit code to ramiz@maiadigital.id<span onClick={()=>{setStep("INPUT_EMAIL")}} className="ml-2"><img src="/pencil-icon.svg"/></span>
      </p>
      <Input 
        type="text"
        placeholder="OTP Code"
        className="text-center"
      />
      <Button onClick={()=>{
        setStep("CREATE_PASSWORD")
      }} className="w-full">
        Continue
      </Button>
      <div 
        className="w-full text-blue-500 text-center text-sm"
      >
        Resend OTP (60 second)
      </div>
    </div>
    }



    return <div></div>
  }

  return (
    <div>
      <Dialog  open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-screen md:max-w-[425px] px-0 py-3 ">
          <DialogHeader className="px-4">
            {generateTitle()}
          </DialogHeader>
          <Separator className="mt-1"/>
          {generateContent()}
          {generateLabel()}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AuthDialog