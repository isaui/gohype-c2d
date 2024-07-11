import React from 'react';
import { Badge } from '@/components/ui/badge';
import { toTitleCase } from '@/utils/toTitleCase';

export interface PersonListItemProps {
    name: string;
    description: string;
    status: 'CHECKED_IN' | 'NOT_CHECKED_IN' | 'CHECKED_OUT';
    variant?: 'OUTLINE' | 'OUTLINE_VERTICAL' | 'NO_OUTLINE';
  }
  
export const PersonListItem: React.FC<PersonListItemProps> = ({
  name,
  description,
  status,
  variant= 'OUTLINE'
}) => {
 
  const generateBorderClassVariant = (variant: string) => {
    if(variant == 'OUTLINE_VERTICAL'){
        return " border-y border-background rounded-none"
    }
    if(variant == 'OUTLINE'){
        return "border border-[#D1D1D1] rounded-lg"
    }
    else{
        return ""
    }
  }  
  return (
    <div className={`flex gap-2 w-full justify-between ${generateBorderClassVariant(variant)} p-2`}>
      <div className='flex flex-col text-left gap-y-2'>
        <h3 className="font-semibold sm:text-lg">{name}</h3>
        <p className="text-sm sm:text-base text-[#606060]">
          {description}
        </p>
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