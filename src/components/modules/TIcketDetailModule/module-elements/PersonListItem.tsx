import React from 'react';
import { Badge } from '@/components/ui/badge';
import { toTitleCase } from '@/utils/toTitleCase';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PersonListItemProps } from '../interface';

export const PersonListItem: React.FC<PersonListItemProps> = ({
  name,
  description,
  status,
  expiresAt,
}) => {
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
          <div className="text-start flex flex-col gap-1">
            <DialogTitle className="font-semibold text-xl">{name}</DialogTitle>
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
        </DialogHeader>
        <div>
          <span className="flex font-semibold  flex-col text-sm">
            <span className="whitespace-nowrap">Expires at: </span>
            <span className="text-[#FF7A00]">{expiresAt}</span>
          </span>
        </div>
        <DialogFooter className="gap-2 flex-col sm:flex-col">
          <Button
            type="submit"
            variant={status === 'CHECKED_IN' ? 'danger' : 'success'}
          >
            Confirm Checked {status === 'CHECKED_IN' ? 'Out' : 'In'}
          </Button>
          <DialogClose className="w-full !m-0">
            <Button className="w-full" variant={'secondary'}>
              See Ticket Details
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
