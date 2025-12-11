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

export default function EditSavingsForm({
  savingsId,
  savingsTitle,
  savingsAmount,
}) {
  const [selectedSavingsId] = useState(savingsId);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    savingsTitle: z.string(),
    savingsAmount: z.coerce
      .number({
        required_error: 'Goal Amount is required',
        invalid_type_error: 'Goal must be a number',
      })
      .min(1, 'Goal must be greater than 0'),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      savingsTitle: savingsTitle,
      savingsAmount: savingsAmount,
    },
  });

  const editSavings = async (data) => {
    setIsLoading(true);

    try {
      const res = await fetch(`/api/savings/${selectedSavingsId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ savingsId: selectedSavingsId, ...data }),
      });

      let responseData;
      if (res.headers.get('content-type')?.includes('application/json')) {
        responseData = await res.json();
      }

      if (!res.ok) {
        throw new Error(responseData?.message || 'Failed to add contribution');
      }

      toast.success('Savings Saved!');
      form.reset();
    } catch (err) {
      console.error('Error adding contribution:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={form.handleSubmit(editSavings)}>
        <FieldGroup>
          <Controller
            name="savingsTitle"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className={cn(fieldState.invalid && 'text-destructive')}
                >
                  Title
                </FieldLabel>
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
            name="savingsAmount"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className={cn(fieldState.invalid && 'text-destructive')}
                >
                  Amount
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  type="number"
                  placeholder="e.g, 5,000"
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

          <Field>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Spinner className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save'
              )}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </>
  );
}
