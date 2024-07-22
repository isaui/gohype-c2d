import TicketsAccordion from "../module-elements/TicketsAccordion"

type BuyTicketSectionProps = {
    ticketList: any
}

const BuyTicketSection: React.FC<BuyTicketSectionProps> = ({ticketList}) => {
    return <div className="flex flex-col w-full mx-auto px-4">
        <TicketsAccordion
        title="Buy Tickets" 
        tickets={ticketList}/>
    </div>
}
export default BuyTicketSection