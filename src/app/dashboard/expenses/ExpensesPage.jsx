import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function ExpensesPage() {
  return (
    <div>
      <Card>
        <CardHeader>
          <div>
            <CardTitle className="text-2xl">Expenses</CardTitle>
            <CardDescription>
              Add new expenses and see a clear visual breakdown of your spending
              across budgets.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
