import React from 'react';
import { TicketDetailModuleProps } from './interface';
import { BackButton } from './module-elements/BackButton';
import { formatTime } from '@/utils/formatTime';
// import { TICKET_DETAIL } from './constant';
// import { MONTH_NAMES } from '@/constant';
import { PersonListItem } from './module-elements/PersonListItem';
import { toTitleCase } from '@/utils/toTitleCase';
import Navbar from '@/components/shared/Navbar';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

const TicketDetailModule: React.FC<TicketDetailModuleProps> = async ({
  id,
}) => {
  const supabase = createClient();
  const userResponse = await supabase.auth.getUser();
  const userId = userResponse.data.user?.id ?? '';

  if (!userId) redirect('/');

  const { data: ticketDetail, error: ticketDetailError } = await supabase
    .from('order')
    .select('*, ticket_holder(*), ticket(*)')
    .eq('order_num', id)
    .eq('customer', userId)
    .single();

  console.log(ticketDetail);

  //   let checkOutDate: Date = null;
  //   if (ticketDetail.checkInDate) {
  //     checkOutDate = new Date(ticketDetail.checkInDate);
  //     checkOutDate.setMinutes(checkOutDate.getMinutes() + ticketDetail.duration);
  //   }
  //   const validDate = new Date(ticketDetail.validDate);

  if (!ticketDetail || ticketDetailError) redirect('/');

  return (
    <div className="flex flex-col items-center px-2 md:px-2 md:pt-2 pb-12 container max-w-screen-lg mx-auto min-h-screen">
      <div className="md:hidden">
        <Navbar variant="SCROLL" />
      </div>
      <div className="hidden md:flex">
        <Navbar variant="FIXED" />
      </div>
      <div className="flex flex-col mt-2 gap-4 p-0 md:p-4 w-full">
        <BackButton />
        <div className="flex flex-col p-4 sm:p-8 gap-4 sm:gap-6 md:gap-7 w-full bg-white md:rounded-xl border border-[#E9E9E9]">
          <div className="flex md:items-center flex-col md:flex-row justify-between">
            <h1 className="font-semibold text-xl sm:text-2xl">
              {ticketDetail.ticket?.ticket_name}
            </h1>
            <span>ID: #{ticketDetail.id}</span>
          </div>
          {/* {ticketDetail.isCheckedIn &&
          ticketDetail.checkInDate &&
          checkOutDate ? (
            <div className="font-semibold text-sm sm:text-base flex flex-col gap-1 bg-[#FFFAF1] border border-[#F0E3CD] p-3">
              <span className="flex gap-1 flex-col sm:flex-row">
                <span className="whitespace-nowrap">
                  First time checked in:{' '}
                </span>
                <span className="font-bold text-[#FF7A00]">
                  {formatTime(ticketDetail.checkInDate)}
                </span>
              </span>
              <span className="flex gap-1 flex-col sm:flex-row">
                <span className="whitespace-nowrap">
                  Play time expires at:{' '}
                </span>
                <span className="font-bold text-[#FF7A00]">
                  {formatTime(checkOutDate.toISOString())} (
                  {ticketDetail.duration} minutes remaining)
                </span>
              </span>
            </div>
          ) : (
            <span className="text-[#0075FF] font-medium">
              Valid until {validDate.getUTCDate()}{' '}
              {MONTH_NAMES[validDate.getUTCMonth()]}{' '}
              {validDate.getUTCFullYear()} only on{' '}
              {ticketDetail.isWeekend ? 'weekends' : 'weekdays'}
            </span>
          )} */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              {ticketDetail.ticket_holder.map((holder) => (
                <PersonListItem
                  key={holder.id}
                  name={holder.fullname || '<no-name>'}
                  status={holder.status}
                  id={holder.id}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailModule;
