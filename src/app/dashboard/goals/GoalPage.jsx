import { Button } from '@/components/ui/button';
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

import CreateGoalsForm from './form/CreateGoalsForm';

export default function GoalPage() {
  return (
    <div>
      <Card>
        <CardHeader>
          <div>
            <CardTitle className="text-2xl">Goals</CardTitle>
            <CardDescription>
              Create your goals and track your progress over time.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>

      <div>
        <CreateGoalsForm />
      </div>
    </div>
  );
}
