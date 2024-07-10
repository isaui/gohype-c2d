import Navbar from "@/components/shared/Navbar"
import TransactionContent from "@/components/shared/Transaction/TransactionContent"
import TransactionHeader from "@/components/shared/Transaction/TransactionHeader"

type TransactionLayoutProps = {
  backTitle: string,
  callbackBackUrl: string
  children: React.ReactNode,
  paymentPosition: number
}
const TransactionLayout: React.FC<TransactionLayoutProps> = (
    {backTitle, 
    callbackBackUrl, 
    children, 
    paymentPosition}) => {
    return <div className="flex flex-col w-screen min-h-screen bg-background items-center md:pt-16 pb-10">
    <div className="md:hidden">
    <Navbar variant="SCROLL"/>
    </div>
    <div className="hidden md:flex">
    <Navbar variant="FIXED"/>
    </div>
    <TransactionHeader 
        callbackBackUrl={callbackBackUrl} 
        backTitle={backTitle}/>
    <TransactionContent paymentPosition={paymentPosition}>
        {children}
    </TransactionContent>
</div>
}

export default TransactionLayout