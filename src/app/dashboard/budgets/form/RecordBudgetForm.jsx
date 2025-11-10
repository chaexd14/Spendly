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

export default function RecordBudgetForm() {
  return (
    <>
      <Card className="flex flex-col justify-between h-full">
        <CardHeader>
          <CardTitle>Create Budget</CardTitle>
        </CardHeader>

        <CardContent>
          <form action="">
            <FieldGroup>
              <div className="flex justify-center gap-5">
                <Field>
                  <FieldLabel>Title</FieldLabel>
                  <Input type="text" placeholder="Food" />
                </Field>

                <Field>
                  <FieldLabel>Budget Frequency</FieldLabel>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="e.g., Weekly" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              </div>

              <Field>
                <FieldLabel>Budget</FieldLabel>
                <FieldDescription>
                  Enter the total amount you want to allocate.
                </FieldDescription>
                <Input type="number" placeholder="100" />
              </Field>

              <Field>
                <FieldLabel>Start Date</FieldLabel>
                <FieldDescription>
                  Choose when this budget begins.
                </FieldDescription>

                <DatePicker />
              </Field>
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter>
          <Button className="w-full">Create</Button>
        </CardFooter>
      </Card>
    </>
  );
}
