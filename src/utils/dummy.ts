import { TicketsGroup } from "@/types";

export const dummyTickets = (): TicketsGroup[] => {
    return [
        {
            title: "Weekday",
            tickets: [
                {
                    ticketTitle: "1 Day Play Ticket on Weekdays",
                    ticketSubtitle: "Included one companion",
                    ticketPrice: "250000",
                    actualTicketPrice: "450000"
                },
                {
                    ticketTitle: "1 Hour Play Ticket on Weekdays",
                    ticketSubtitle: "Included one companion",
                    ticketPrice: "150000",
                    actualTicketPrice: "250000"
                }
            ]
        },
        {
            title: "Weekend",
            tickets: [
                {
                    ticketTitle: "1 Day Play Ticket on Weekend",
                    ticketSubtitle: "Included one companion",
                    ticketPrice: "250000",
                    actualTicketPrice: "450000"
                },
                {
                    ticketTitle: "1 Hour Play Ticket on Weekend",
                    ticketSubtitle: "Included one companion",
                    ticketPrice: "150000",
                    actualTicketPrice: "250000"
                }
            ]
        },

    ]
}