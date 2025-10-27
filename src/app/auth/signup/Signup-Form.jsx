'use client';

import { useState } from 'react';
import { signUp } from '../../../../lib/actions/auth-actions';
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

export function SignUpForm({ className, ...props }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const formSchema = z
    .object({
      name: z.string().min(3, 'Please enter at least 3 characters.'),
      email: z.string().email('Please enter a valid email address.'),
      password: z.string().min(8, 'Password too short'),
      confirmPassword: z.string().min(8, 'Password too short'),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      message: 'Passwords do not match',
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleEmailAuth = async (data) => {
    setIsLoading(true);
    setError('');

    try {
      const result = await signUp(data.email, data.password, data.name);
      if (!result.success) throw new Error(result.message);

      router.push('/home');
      toast.success('SignUp Successfully');
    } catch (err) {
      toast.error(err.message);
      setError(err.message || 'Signup failed. Please try again later.');
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
        callbackURL: '/home',
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
        <CardHeader className="space-y-3 text-center">
          <CardTitle className="text-3xl">Create your account</CardTitle>
          <CardDescription className="text-sm">
            Fill in the form below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(handleEmailAuth)}>
            <FieldGroup>
              {error && (
                <Label className="text-sm text-center text-red-500">
                  {error}
                </Label>
              )}

              <div className="grid grid-cols-2 gap-4">
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        type="text"
                        placeholder="Sabrina Carpenter"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

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
              </div>

              <Field>
                <div className="grid grid-cols-2 gap-4">
                  <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          type={showPassword ? 'text' : 'password'}
                          placeholder="********"
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="confirmPassword"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                          Confirm Password
                        </FieldLabel>
                        <div className="flex items-center w-full max-w-sm gap-2">
                          <Input
                            {...field}
                            id={field.name}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="********"
                            aria-invalid={fieldState.invalid}
                          />

                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowPassword(!showPassword)}
                            className="p-2"
                          >
                            {showPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </Button>
                        </div>

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>

              <Field>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Spinner className="w-4 h-4 mr-2 animate-spin" />
                      Signing up...
                    </>
                  ) : (
                    'Sign Up'
                  )}
                </Button>
              </Field>

              <Field className="space-y-3">
                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                  Or continue with
                </FieldSeparator>

                <Field>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={signInWithGoogle}
                  >
                    Login with Google
                  </Button>
                </Field>
              </Field>

              <Field>
                <FieldDescription className="text-center">
                  Already have an account? <a href="/auth/signin">Sign In</a>
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
