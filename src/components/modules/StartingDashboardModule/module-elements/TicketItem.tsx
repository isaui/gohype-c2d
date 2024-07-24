import React from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { TicketItemProps } from '../interface';

export const TicketItem: React.FC<TicketItemProps> = ({
  id,
  title,
  variant,
  ticketPath
}) => {
  return (
    <Link
      href={`/${ticketPath}/dashboard`}
      className="drop-shadow-md p-3 sm:p-6 rounded-2xl bg-white border border-[#F3F3F3] flex items-center gap-4 hover:bg-black/5 transition-all"
    >
      <div className="w-full flex flex-col gap-1">
        <span className="hidden sm:block text-sm text-[#606060] line-clamp-1">
          ID: {id}
        </span>
        <h2 className="text-base sm:text-xl font-semibold">{title}</h2>
        <h3 className="text-sm sm:text-base text-[#606060]">{variant}</h3>
      </div>
      <ChevronRight />
    </Link>
  );
};
