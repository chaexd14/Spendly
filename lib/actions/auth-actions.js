'use server';

import { auth } from '../auth';
import { headers } from 'next/headers';

// SIGN UP
export const signUp = async (email, password, name) => {
  const result = await auth.api.signUpEmail({
    body: {
      email,
      password,
      name,
    },
  });

  return result;
};

// SIGN IN
export const signIn = async (email, password) => {
  const result = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });

  return result;
};

// SIGN OUT
export const signOut = async () => {
  const result = await auth.api.signOut({
    headers: await headers(),
  });

  return result;
};

// FORGOT PASSWORD — Send OTP
export const sendResetOtp = async (email) => {
  try {
    const result = await auth.api.sendVerificationOTP({
      body: {
        email,
        type: 'forget-password',
      },
    });
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Check OTP (optional)
export const checkResetOtp = async (email, otp) => {
  return await auth.api.checkVerificationOTP({
    body: {
      email,
      type: 'forget-password',
      otp,
    },
  });
};

// Reset password with OTP
export const resetPassword = async (email, otp, newPassword) => {
  return await auth.api.resetPasswordEmailOTP({
    body: {
      email,
      otp,
      password: newPassword,
    },
  });
};
