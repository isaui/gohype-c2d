'use client';

import { Badge } from '@/components/ui/badge';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { NavigationProps } from '../interface';

export const Navigation: React.FC<NavigationProps> = ({ history }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleSearchparams = (key: string, value?: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Badge
        variant={history ? 'default' : 'secondary'}
        onClick={() => handleSearchparams('history', 'false')}
      >
        Ongoing
      </Badge>
      <Badge
        variant={history ? 'secondary' : 'default'}
        onClick={() => handleSearchparams('history', 'true')}
      >
        History
      </Badge>
    </div>
  );
};
