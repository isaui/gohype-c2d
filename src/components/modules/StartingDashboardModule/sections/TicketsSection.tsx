import { Ticket } from "../interface"
import { TicketItem } from "../module-elements/TicketItem"

type TicketsSectionProps = {
    tickets: Ticket[]
}

const TicketsSection: React.FC<TicketsSectionProps> = ({tickets}) => {
    console.log(tickets)
   return <div className="flex flex-col p-4 sm:p-8 gap-4 sm:gap-6 md:gap-7
    md:mt-16 w-full md:w-[48rem] bg-white md:rounded-xl border border-[#E9E9E9] min-h-16">
        <h1 className="font-semibold text-xl sm:text-2xl">All Tickets</h1>
        <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
            {
                tickets.map((ticket, index)=>{
                    return <TicketItem
                    key={index + "-ticket"}
                    id={ticket.id}
                    title={ticket.ticket_name}
                    variant={"#"+ticket.ticket_num}
                    ticketPath={ticket.ticket_path ?? ""}
                    />
                })
            }
        </div>
    </div>
}

export default TicketsSection