import React from 'react';
import { TicketHistoryItemProps } from '../interface';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export const TicketHistoryItem: React.FC<TicketHistoryItemProps> = ({
  id,
  title,
  variant,
}) => {
  return (
    <Link
      href={`/my-tickets/${id}`}
      className="drop-shadow-md p-3 sm:p-6 rounded-2xl bg-white border border-[#F3F3F3] flex items-center gap-4 hover:bg-black/5 transition-all"
    >
      <div className="w-full flex flex-col gap-1">
        <span className="hidden sm:block text-sm text-[#606060]">
          ID: #{id}
        </span>
        <h2 className="text-base sm:text-xl font-semibold">{title}</h2>
        <h3 className="text-sm sm:text-base text-[#606060]">{variant}</h3>
      </div>
      <ChevronRight />
    </Link>
  );
};
