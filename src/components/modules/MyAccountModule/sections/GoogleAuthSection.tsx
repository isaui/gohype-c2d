"use client"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"

const GoogleAuthSection = () => {

    const [isConnect, setIsConnect] = useState<boolean>(false)

    const buildGoogleAreNotConnected = () => {
        return <div className="flex items-center space-x-2">
            <div className="flex flex-col grow md:grid grid-cols-12">
                <p className=" text-secondary col-span-5">Login With Google</p>
                <p className="col-span-7">-</p>
            </div>
            <div className=" md:hidden">
            <Button onClick={()=> setIsConnect(true)} className="">Connect</Button>
            </div>
            <div className="hidden md:flex w-4 h-4  relative">
                <div className="absolute -left-[5.25rem] -top-1/2">
                <Button onClick={()=> setIsConnect(true)} className="">Connect</Button>
                </div>
            </div>
        </div>
    }

    const buildGoogleAreConnected = () => {
        return <div className="flex items-center space-x-2">
            <div className="flex flex-col grow md:grid grid-cols-12">
                <p className=" text-secondary col-span-5">Login With Google</p>
                <div className="flex space-x-2 items-center col-span-7">
                <Image src="/checklist-true-icon.svg" alt="connected" width={1} height={1} className="w-4 h-4"/>
                <p>Connected</p>
                </div>
            </div>
            <div className=" md:hidden">
            <Button variant={"destructive"} onClick={()=> setIsConnect(false)} className="">Disconnect</Button>
            </div>
            <div className="hidden md:flex w-4 h-4  relative">
                <div className="absolute -left-[5.25rem] -top-1/2">
                <Button variant={"destructive"} onClick={()=> setIsConnect(false)} className="">Disconnect</Button>
                </div>
            </div>
            
        </div>
    }
    return <div className="flex flex-col w-full mt-4">
        <Alert className=" bg-transparent border-none">
        <AlertDescription>
           {
            isConnect? buildGoogleAreConnected() : buildGoogleAreNotConnected()
           }
        </AlertDescription>
        </Alert>
    </div>
}
export default GoogleAuthSection