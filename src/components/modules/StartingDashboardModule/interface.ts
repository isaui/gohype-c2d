
import { Database } from "@/types.supabase";

export type Ticket = Database['public']['Tables']['ticket']['Row']
export interface TicketItemProps {
    id: string;
    title: string;
    variant: string;
    ticketPath: string;
  }

