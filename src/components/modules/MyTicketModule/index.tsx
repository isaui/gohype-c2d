import { TICKET_ITEMS } from './constant';
import { TicketItem } from './module-elements/TicketItem';
import PaginationComponent from '@/components/ui/external/PaginationComponent';
import React from 'react';
import { MyTicketModuleProps } from './interface';
import { Navigation } from './module-elements/Navigation';
import { TicketHistoryItem } from './module-elements/TicketHistoryItem';

const MyTicketModule: React.FC<MyTicketModuleProps> = ({
  page: pageStr,
  history,
}) => {
  const pageInt = Number(pageStr) || 1;

  return (
    <div className="flex items-center container p-0 md:p-4 justify-center min-h-screen">
      <div className="flex flex-col p-8 gap-7 max-w-screen-md bg-white md:rounded-xl border border-[#E9E9E9]">
        <h1 className="font-semibold text-2xl">My Tickets</h1>
        <Navigation history={history} />
        <div className="flex flex-col gap-8">
          {TICKET_ITEMS.map((ticket) =>
            history ? (
              <TicketHistoryItem {...ticket} key={ticket.id} />
            ) : (
              <TicketItem {...ticket} key={ticket.id} />
            ),
          )}
        </div>
        <PaginationComponent
          currentPage={pageInt}
          itemsPerPage={10}
          totalItems={200}
        />
      </div>
    </div>
  );
};

export default MyTicketModule;
