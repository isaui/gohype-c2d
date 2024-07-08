import Navbar from "@/components/shared/Navbar"
import BuyTicketSection from "./sections/BuyTicketSection"
import DescriptionSection from "./sections/DescriptionSection"
import FAQSection from "./sections/FAQSection"
import ImagesSection from "./sections/ImagesSection"
import RefundPolicySection from "./sections/RefundPolicySection"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image'
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"

const BuyTicketModule = () => {
    return <div className="flex flex-col w-screen min-h-screen bg-background items-center pt-16 pb-10">
        <Navbar/>
        <ImagesSection/>
        <div className="flex flex-row-reverse gap-x-4 md:gap-x-8 w-full max-w-7xl">
        <div className="w-[28rem]">
        <Card className="h-fit w-full">
            <CardHeader>
                <CardDescription>
                    <div className="flex items-center space-x-2">
                        <Image 
                        src={"/ticket-icon.svg"}
                        className="w-10 h-auto"
                        width={1}
                        height={1}
                        alt="ticket icon"/>
                        <p className=" text-secondary text-base">
                            {`You haven't selected a ticket yet. Please choose one first.`}</p>
                    </div>
                    <Separator className="mt-6"/>
                </CardDescription>
            </CardHeader>
            <CardContent>
               <div className="flex w-full justify-between items-center">
                    <p className="text-base text-secondary">Prices start from</p>
                    <p className=" text-xl text-tertiary font-bold ml-2">IDR 180.000</p>
               </div>
            </CardContent>
        </Card>
        </div>

        <Card className="w-full md:bg-white bg-background  rounded-none md:rounded-xl">
            <CardContent className="p-0 md:p-4">
            <DescriptionSection/>
            <BuyTicketSection/>
            <RefundPolicySection/>
            <FAQSection/>
            </CardContent>
        </Card>

        </div>
        

       
    </div>
}

export default BuyTicketModule