import { useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DatePicker from '@/app/components/date-picker/DatePicker';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

// Zod
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

export default function RecordExpensesForm({ budgets, onSuccess }) {
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    budgetId: z.string(),
    expenseTitle: z.string(),
    expenseCategory: z.string(),
    expenseDescription: z.string(),
    expenseAmount: z.coerce
      .number({
        required_error: 'Expenses Amount is required',
        invalid_type_error: 'Expenses must be a number',
      })
      .min(1, 'Expenses must be greater than 0'),
    expenseDate: z.date({
      required_error: 'Date is required',
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      budgetId: '',
      expenseTitle: '',
      expenseCategory: '',
      expenseDescription: '',
      expenseAmount: '',
      expenseDate: new Date(),
    },
  });

  const recordExpenses = async (data) => {
    setIsLoading(true);

    try {
      const res = await fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      let responseData;
      if (res.headers.get('content-type')?.includes('application/json')) {
        responseData = await res.json();
      }

      if (!res.ok) {
        throw new Error(responseData?.message || 'Failed to record expenses');
      }

      toast.success('Expenses Recorded!');
      if (onSuccess) onSuccess();
      form.reset();
    } catch (err) {
      console.error('Error adding expenses:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Record Expenses</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(recordExpenses)}>
            <FieldGroup>
              <div className="flex flex-row gap-5">
                <Controller
                  name="expenseTitle"
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
                        placeholder="e.g, Mcdo"
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
                  name="expenseCategory"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor={field.name}
                        className={cn(fieldState.invalid && 'text-destructive')}
                      >
                        Category
                      </FieldLabel>

                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="e.g, Food" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="food">Food</SelectItem>
                          <SelectItem value="transportation">
                            Transportation
                          </SelectItem>
                          <SelectItem value="bills">Bills</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              <Controller
                name="budgetId"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor={field.name}
                      className={cn(fieldState.invalid && 'text-destructive')}
                    >
                      Deduct From
                    </FieldLabel>
                    <FieldDescription>
                      Choose where to deduct this expense from
                    </FieldDescription>

                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="e.g, Personal" />
                      </SelectTrigger>

                      <SelectContent>
                        {budgets.map((b) => (
                          <SelectItem key={b.id} value={b.id}>
                            {b.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="expenseAmount"
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

              <div className="flex flex-row gap-5">
                <Controller
                  name="expenseDescription"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor={field.name}
                        className={cn(fieldState.invalid && 'text-destructive')}
                      >
                        Note
                      </FieldLabel>

                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        type="text"
                        placeholder="e.g, Cravings"
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
                  name="expenseDate"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Date</FieldLabel>
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              <Field>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Spinner className="w-4 h-4 mr-2 animate-spin" />
                      Recording...
                    </>
                  ) : (
                    'Record Expense'
                  )}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
