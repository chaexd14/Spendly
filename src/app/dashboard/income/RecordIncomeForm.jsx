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

function RecordIncomeForm() {
  return (
    <Card className="flex flex-col items-center justify-between">
      <CardHeader className="w-full py-4">
        <CardTitle className="text-xl">Record Income</CardTitle>
      </CardHeader>

      <CardContent>
        <form>
          <FieldGroup>
            <div className="flex items-center justify-center gap-5">
              <Field>
                <FieldLabel>Title</FieldLabel>
                <Input type="string" placeholder="Hardwork" />
              </Field>

              <Field>
                <FieldLabel>Source</FieldLabel>
                <Input type="string" placeholder="commission" />
              </Field>
            </div>

            <Field>
              <FieldLabel>Amount</FieldLabel>
              <Input type="number" placeholder="100" />
            </Field>

            <Field>
              <FieldLabel>Date Acquired</FieldLabel>
              <DatePicker />
            </Field>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="w-full">
        <Button className="w-full">Record</Button>
      </CardFooter>
    </Card>
  );
}

export default RecordIncomeForm;
