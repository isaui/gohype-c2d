import TransactionLayout from "@/components/layouts/TransactionLayout"
import FillInDetailSection from "./sections/FillInDetailSection"
import React from "react"
import { createClient } from "@/utils/supabase/server"

type CheckoutModuleProps = {
    prefixUrl?: string,
}

const CheckoutModule: React.FC<CheckoutModuleProps> = async ({prefixUrl=''}) => {
    const supabase = createClient()
    const {data} = await supabase.from("ticket").select("*").eq("ticket_path", prefixUrl??"").single()
    let ticketName = ""
    let ticketId = ""
    if(data){
        ticketName = data.ticket_name
        ticketId = data.id
    }

    return (
        <TransactionLayout
            paymentPosition={1}
            backTitle="Back"
            callbackBackUrl={`/${prefixUrl}`}>
            <FillInDetailSection
            ticketName={ticketName}
            ticketId={ticketId}
            ticketPath={prefixUrl}
            />
        </TransactionLayout>)
}

export default CheckoutModule