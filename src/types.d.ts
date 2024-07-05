export type Ticket = {
    ticketTitle: string
    ticketSubtitle: string
    ticketPrice: string
    actualTicketPrice: string
}

export type TicketsGroup = {
    title: string
    tickets: Ticket[]
}