import { TICKET_ITEMS } from './constant';
import { TicketItem } from './module-elements/TicketItem';
import PaginationComponent from '@/components/ui/external/PaginationComponent';
import React from 'react';
import { MyTicketModuleProps } from './interface';
import { Navigation } from './module-elements/Navigation';
import { TicketHistoryItem } from './module-elements/TicketHistoryItem';
import { AuthNavbar } from '@/components/shared/Navbar';

const MyTicketModule: React.FC<MyTicketModuleProps> = ({
  page: pageStr,
  history,
}) => {
  const pageInt = Number(pageStr) || 1;

  return (
    <div className="flex flex-col items-center px-0 md:px-4 md:pt-4 pb-12 w-screen  min-h-screen">
      <div className="md:hidden">
        <AuthNavbar variant="SCROLL"/>
      </div>
      <div className="hidden md:flex">
        <AuthNavbar variant="FIXED"/>
      </div>
      <div className="flex flex-col p-4 sm:p-8 gap-4 sm:gap-6 md:gap-7 md:mt-16 max-w-screen-md bg-white md:rounded-xl border border-[#E9E9E9]">
        <h1 className="font-semibold text-xl sm:text-2xl">My Tickets</h1>
        <Navigation history={history} />
        <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
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
