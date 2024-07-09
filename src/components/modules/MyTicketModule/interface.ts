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
