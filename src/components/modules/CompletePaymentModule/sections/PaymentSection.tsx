"use client"
import TicketDetailDialog from "@/components/shared/TicketDetailDialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image'
import { useState } from "react"

const PaymentSection = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    return <div className="flex flex-col w-full py-4 px-4 space-y-4">
        <TicketDetailDialog 
            isOpen={isModalOpen} 
            setIsOpen={setIsModalOpen}/>
        <Alert className="bg-yellow-0">
                    <AlertDescription>
                        <div className="flex flex-col w-full items-center gap-y-1">
                            <h1 className="text-secondary">Process payment before</h1>
                            <p className="font-semibold text-primary">10 June 2024 at 15.00 WIB</p>
                        </div>
                    </AlertDescription>
        </Alert>
    <Card className="w-full">
      <CardHeader>
        <CardDescription className="text-xs md:text-sm">ID: <span>#43545667</span></CardDescription>
        <CardTitle className="text-lg md:text-xl">1-Day Play Ticket on Weekdays</CardTitle>
        <p className="text-secondary text-sm md:text-base">2 Children + 3 Companions</p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col w-full">
        <h1 onClick={()=> setIsModalOpen(true)} className=" bg-clip-text font-bold text-transparent bg-primary">See Details</h1>
        </div>
      </CardContent>
    </Card>
    <div className="grid">
        <Button className="py-4 bg-primary">
            <div className="flex items-center space-x-2 ">
                <h1>Proceed to Payment</h1>
                <Image
                src={"/arrow-right-white.svg"}
                alt='back button'
                width={1}
                height={1}
                className='w-4 h-auto'
            />
            </div>
        </Button>
    </div>
    </div>
}

export default PaymentSection