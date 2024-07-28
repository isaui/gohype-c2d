import { ArrowLeft, CheckCircle, CheckCircle2, CheckCircle2Icon } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toTitleCase } from "@/utils/toTitleCase"
import { TicketHolderWithTicketOrderData } from "../interface"
import { createClient } from "@/utils/supabase/client"
import { useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"


type ResultSectionProps = {
    onBack: () => void
    ticketHolder: TicketHolderWithTicketOrderData
    onRefresh: () => void
}

const ResultSection: React.FC<ResultSectionProps> = ({onBack, ticketHolder, onRefresh}) => {
    const [section, setSection] = useState<'BEFORE_ACTION' | 'AFTER_ACTION'>('BEFORE_ACTION')
    const [isCheckInAction, setIsCheckinAction] = useState<boolean>(false)

    const handleUpdateStatus = async ()=> {
        const supabase = createClient()
        if(ticketHolder.status == 'CHECKED_IN'){
           await supabase.from("ticket_holder").update({status:"CHECKED_OUT"}).eq("id", ticketHolder.id).single()
        }
        else{
           await supabase.from("ticket_holder").update({
            status:"CHECKED_IN", 
            checked_in_date: new Date().toISOString()
            })
            .eq('id', ticketHolder.id)
            setIsCheckinAction(true)
        }
        onRefresh()
        setSection('AFTER_ACTION')
    }
    
    const generateMessage = () => {
        return <Alert className={isCheckInAction? 'bg-green-700 mb-2' : 'bg-red-700 mb-2'}>
        <AlertDescription>
          <div className="flex items-center space-x-2 text-white">
          <CheckCircle2/>
          <p>visitor successfully {isCheckInAction? 'check in' : 'check out'}</p>
          </div>
        </AlertDescription>
      </Alert>
      
    }

    return <div className="w-screen h-screen flex items-center justify-center">
       <div className="w-full max-w-4xl bg-white h-full flex flex-col justify-start px-2 pt-16 pb-20 border border-gray-200">
         <div className="px-2 py-4 flex items-center bg-white gap-x-2 w-full border-b-2 border-gray-200
         max-w-4xl  fixed top-0 left-1/2 transform -translate-x-1/2 z-20">
            <ArrowLeft onClick={onBack}/>
            <h1>Back to Scan Again</h1>
         </div>
         <div>
        {section == 'AFTER_ACTION' && generateMessage()}
         <Card className="w-full p-0 overflow-x-hidden">
      <CardHeader className="bg-[#EFEFEF] py-4">
        <CardTitle>{ticketHolder.fullname}</CardTitle>
        <CardDescription>
        <Badge
          className="w-fit"
          variant={
            ticketHolder.status === 'CHECKED_IN'
              ? 'success'
              : ticketHolder.status === 'CHECKED_OUT'
              ? 'danger'
              : 'disabled'
          }
        >
          <span className="whitespace-nowrap text-xs">{toTitleCase(ticketHolder.status, '_')}</span>
        </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className="bg-[#F7F7F7] py-4">
        <div className="flex flex-col">
          <h2 className=" font-semibold">{ticketHolder.order_data.ticket_data.ticket_name}</h2>
          <div className="mt-2">
            <p className=" text-secondary">Ticket ID</p>
            <p className="font-semibold">{ticketHolder.order_data.order_num}</p>
          </div>
        </div>
      </CardContent>
         </Card>
         </div>
        {
            section == 'BEFORE_ACTION' &&  <div className="px-2 pt-4 pb-8 flex items-center bg-white gap-x-2 w-full  border-gray-200
            max-w-4xl  fixed bottom-0 left-1/2 transform -translate-x-1/2 z-20">
               <Badge onClick={handleUpdateStatus} variant={ticketHolder.status == 'CHECKED_IN'? 'danger' : 'success'} className="w-full rounded-md py-6 text-center">
                   <div className=" w-full text-center">
                   {ticketHolder.status == 'CHECKED_IN' ? 'Check Out' : 'Check In'}
                   </div>
               </Badge>
            </div>
        }
       </div>
    </div>
}

export default ResultSection