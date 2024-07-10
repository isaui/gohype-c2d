'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export const BackButton: React.FC = () => {
  const router = useRouter();
  return (
    <button
      className="flex items-center gap-2 group"
      onClick={() => router.back()}
    >
      <ArrowLeft className="stroke-[#282828] group-hover:stroke-[#28282890] transition-all" />{' '}
      <span className="text-lg font-semibold text-[#282828] group-hover:text-[#28282890] transition-all">
        Back
      </span>
    </button>
  );
};
