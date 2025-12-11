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

import { Button } from '@/components/ui/button';
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

      let responseData;
      if (res.headers.get('content-type')?.includes('application/json')) {
        responseData = await res.json();
      }

      if (!res.ok) {
        throw new Error(responseData?.message || 'Failed to add income');
      }

      toast.success('Goal Set!');
      form.reset();
    } catch (err) {
      console.error('Error creating goal:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>Set Goals</CardTitle>
      </CardHeader>

      <CardContent className="h-full">
        <form onSubmit={form.handleSubmit(createGoal)} className="h-full">
          <FieldGroup className="flex flex-col justify-between h-full">
            <Controller
              name="goalName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className={cn(fieldState.invalid && 'text-destructive')}
                  >
                    Title
                  </FieldLabel>
                  <FieldDescription>
                    Give your goal a clear title so you can easily identify it
                    later.
                  </FieldDescription>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    type="text"
                    placeholder="e.g, New Laptop"
                    className={cn(
                      fieldState.invalid &&
                        'border-destructive focus-visible:ring-destructive '
                    )}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="goalAmount"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className={cn(fieldState.invalid && 'text-destructive')}
                  >
                    Target Amount
                  </FieldLabel>
                  <FieldDescription>
                    Enter the total amount you want to save for this goal.
                  </FieldDescription>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    type="number"
                    placeholder="e.g, 50,000"
                    className={cn(
                      fieldState.invalid &&
                        'border-destructive focus-visible:ring-destructive '
                    )}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="goalTargetDate"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Target Completion Date</FieldLabel>
                  <FieldDescription>
                    Choose the date by which you want to achieve this goal.
                  </FieldDescription>
                  <DatePicker value={field.value} onChange={field.onChange} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Field>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Spinner className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Goal'
                )}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
