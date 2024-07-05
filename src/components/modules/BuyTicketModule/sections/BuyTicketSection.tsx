import { dummyTickets } from "@/utils/dummy"
import TicketsAccordion from "../module-elements/TicketsAccordion"

const BuyTicketSection = () => {
    return <div className="flex flex-col w-full mx-auto px-4">
        <TicketsAccordion
        title="Beli Ticket" 
        tickets={dummyTickets()}/>
    </div>
}
export default BuyTicketSection