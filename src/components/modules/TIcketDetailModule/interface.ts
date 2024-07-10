export interface TicketDetailModuleProps {
  id: string;
}

export interface PersonListItemProps {
  name: string;
  description: string;
  status: 'CHECKED_IN' | 'NOT_CHECKED_IN' | 'CHECKED_OUT';
}
