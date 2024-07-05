import { TicketsGroup } from "@/types"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import Ticket from "../Ticket"


type TicketsAccordionProps = {
    tickets: TicketsGroup[]
    title: string
}

const TicketsAccordion: React.FC<TicketsAccordionProps> = ({tickets, title}) => {
    return <div className="w-full flex flex-col rounded-lg ">
    <h1 className="mb-3 text-primary font-bold text-2xl">{title}</h1>
        <Accordion 
        type="multiple"
        defaultValue={["0"]}  
        className="w-full bg-primary-2 pt-2 pb-4 px-4 rounded-xl">
            {
                tickets.map((data, index)=> {
                    return <AccordionItem 
                    key={index+data.title} 
                    value={index.toString()}>
                        <AccordionTrigger><h1 className="text-lg font-bold text-primary">{data.title}</h1></AccordionTrigger>
                        <AccordionContent>
                            <div className="flex flex-col w-full space-y-2">
                            {
                            data.tickets.map((ticket, ticketIndex)=> {
                                return <Ticket 
                                key={ticketIndex + ticket.ticketTitle} 
                                ticket={ticket}/>
                            })
                        }
                        </div>
                        
                        </AccordionContent>
                    </AccordionItem>
                })
            }
  </Accordion>
    </div>
}

export default TicketsAccordion