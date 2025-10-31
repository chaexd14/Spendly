'use client';

import { useEffect, useState } from 'react';
import { signIn } from '../../../../lib/actions/auth-actions';
import { authClient } from '../../../../lib/auth-client';
import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { Eye, EyeOff } from 'lucide-react';

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
import PrivacyPolicy from '@/components/privacyPolicy';
import TermsServices from '@/components/termsServices';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';

export function LoginForm({ className, ...props }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const formSchema = z.object({
    email: z.string().email('Please enter a valid email address.'),
    password: z.string().min(1, 'Password is empty.'),
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

      router.push('/dashboard');
      toast.success('Signin Succesfully');
    } catch (err) {
      toast.error(err.message);
      setError(err.message || 'Signin failed. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);
    setError('');

    try {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/dashboard',
      });
    } catch (error) {
      toast.error(error.message);
      setError(error.message || 'Signin failed. Please try again later.');
    } finally {
      toast.success('Signin Succesfully');
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
                <Button
                  variant="outline"
                  type="button"
                  onClick={signInWithGoogle}
                >
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
                  <Field>
                    <FieldLabel
                      htmlFor={field.name}
                      className={cn(fieldState.invalid && 'text-destructive')}
                    >
                      Email
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="email"
                      placeholder="m@example.com"
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
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <>
                    <Field>
                      <div className="flex items-center">
                        <FieldLabel
                          htmlFor="password"
                          className={cn(
                            fieldState.invalid && 'text-destructive'
                          )}
                        >
                          Password
                        </FieldLabel>
                      </div>

                      <div className="flex items-center w-full max-w-sm gap-2">
                        <div className="w-full">
                          <Input
                            {...field}
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="********"
                            className={cn(
                              fieldState.invalid &&
                                'border-destructive focus-visible:ring-destructive'
                            )}
                          />
                        </div>

                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="size-3" />
                          ) : (
                            <Eye className="size-3" />
                          )}
                        </Button>
                      </div>

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
        By clicking continue, you agree to our <TermsServices /> and{' '}
        <PrivacyPolicy />
      </FieldDescription>
    </div>
  );
}
