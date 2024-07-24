import { TICKETS_PER_PAGE } from './constant';
import PaginationComponent from '@/components/ui/external/PaginationComponent';
import React from 'react';
import { MyTicketModuleProps, TicketOrders } from './interface';
import { Navigation } from './module-elements/Navigation';
import { TicketHistoryItem } from './module-elements/TicketHistoryItem';
import Navbar from '@/components/shared/Navbar';
import { createClient } from '@/utils/supabase/server';

const MyTicketModule: React.FC<MyTicketModuleProps> = async ({
  page: pageStr,
  history,
}) => {
  let isValid = false
  let totalItems = 0
  let ticketOrders: TicketOrders[] = [] 
  const pageInt = Number(pageStr) || 1;
  const supabase = createClient()
  const userResponse = await supabase.auth.getUser();
  const userId = userResponse.data.user?.id ?? ""
  
  if(userId){
    isValid = true

    const baseQuery = supabase
      .from("order")
      .select('*, ticket(*)')
      .eq("customer", userId);

    const [countResult, dataResult] = await Promise.all([
      supabase
        .from("order")
        .select('id', { count: 'exact', head: true })
        .eq("customer", userId),
      baseQuery
        .range((pageInt - 1) * TICKETS_PER_PAGE, pageInt * TICKETS_PER_PAGE - 1)
        .order('created_at', { ascending: false })
    ]);

    if(countResult && countResult.count !== null){
      totalItems = countResult.count;
    }
    if(dataResult && dataResult.data){
      ticketOrders = dataResult.data;
    }
  }

  const isOngoing = (ticket: TicketOrders['ticket']) => {
    if (!ticket) return false;
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Reset waktu ke 00:00:00
  
    const startDate = ticket.ticket_start_date ? new Date(ticket.ticket_start_date) : null;
    const endDate = ticket.ticket_end_date ? new Date(ticket.ticket_end_date) : null;
  
    if (startDate) startDate.setHours(0, 0, 0, 0);
    if (endDate) endDate.setHours(0, 0, 0, 0);
  
    if (startDate && endDate) {
      return now <= startDate && now <= endDate;
    } else if (startDate) {
      return now <= startDate;
    } else if (endDate) {
      return now <= endDate;
    }
    return true; // Jika tidak ada tanggal sama sekali, anggap sebagai ongoing
  };

  ticketOrders = ticketOrders.filter(order => history ? !isOngoing(order.ticket) : isOngoing(order.ticket));

  totalItems = ticketOrders.length;

  return (
    <div className="flex flex-col items-center px-0 md:px-4 md:pt-4 pb-12 w-screen  min-h-screen">
      <div className="md:hidden">
        <Navbar isAuthRequired={true} variant="SCROLL"/>
      </div>
      <div className="hidden md:flex">
        <Navbar isAuthRequired={true} variant="FIXED"/>
      </div>
      <div className="flex flex-col p-4 sm:p-8 gap-4 sm:gap-6 md:gap-7 md:mt-16 w-full md:w-[48rem] bg-white md:rounded-xl border border-[#E9E9E9]">
        <h1 className="font-semibold text-xl sm:text-2xl">{history ? "Ticket History" : "Ongoing Tickets"}</h1>
        <Navigation history={history} />
        {isValid ? (
          <>
            {ticketOrders.length > 0 ? (
              <>
                <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
                  {ticketOrders.map((data) => (
                    <TicketHistoryItem
                      key={data.order_num}
                      id={data.order_num}
                      title={data.ticket?.ticket_name ?? "undefined ticket"}
                      variant={`${data.ticket_total} Tickets`}
                    />
                  ))}
                </div>
                {totalItems > TICKETS_PER_PAGE && 
                  <PaginationComponent
                    currentPage={pageInt}
                    itemsPerPage={TICKETS_PER_PAGE}
                    totalItems={totalItems}
                  />
                }
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-64">
                <p className="text-xl font-semibold text-gray-500">
                  {history ? "Tidak ada riwayat tiket" : "Belum ada tiket yang aktif"}
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-xl font-semibold text-red-500">Please login to view your tickets</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTicketModule;

