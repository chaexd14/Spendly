import {
  Field,
  FieldDescription,
  FieldSeparator,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import DatePicker from '@/app/components/date-picker/DatePicker';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';

import * as z from 'zod';
import { cn } from '@/lib/utils';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

export default function RecordSavingsForm({ onSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const formSchema = z.object({
    savingsTitle: z.string(),
    savingsAmount: z.coerce
      .number({
        required_error: 'Income Amount is required',
        invalid_type_error: 'Amount must be a number',
      })
      .min(1, 'Amount must be greater than 0'),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      savingsTitle: '',
      savingsAmount: '',
    },
  });

  const recordSavings = async (data) => {
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/savings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      let responseData;
      if (res.headers.get('content-type')?.includes('application/json')) {
        responseData = await res.json();
      }

      if (!res.ok) {
        throw new Error(responseData?.message || 'Failed to add savings');
      }

      toast.success('Savings Recorded!');
      if (onSuccess) onSuccess();
      form.reset();
    } catch (err) {
      console.error('Error adding savings:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex flex-col items-center justify-between w-full">
      <CardHeader className="w-full py-4">
        <CardTitle className="text-xl">Record Savings</CardTitle>
      </CardHeader>

      {error && (
        <Label className="text-sm text-center text-red-500">{error}</Label>
      )}

      <CardContent className="w-full">
        <form onSubmit={form.handleSubmit(recordSavings)}>
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

                  <FieldDescription>
                    Give your saving a clear name, like "Extra income".
                  </FieldDescription>

                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    type="string"
                    placeholder="Hardwork"
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
                  <FieldLabel>Amount</FieldLabel>
                  <FieldDescription>
                    Enter the amount you want to add to your savings.
                  </FieldDescription>
                  <Input
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    aria-invalid={fieldState.invalid}
                    type="number"
                    placeholder="100"
                    className={cn(
                      fieldState.invalid &&
                        'border-destructive focus-visible:ring-destructive'
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
                    Recording...
                  </>
                ) : (
                  'Record'
                )}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
