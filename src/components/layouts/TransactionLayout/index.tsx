import Navbar from "@/components/shared/Navbar"
import TransactionContent from "@/components/shared/Transaction/TransactionContent"
import TransactionHeader from "@/components/shared/Transaction/TransactionHeader"

type TransactionLayoutProps = {
  backTitle: string,
  callbackBackUrl: string
  children: React.ReactNode,
  paymentPosition: number,
  hidden?: boolean,
  needImage?: boolean,
  imageUrl?: string
}
const TransactionLayout: React.FC<TransactionLayoutProps> = (
    {backTitle, 
    callbackBackUrl, 
    children, 
    paymentPosition,
    hidden=false,
    needImage=false,
    imageUrl=''
}) => {
    return <div className="flex flex-col w-screen min-h-screen bg-background items-center md:pt-20 pb-10">
    <div className="md:hidden">
    <Navbar variant="SCROLL"/>
    </div>
    <div className="hidden md:flex">
    <Navbar variant="FIXED"/>
    </div>
    <TransactionHeader 
        callbackBackUrl={callbackBackUrl} 
        backTitle={backTitle}
        hidden={hidden}/>
    <TransactionContent 
    paymentPosition={paymentPosition}
    imageUrl={imageUrl}
    needPlaceholder={needImage}>
        {children}
    </TransactionContent>
</div>
}

export default TransactionLayout