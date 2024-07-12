import React from 'react';
import { Badge } from '@/components/ui/badge';
import { toTitleCase } from '@/utils/toTitleCase';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PersonListItemProps } from '../interface';
import Image from 'next/image';
import { MONTH_NAMES } from '@/constant';
import { formatTime } from '@/utils/formatTime';
import { toTimestampTz } from '@/utils/toTimestampTz';

export const PersonListItem: React.FC<PersonListItemProps> = ({
  name,
  description,
  status,
  expiresAt,
  validDate,
  isWeekend,
}) => {
  const currentDate = new Date();

  const startOfValidDate = new Date(validDate);
  startOfValidDate.setHours(0, 0, 0, 0);

  const endOfValidDate = new Date(validDate);
  endOfValidDate.setHours(23, 59, 59, 999);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex gap-2 justify-between text-start border border-[#D1D1D1] rounded-lg p-2">
          <div>
            <h3 className="font-semibold sm:text-lg">{name}</h3>
            <span className="text-sm sm:text-base text-[#606060]">
              {description}
            </span>
          </div>
          <Badge
            variant={
              status === 'CHECKED_IN'
                ? 'success'
                : status === 'CHECKED_OUT'
                ? 'danger'
                : 'disabled'
            }
          >
            <span className="whitespace-nowrap">
              {toTitleCase(status, '_')}
            </span>
          </Badge>
        </button>
      </DialogTrigger>
      <DialogContent
        showClose={false}
        className=" bottom-0 top-auto translate-y-0 w-full rounded-t-xl sm:rounded-b-none max-w-none"
      >
        <DialogHeader className="flex flex-row gap-2 justify-between">
          {currentDate > startOfValidDate ? (
            <>
              <div className="text-start flex flex-col gap-1">
                <DialogTitle className="font-semibold text-xl">
                  {name}
                </DialogTitle>
                <DialogDescription className="text-sm sm:text-base text-[#606060]">
                  {description}
                </DialogDescription>
              </div>
              <Badge
                className="!mt-0"
                variant={
                  status === 'CHECKED_IN'
                    ? 'success'
                    : status === 'CHECKED_OUT'
                    ? 'danger'
                    : 'disabled'
                }
              >
                <span className="whitespace-nowrap">
                  {toTitleCase(status, '_')}
                </span>
              </Badge>
            </>
          ) : (
            <div className="relative w-full aspect-video rounded-full overflow-hidden mb-3">
              <Image
                src={
                  'https://media.istockphoto.com/id/1199972839/vector/exclamation-calendar-simple-vector-modern-icon-design-illustration.jpg?s=612x612&w=0&k=20&c=yRI7IrkqybbIfkGdKGXlxuYyZDUNtXRUSoKDNb16_Jc='
                }
                alt="Invalid date"
                fill
                className="object-cover"
              />
            </div>
          )}
        </DialogHeader>
        {currentDate < startOfValidDate ? (
          <div className="flex flex-col gap-2 text-center">
            <span className="font-semibold">Ups Something Wrong!</span>
            <span className="text-sm">
              This ticket only valid on {isWeekend ? 'weekends' : 'weekdays'}{' '}
              until {validDate.getUTCDate()}{' '}
              {MONTH_NAMES[validDate.getUTCMonth()]}{' '}
              {validDate.getUTCFullYear()}. Comeback later!
            </span>
          </div>
        ) : currentDate < endOfValidDate ? (
          expiresAt ? (
            <div>
              <span className="flex font-semibold  flex-col text-sm">
                <span className="whitespace-nowrap">Expires at: </span>
                <span className="text-[#FF7A00]">{expiresAt}</span>
              </span>
            </div>
          ) : (
            <span className="text-[#0075FF] font-medium">
              Valid until {validDate.getUTCDate()}{' '}
              {MONTH_NAMES[validDate.getUTCMonth()]}{' '}
              {validDate.getUTCFullYear()} only on{' '}
              {isWeekend ? 'weekends' : 'weekdays'}
            </span>
          )
        ) : (
          <span className="text-[#DA0000] font-medium">
            This ticket expired on {validDate.getUTCDate()}{' '}
            {MONTH_NAMES[validDate.getUTCMonth()]} {validDate.getUTCFullYear()}{' '}
            at {formatTime(toTimestampTz(validDate))} WIB.
          </span>
        )}
        {currentDate > startOfValidDate && currentDate < endOfValidDate && (
          <DialogFooter className="gap-2 flex-col sm:flex-col">
            <Button
              type="submit"
              variant={status === 'CHECKED_IN' ? 'danger' : 'success'}
            >
              Confirm Checked {status === 'CHECKED_IN' ? 'Out' : 'In'}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
