'use client';

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

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

import CreateGoalsForm from './form/CreateGoalsForm';
import { useState } from 'react';

import AddContributionForm from './form/AddContributionForm';

import { useIsMobile } from '@/hooks/use-mobile';

// Chart
import { ChartRadialStacked } from '@/app/components/charts/chart-radial-stacked';

export default function GoalPage({ userGoal }) {
  const [goal, setGoal] = useState(userGoal);
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
    <div className="grid gap-5">
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

      <div className="grid grid-cols-2 grid-rows-1 gap-5">
        <CreateGoalsForm />

        <div>
          {data.map((d) => (
            <div key={d.goalId} className="h-full">
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
                  <ChartRadialStacked userGoal={data} />
                </CardContent>

                <Separator />

                <CardFooter className="py-5">
                  <div className="flex w-full gap-5">
                    <Button className="w-full" variant="outline">
                      Refresh
                    </Button>
                    <Button className="w-full" variant="outline">
                      View All
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
