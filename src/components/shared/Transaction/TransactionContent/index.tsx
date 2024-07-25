
import { Card, CardContent } from "@/components/ui/card"
import { paymentSections } from "@/utils/payment-section"
import TransactionPositionCard from "@/components/shared/Transaction/TransactionPositionCard"
import Image from "next/image"

type TransactionContentProps = {
    children: React.ReactNode
    paymentPosition: number,
    needPlaceholder?: boolean,
    imageUrl?: string
}

const TransactionContent: React.FC<TransactionContentProps> =  ({children, paymentPosition, needPlaceholder=false, imageUrl}) => {

    return <div className="flex flex-col mx-auto max-w-7xl w-full ">
        {
            needPlaceholder && 
            <img alt="ticket" src={imageUrl??""} className="w-full h-auto md:my-6 md:rounded-2xl"/>
        }
         <div className="flex  w-full max-w-7xl md:px-4 lg:px-0">
        <div className="hidden md:flex">
        <TransactionPositionCard
            currentActiveSection={paymentSections[paymentPosition]}
            sections={paymentSections}
        />
        </div>
        <Card className="w-full md:bg-white bg-background md:ml-8 rounded-none md:rounded-xl ">
            <CardContent className="p-0 md:p-4">
            {children}
            </CardContent>
        </Card>
    </div>
    </div>
}
export default TransactionContent