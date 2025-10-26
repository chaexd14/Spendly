'use client';

import { useState } from 'react';
import { signIn } from '../../../../lib/actions/auth-actions';
import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';

import {
  Card,
  CardContent,
  CardDescription,
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

import { Input } from '@/components/ui/input';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';

export function LoginForm({ className, ...props }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const formSchema = z.object({
    email: z.string().email('Please enter a valid email address.'),
    password: z.string(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleEmailAuth = async (data) => {
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn(data.email, data.password);
      if (!result.success) throw new Error(result.message);

      router.push('/home');
      toast.success('Signin Succesfully');
    } catch (err) {
      toast.error(err.message);
      setError(err.message || 'Signin failed. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="space-y-5 text-center">
          <CardTitle className="text-3xl">Welcome back</CardTitle>
          <CardDescription className="text-sm">
            Login with your Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(handleEmailAuth)}>
            <FieldGroup>
              <Field>
                <Button variant="outline" type="button">
                  Login with Google
                </Button>
              </Field>

              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>

              {error && (
                <Label className="text-sm text-center text-red-500">
                  {error}
                </Label>
              )}

              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="email"
                      placeholder="m@example.com"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <>
                    <Field data-invalid={fieldState.invalid}>
                      <div className="flex items-center">
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                      </div>

                      <Input
                        {...field}
                        id="password"
                        type="password"
                        placeholder="********"
                        aria-invalid={fieldState.invalid}
                      />

                      <Field>
                        <div className="flex items-center justify-center">
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}

                          <a
                            href="/auth/forgot-password"
                            className="ml-auto text-sm text-black underline-offset-4 hover:underline"
                          >
                            Forgot your password?
                          </a>
                        </div>
                      </Field>
                    </Field>
                  </>
                )}
              />

              <Field>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Spinner className="w-4 h-4 mr-2 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Login'
                  )}
                </Button>

                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="/auth/signup">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a>Terms of Service</a> and{' '}
        <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
