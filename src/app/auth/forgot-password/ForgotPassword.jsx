'use client';

import { useState } from 'react';
import {
  sendResetOtp,
  checkResetOtp,
  resetPassword,
} from '../../../../lib/actions/auth-actions';
import { useRouter } from 'next/navigation';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { Eye, EyeOff } from 'lucide-react';
import { Label } from '@/components/ui/label';

export default function ForgotPassword() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Step-based schemas
  const emailSchema = z.object({
    email: z.string().email('Please enter a valid email address.'),
  });

  const otpSchema = z.object({
    otp: z.string().min(6, 'OTP must be at least 6 digits.'),
  });

  const passwordSchema = z
    .object({
      password: z.string().min(8, 'Password too short'),
      confirmPassword: z.string().min(8, 'Password too short'),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      message: 'Passwords do not match',
    });

  const form = useForm({
    resolver: zodResolver(
      step === 1 ? emailSchema : step === 2 ? otpSchema : passwordSchema
    ),
    defaultValues: {
      email: '',
      otp: '',
      password: '',
      confirmPassword: '',
    },
  });

  // Step 1: Send OTP
  const handleSendOtp = async (data) => {
    setLoading(true);
    setError('');

    try {
      const res = await sendResetOtp(data.email);
      if (res.success) {
        setEmail(data.email);
        setStep(2);
        toast.success('OTP has been sent to your email.');
      } else {
        setError(res.message || 'Failed to send OTP. Try again.');
        toast.error(res.message || 'Failed to send OTP. Try again.');
      }
    } catch (err) {
      setError(err.message || 'Signin failed. Please try again later.');
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (data) => {
    setLoading(true);
    setError('');

    try {
      const res = await checkResetOtp(email, data.otp);
      if (res.success) {
        setOtp(data.otp);
        setStep(3);
        toast.success('OTP verified!');
      } else {
        setError(res.message || 'Invalid OTP. Try again.');
        toast.error(res.message || 'Invalid OTP. Try again.');
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await resetPassword(email, otp, data.password);
      if (res.success) {
        toast.success('Your password has been reset successfully');
        router.push('/home');
        setStep(1);
        setEmail('');
        setOtp('');
      } else {
        toast.error(res.message || 'Password reset failed. Try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="space-y-5 text-center">
        <CardTitle className="text-3xl">Forgot Password</CardTitle>
        {step === 1 && (
          <CardDescription className="text-sm">
            Please type in your Email
          </CardDescription>
        )}

        {step === 2 && (
          <CardDescription className="text-sm">
            Enter the OTP provided to your Email
          </CardDescription>
        )}

        {step === 3 && (
          <CardDescription className="text-sm">
            Type in your new Password
          </CardDescription>
        )}
      </CardHeader>

      <CardContent>
        <FieldGroup>
          {error && (
            <Field>
              <Label className="text-sm text-center text-red-500">
                {error}
              </Label>
            </Field>
          )}

          {step === 1 && (
            <form onSubmit={form.handleSubmit(handleSendOtp)}>
              <FieldGroup>
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

                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Spinner className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send OTP'
                  )}
                </Button>

                <Button
                  type="submit"
                  variant="outline"
                  onClick={() => setStep(2)}
                >
                  Next
                </Button>
              </FieldGroup>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={form.handleSubmit(handleVerifyOtp)}>
              <FieldGroup>
                <Controller
                  name="otp"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Enter OTP</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        type="text"
                        placeholder="Enter OTP"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Field>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <Spinner className="w-4 h-4 mr-2 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      'Verify OTP'
                    )}
                  </Button>
                </Field>

                <Field>
                  <div className="flex justify-between gap-5">
                    <Button
                      type="submit"
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="w-full"
                    >
                      Back
                    </Button>

                    <Button
                      type="submit"
                      variant="outline"
                      onClick={() => setStep(3)}
                      className="w-full"
                    >
                      Next
                    </Button>
                  </div>
                </Field>
              </FieldGroup>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={form.handleSubmit(handleResetPassword)}>
              <FieldGroup>
                <Field>
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
                  <FieldDescription>
                    Must be at least 8 characters long.
                  </FieldDescription>
                </Field>

                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Spinner className="w-4 h-4 mr-2 animate-spin" />
                      Resetting...
                    </>
                  ) : (
                    'Reset Password'
                  )}
                </Button>

                <Button
                  type="submit"
                  variant="outline"
                  onClick={() => setStep(2)}
                >
                  Back
                </Button>
              </FieldGroup>
            </form>
          )}
        </FieldGroup>
      </CardContent>

      <CardFooter>
        <Field>
          <FieldDescription className="text-center">
            Back to <a href="/auth/signin">Sign In</a>
          </FieldDescription>
        </Field>
      </CardFooter>
    </Card>
  );
}
