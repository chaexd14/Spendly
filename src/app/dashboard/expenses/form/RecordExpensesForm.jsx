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
  FieldSeparator,
  FieldError,
  FieldGroup,
  FieldLabel,
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

import { Input } from '@/components/ui/input';
import DatePicker from '@/app/components/date-picker/DatePicker';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';

export default function RecordExpensesForm() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Record Expenses</CardTitle>
        </CardHeader>

        <CardContent>
          <form>
            <FieldGroup>
              <div className="flex flex-row gap-5">
                <Field>
                  <FieldLabel>Title</FieldLabel>
                  <Input placeholder="e.g, Mcdo" />
                </Field>

                <Field>
                  <FieldLabel>Category</FieldLabel>
                  <Select>
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
                </Field>
              </div>

              <Field>
                <FieldLabel>Amount</FieldLabel>
                <Input placeholder="e.g, 100" />
              </Field>

              <Field>
                <FieldLabel>Note</FieldLabel>
                <Input className="h-[80px]" placeholder="e.g, Cravings" />
              </Field>

              <Field>
                <FieldLabel>Date</FieldLabel>
                <DatePicker />
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
