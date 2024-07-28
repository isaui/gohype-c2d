'use client'

import React, { useState } from 'react';
import Scanner from './module-elements/Scanner';
import Stack from '@/components/shared/Stack';

export const ScannerModule: React.FC = () => {
  return (
    <div className="flex flex-col gap-10 items-center h-screen md:px-4">
      <Stack className='max-w-screen-sm'> 
      <div className="w-full  h-full flex items-center justify-center ">
        <Scanner
        />
      </div>
      <div className='w-full h-32 bg-black opacity-40 mb-auto'></div>
      <div className='w-full h-32 bg-black opacity-40 mt-auto'></div>
      </Stack>
    </div>
  );
};
