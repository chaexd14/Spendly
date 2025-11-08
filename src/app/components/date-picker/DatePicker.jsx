'use client';

import { useState } from 'react';
import { format } from 'date-fns';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

// ICON
import { Calendar as CalendarIcon } from 'lucide-react';

export default function DatePicker({ value, onChange }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!value}
          className="data-[empty=true]:text-muted-foreground w-[280px] justify-between text-left font-normal"
        >
          {value ? format(value, 'PPP') : <span>Select date</span>}
          <CalendarIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value || new Date()}
          onSelect={(date) => onChange(date || new Date())}
        />
      </PopoverContent>
    </Popover>
  );
}
