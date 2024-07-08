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

export type TicketTimeInformation = {
    value: string
    startTime: string,
    endTime: string
}

export type TicketData = {
    label: string;
    price: string;
    count: number;
}