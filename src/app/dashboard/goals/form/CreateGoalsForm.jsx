'use client';

import { useState } from 'react';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import DatePicker from '@/app/components/date-picker/DatePicker';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

// Zod
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

export default function CreateGoalsForm() {
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    goalName: z.string(),
    goalAmount: z.coerce
      .number({
        required_error: 'Goal Amount is required',
        invalid_type_error: 'Goal must be a number',
      })
      .min(1, 'Goal must be greater than 0'),
    goalTargetDate: z.date({
      required_error: 'Date is required',
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      goalName: '',
      goalAmount: '',
      goalTargetDate: new Date(),
    },
  });

  const createGoal = async (data) => {
    setIsLoading(true);

    try {
      const res = await fetch('/api/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch {}
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Set Goals</CardTitle>
      </CardHeader>

      <CardContent>
        <form></form>
      </CardContent>
    </Card>
  );
}
