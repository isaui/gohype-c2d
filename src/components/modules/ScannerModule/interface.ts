import { Database } from "@/types.supabase";

type Order = Database['public']['Tables']['order']['Row']
type Ticket = Database['public']['Tables']['ticket']['Row']
type OrderWithTicket = Order & {
    ticket_data: Ticket
}
type TicketHolder = Database['public']['Tables']['ticket_holder']['Row']

export type TicketHolderWithTicketOrderData = TicketHolder & {
    order_data: OrderWithTicket
}