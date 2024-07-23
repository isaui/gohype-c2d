
import TransactionLayout from "@/components/layouts/TransactionLayout"
import SelectTicketQuantitySection from "./sections/SelectTicketQuantitySection"
import { createClient } from "@/utils/supabase/server"


type CartModuleProps = {
    prefixName?: string
}

const CartModule: React.FC<CartModuleProps> = async ({prefixName}) => {

    const supabase = createClient()
    const {data} = await supabase.from("ticket").select("*").eq("ticket_path", prefixName??"").single()
    let ticketName = ""
    let ticketDescription = ""
    let imageUrl = ""
    let price = 0
    if(data){
        ticketName = data.ticket_name
        ticketDescription = data.ticket_description
        price = data.single_pax_price
        imageUrl = data.ticket_banner_url ?? ""

    }

    return (
        <TransactionLayout
        backTitle="Browse Other Ticket Types"
        callbackBackUrl="https://gohype.id"
        imageUrl={imageUrl}
        paymentPosition={0}
        hidden={true}
        needImage={true}
        >
            <SelectTicketQuantitySection
            prefixUrl={prefixName}
            ticketTitle={ticketName}
            ticketDescription={ticketDescription}
            paxPrice={price}
            />
        </TransactionLayout>
    )
}

export default CartModule