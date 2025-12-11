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

export default function AddContributionForm({ goalId }) {
  const [selectedGoalId] = useState(goalId);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    amount: z.coerce
      .number({
        required_error: 'Goal Amount is required',
        invalid_type_error: 'Goal must be a number',
      })
      .min(1, 'Goal must be greater than 0'),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      goalId: selectedGoalId,
      amount: '',
    },
  });

  const addContribution = async (data) => {
    setIsLoading(true);

    try {
      const res = await fetch(`/api/goals/${selectedGoalId}/contribute`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goalId: selectedGoalId, ...data }),
      });

      let responseData;
      if (res.headers.get('content-type')?.includes('application/json')) {
        responseData = await res.json();
      }

      if (!res.ok) {
        throw new Error(responseData?.message || 'Failed to add contribution');
      }

      toast.success('Contribution Added!');
      form.reset();
    } catch (err) {
      console.error('Error adding contribution:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  console.log(selectedGoalId);
  return (
    <>
      <form onSubmit={form.handleSubmit(addContribution)}>
        <FieldGroup>
          <Controller
            name="amount"
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
                  Adding...
                </>
              ) : (
                'Add'
              )}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </>
  );
}
