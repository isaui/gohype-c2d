import React from 'react';
import { PersonListItemProps } from '../interface';
import { Badge } from '@/components/ui/badge';
import { toTitleCase } from '@/utils/toTitleCase';

export const PersonListItem: React.FC<PersonListItemProps> = ({
  name,
  description,
  status,
}) => {
  return (
    <div className="flex gap-2 justify-between border border-[#D1D1D1] rounded-lg p-2">
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
        <span className="whitespace-nowrap">{toTitleCase(status, '_')}</span>
      </Badge>
    </div>
  );
};
