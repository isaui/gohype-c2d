'use client';

import { Button } from '@/components/ui/button';
import { QrCode } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const ScannerModule: React.FC = () => {
  return (
    <div className="container flex flex-col gap-10 items-center h-screen p-20">
      <div className="relative w-full max-w-screen-sm h-[80vh] rounded-2xl overflow-hidden ">
        <Image
          src={
            'https://www.shutterstock.com/image-vector/qr-code-scanning-icon-smartphone-600nw-1968550138.jpg'
          }
          alt="Cover Image"
          fill
          className="object-contain bg-white"
        />
      </div>
      <Link href={'/scanner/scan'}>
        <Button className="flex items-center gap-2">
          <span>Scan Ticket</span>
          <QrCode />
        </Button>
      </Link>
    </div>
  );
};
