import React from 'react';
import { TicketDetailModuleProps } from './interface';
import { BackButton } from './module-elements/BackButton';
import { formatTime } from '@/utils/formatTime';
import { TICKET_DETAIL } from './constant';
import { MONTH_NAMES } from '@/constant';
import { PersonListItem } from './module-elements/PersonListItem';
import { toTitleCase } from '@/utils/toTitleCase';
import { TicketNavbar } from '@/components/shared/Navbar';

const TicketDetailModule: React.FC<TicketDetailModuleProps> = ({ id }) => {
  const ticketDetail = TICKET_DETAIL;

  let checkOutDate: Date = null;
  if (ticketDetail.checkInDate) {
    checkOutDate = new Date(ticketDetail.checkInDate);
    checkOutDate.setMinutes(checkOutDate.getMinutes() + ticketDetail.duration);
  }
  const validDate = new Date(ticketDetail.validDate);

  return (
    <div className="flex flex-col items-center md:px-2 md:pt-2 pb-12 container max-w-screen-lg mx-auto min-h-screen">
      <div className="md:hidden">
        <TicketNavbar variant="SCROLL" />
      </div>
      <div className="hidden md:flex">
        <TicketNavbar variant="FIXED" />
      </div>
      <div className="flex flex-col mt-2 gap-4 p-0 md:p-4 w-full">
        <BackButton />
        <div className="flex flex-col p-4 sm:p-8 gap-4 sm:gap-6 md:gap-7 w-full bg-white md:rounded-xl border border-[#E9E9E9]">
          <div className="flex md:items-center flex-col md:flex-row justify-between">
            <h1 className="font-semibold text-xl sm:text-2xl">
              {ticketDetail.title}
            </h1>
            <span>ID: #{ticketDetail.id}</span>
          </div>
          {ticketDetail.isCheckedIn &&
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
          )}
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-lg">
              Children{' '}
              <span className="text-[#606060]">
                ({ticketDetail.children.length})
              </span>
            </h2>
            <div className="flex flex-col gap-2">
              {ticketDetail.children.map((child, index) => (
                <PersonListItem
                  key={index}
                  name={child.name}
                  description={`${toTitleCase(child.gender)}, ${
                    child.age
                  } years old`}
                  status={child.status}
                  expiresAt={
                    checkOutDate &&
                    `${formatTime(checkOutDate.toISOString())} (
                  ${ticketDetail.duration} minutes remaining)`
                  }
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-lg">
              Companions{' '}
              <span className="text-[#606060]">
                ({ticketDetail.companions.length})
              </span>
            </h2>
            <div className="flex flex-col gap-2">
              {ticketDetail.companions.map((companion, index) => (
                <PersonListItem
                  key={index}
                  name={companion.name}
                  description={`${companion.identityType} ${companion.identityValue}`}
                  status={companion.status}
                  expiresAt={
                    checkOutDate &&
                    `${formatTime(checkOutDate.toISOString())} (
                    ${ticketDetail.duration} minutes remaining)`
                  }
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
