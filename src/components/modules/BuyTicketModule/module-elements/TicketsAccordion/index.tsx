import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import Ticket from "../Ticket"
import { getLowestPriceAndDiscountRegularTicket, getLowestPriceAndDiscountTicketBooking } from "../../utils"


type TicketsAccordionProps = {
    tickets: any
    title: string
}

const TicketsAccordion: React.FC<TicketsAccordionProps> = ({tickets, title}) => {
    console.log(tickets.Regular)
    console.log(tickets.Booking)
    
    return <div className="w-full flex flex-col rounded-lg ">
    <h1 className="mb-3 text-primary font-bold text-2xl">{title}</h1>
        <Accordion
        id={"tickets-accordion"} 
        type="multiple"
        defaultValue={["0"]}  
        className="w-full bg-primary-2 pt-2 pb-4 px-4 rounded-xl">

            { tickets.Regular && tickets.Regular.length > 0 && 
                <AccordionItem 
                key="ticket-regular-list" 
                value={"ticket-regular"}>
                    <AccordionTrigger><h1 className="text-lg font-bold text-primary">Regular Tickets</h1></AccordionTrigger>
                    <AccordionContent>
                        <div className="flex flex-col w-full space-y-2">
                        {
                        tickets.Regular.map((ticket:any, ticketIndex:any)=> {
                            const getLowestItem = getLowestPriceAndDiscountRegularTicket(ticket)
                            return <Ticket 
                                key={ticketIndex + ticket.id} 
                                ticketId={ticket.id} 
                                ticketTitle={ticket.name} 
                                ticketSubtitle={ticket.description} 
                                ticketPrice={getLowestItem.lowestPrice} 
                                discount={getLowestItem.discountUnit} 
                                method={getLowestItem.discountType as any}/>
                        })
                    }
                    </div>
                    
                    </AccordionContent>
                </AccordionItem>
            }
            { tickets.Booking && tickets.Booking.length > 0 && 
                <AccordionItem 
                key="ticket-booking-list" 
                value={"ticket-booking"}>
                    <AccordionTrigger><h1 className="text-lg font-bold text-primary">Booking Tickets</h1></AccordionTrigger>
                    <AccordionContent>
                        <div className="flex flex-col w-full space-y-2">
                        {
                        tickets.Booking.map((ticket:any, ticketIndex:any)=> {
                            const getLowestItem = getLowestPriceAndDiscountTicketBooking(ticket)
                            return <Ticket 
                                key={ticketIndex + ticket.id} 
                                ticketId={ticket.id} 
                                ticketTitle={ticket.name} 
                                ticketSubtitle={ticket.description} 
                                ticketPrice={getLowestItem.lowestPrice} 
                                discount={getLowestItem.discountUnit} 
                                method={getLowestItem.discountType as any}                            
                            />
                        })
                    }
                    </div>
                    
                    </AccordionContent>
                </AccordionItem>
            }
  </Accordion>
    </div>
}

export default TicketsAccordion