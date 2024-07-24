import React from 'react';
import { Badge } from '@/components/ui/badge';
import { toTitleCase } from '@/utils/toTitleCase';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PersonListItemProps } from '../interface';
import { QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import QRCode from 'react-qr-code';

export const PersonListItem: React.FC<PersonListItemProps> = ({
  id,
  name,
  status,
}) => {
  return (
    <div className="flex justify-between border-2 rounded-xl items-center p-3">
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold sm:text-lg">{name}</h3>
        <Badge
          className="w-fit"
          variant={
            status === 'CHECKED_IN'
              ? 'success'
              : status === 'CHECKED_OUT'
              ? 'danger'
              : 'disabled'
          }
        >
          <span className="whitespace-nowrap">{toTitleCase(status, '_')}</span>
        </Badge>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex gap-2 justify-between text-start border border-[#D1D1D1] rounded-lg py-6">
            Open QR Code <QrCode />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="flex flex-col">
            <h3 className="text-[#282828] font-semibold text-lg">Tickets</h3>
            <span className="text-sm text-[#606060] !mt-0">ID: #{id}</span>
          </DialogHeader>
          <div className="relative flex justify-center">
            <QRCode value={id} />
          </div>
          <DialogFooter className="w-full flex flex-row sm:justify-center justify-center">
            <span className="font-semibold text-lg text-center">{name}</span>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
