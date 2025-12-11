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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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

export default function EditBudget({
  budgetId,
  budgetTitle,
  budgetPeriodType,
  totalBudget,
}) {
  const [selectedBudgetId] = useState(budgetId);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    budgetTitle: z.string(),
    budgetPeriodType: z.string(),
    totalBudget: z.coerce
      .number({
        required_error: 'Budget Amount is required',
        invalid_type_error: 'Budget must be a number',
      })
      .min(1, 'Budget must be greater than 0'),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      budgetTitle: budgetTitle,
      budgetPeriodType: budgetPeriodType,
      totalBudget: totalBudget,
    },
  });

  const editGoal = async (data) => {
    setIsLoading(true);

    try {
      const res = await fetch(`/api/budgets/${selectedBudgetId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ budgetId: selectedBudgetId, ...data }),
      });

      let responseData;
      if (res.headers.get('content-type')?.includes('application/json')) {
        responseData = await res.json();
      }

      if (!res.ok) {
        throw new Error(responseData?.message || 'Failed to edit Budget');
      }

      toast.success('Budget Updated!');
      form.reset();
    } catch (err) {
      console.error('Error edditing Budget:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={form.handleSubmit(editGoal)}>
        <FieldGroup>
          <Controller
            name="budgetTitle"
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
                  placeholder="Food"
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
            name="periodType"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className={cn(fieldState.invalid && 'text-destructive')}
                >
                  Budget Frequency
                </FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="e.g., Weekly" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="totalBudget"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className={cn(fieldState.invalid && 'text-destructive')}
                >
                  Budget
                </FieldLabel>
                <FieldDescription>
                  Enter the total amount you want to allocate.
                </FieldDescription>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  type="number"
                  placeholder="e.g., 100"
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
