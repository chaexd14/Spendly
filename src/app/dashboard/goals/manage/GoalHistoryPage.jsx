'use client';

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
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { LayoutList } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChartRadialStacked } from '@/app/components/charts/chart-radial-stacked';

import { DataTable } from '../../income/table/data-table';
import { GoalsColumns } from '../table/GoalsColumns';

// Forms
import AddContributionForm from '../form/AddContributionForm';
import EditGoal from '../form/EditGoal';
import DeleteGoalForm from '../form/DeleteGoalForm';

export default function GoalHistoryPage({ userGoal }) {
  const [goal, setGoal] = useState(userGoal);
  const [isTable, setIsTable] = useState(true);
  const isMobile = useIsMobile();

  const data = goal.map((d) => ({
    goalId: d.goalId,
    goalName: d.goalName,
    goalAmount: d.goalAmount,
    goalCurrentAmount: d.goalCurrentAmount,
    goalStatus: d.goalStatus,
    goalTargetDate: new Date(d.goalTargetDate).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
  }));

  return (
    <div className="flex flex-col h-full gap-5">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between p-5">
          <div>
            <CardTitle className="text-2xl">My Goals</CardTitle>
            <CardDescription>
              Review all the goals you’ve created and track your progress over
              time.
            </CardDescription>
          </div>

          <Button variant="outline" onClick={() => setIsTable((prev) => !prev)}>
            <LayoutList />
          </Button>
        </CardHeader>
      </Card>

      {isTable && <DataTable columns={GoalsColumns} data={data} />}

      {!isTable && (
        <div className="grid grid-cols-3 gap-5">
          {data.map((d) => (
            <div key={d.goalId} className="w-full h-full">
              <Card className="flex flex-col h-full">
                <CardHeader className="flex-row items-center justify-between py-5">
                  <div>
                    <CardTitle className="text-2xl">{d.goalName}</CardTitle>
                    <CardDescription>
                      Target Completion date {d.goalTargetDate}
                    </CardDescription>
                  </div>

                  {isMobile ? (
                    <Drawer>
                      <DrawerTrigger asChild>
                        <Button>Add Funds</Button>
                      </DrawerTrigger>

                      <DrawerContent>
                        <DrawerHeader>
                          <DrawerTitle>Add Funds</DrawerTitle>
                          <DrawerDescription>
                            Add contribution to {d.goalName}
                          </DrawerDescription>
                        </DrawerHeader>

                        <AddContributionForm goalId={d.goalId} />
                      </DrawerContent>
                    </Drawer>
                  ) : (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>Add Funds</Button>
                      </DialogTrigger>

                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Funds</DialogTitle>
                          <DialogDescription>
                            Add contribution to {d.goalName}
                          </DialogDescription>
                        </DialogHeader>

                        <AddContributionForm goalId={d.goalId} />
                      </DialogContent>
                    </Dialog>
                  )}
                </CardHeader>

                <Separator />

                <CardContent className="flex flex-col justify-center flex-1">
                  <ChartRadialStacked userGoal={[d]} />
                </CardContent>

                <Separator />

                <CardFooter className="py-5">
                  <div className="flex w-full gap-5">
                    <Dialog>
                      <DialogTrigger asChild className="w-full">
                        <Button variant="outline">Edit</Button>
                      </DialogTrigger>

                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Goal</DialogTitle>
                          <DialogDescription>
                            <strong>{d.goalName}</strong>
                          </DialogDescription>
                        </DialogHeader>

                        <EditGoal
                          goalId={d.goalId}
                          goalName={d.goalName}
                          goalAmount={d.goalAmount}
                        />
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger asChild className="w-full">
                        <Button className="w-full" variant="outline">
                          Delete
                        </Button>
                      </DialogTrigger>

                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Delete Goal</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to delete your goal{' '}
                            <strong>{d.goalName}</strong>?
                          </DialogDescription>
                        </DialogHeader>

                        <DeleteGoalForm goalId={d.goalId} />
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
