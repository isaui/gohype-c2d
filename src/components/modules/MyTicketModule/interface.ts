export interface TicketItemProps {
  id: number;
  title: string;
  variant: string;
  validDate: string;
  isCheckedIn: boolean;
  checkInDate: string | null;
  duration: number;
  qrCodeImageUrl: string;
  isWeekend: boolean;
}

export interface TicketHistoryItemProps {
  id: number;
  title: string;
  variant: string;
}

export interface MyTicketModuleProps {
  page?: string;
  history: boolean;
}
export interface NavigationProps {
  history: boolean;
}

export interface TicketOrders {
  amount: number;
  created_at: string | null;
  customer: string | null;
  id: string;
  order_num: number;
  ticket: (string & {
      id: string;
      single_pax_price: number;
      ticket_banner_url: string | null;
      ticket_description: string;
      ticket_name: string;
      ticket_num: number;
      ticket_path: string | null;
      ticket_start_date: string | null;
      ticket_end_date: string | null;
  }) | null;
  ticket_total: number;
}
