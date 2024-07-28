

import Navbar from '@/components/shared/Navbar';
import ScannerBottomNavbar from '@/components/shared/ScannerBottomNavbar';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/server';
import { QrCode } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import LoginSection from './sections/LoginSection';
import { Lock } from "lucide-react"

type ScanModuleProps = {
    event: string
}

export const ScanModule: React.FC<ScanModuleProps> = async ({event}) => {

    let isAdminAndAuthenticated = false
    const supabase = createClient()
    const userResponse = await supabase.auth.getUser()
    if(userResponse.data.user){
       const queryUser = await supabase.from("user").select("*").eq("id", userResponse.data.user.id).single();
       if(queryUser.data && queryUser.data.role == 'ADMIN'){
        isAdminAndAuthenticated = true
       } 
    }


    if (!isAdminAndAuthenticated) {
        return (
            <div className="flex flex-col w-screen min-h-screen bg-background items-center justify-center">
                <Navbar isAuthRequired={true}/>
                <div className="max-w-md p-8 flex flex-col bg-white rounded-lg shadow-lg items-center text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h1>
                    <p className="text-gray-600 mb-6">
                        {`We're sorry, but you don't have permission to access this page. 
                        This area is restricted to administrators only.`}
                    </p>
                    <div className="flex w-full   mb-6 justify-center items-center">
                    <Lock className="w-12 h-auto "/>
                    </div>
                    <LoginSection/>
                </div>
            </div>
        )
    }

  return (
    <div className="w-full max-w-4xl flex flex-col gap-4 mx-auto bg-white border-gray-200 border items-center h-screen">
      <div className="relative w-full max-w-screen-sm h-[80vh] rounded-2xl overflow-hidden ">
        <Image
          src={
            'https://www.shutterstock.com/image-vector/qr-code-scanning-icon-smartphone-600nw-1968550138.jpg'
          }
          alt="Cover Image"
          fill
          className="object-contain bg-white"
        />
      </div>
      <Link href={`/scanner`}>
        <Button className="flex items-center gap-2">
          <span>Scan Ticket</span>
          <QrCode />
        </Button>
      </Link>
      <ScannerBottomNavbar eventPath={event} activeSection={"scanner"}/>
    </div>
  );
};