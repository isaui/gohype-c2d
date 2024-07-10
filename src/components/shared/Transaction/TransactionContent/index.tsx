import AuthDialog from "@/components/shared/AuthDialog"
import { Card, CardContent } from "@/components/ui/card"
import { paymentSections } from "@/utils/payment-section"
import TransactionPositionCard from "@/components/shared/Transaction/TransactionPositionCard"

type TransactionContentProps = {
    children: React.ReactNode
    paymentPosition: number
}

const TransactionContent: React.FC<TransactionContentProps> = async ({children, paymentPosition}) => {
    
    return <div className="flex w-full max-w-7xl md:gap-x-8 ">
        <AuthDialog isInitialOpen={true}/>
        <div className="hidden md:flex">
        <TransactionPositionCard
            currentActiveSection={paymentSections[paymentPosition]}
            sections={paymentSections}
        />
        </div>
        <Card className="w-full md:bg-white bg-background  rounded-none md:rounded-xl">
            <CardContent className="p-0 md:p-4">
            {children}
            </CardContent>
        </Card>
    </div>
}
export default TransactionContent