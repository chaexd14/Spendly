'use server';

import { auth } from '../auth';
import { headers } from 'next/headers';

// SIGN UP
export const signUp = async (email, password, name) => {
  try {
    const result = await auth.api.signUpEmail({
      body: { email, password, name },
    });
    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      message: error.body?.message || error.message || 'Signup failed',
      status: error.statusCode || 500,
    };
  }
};

// SIGN IN
export const signIn = async (email, password) => {
  try {
    const result = await auth.api.signInEmail({
      body: { email, password },
    });
    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      message: error.body?.message || error.message || 'Invalid credentials',
      status: error.statusCode || 401,
    };
  }
};

// SIGN OUT
export const signOut = async () => {
  try {
    const result = await auth.api.signOut({
      headers: await headers(),
    });
    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Error signing out',
    };
  }
};

// FORGOT PASSWORD — Send OTP
export const sendResetOtp = async (email) => {
  try {
    const result = await auth.api.sendVerificationOTP({
      body: { email, type: 'forget-password' },
    });
    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      message: error.body?.message || error.message || 'Failed to send OTP',
    };
  }
};

// Check OTP
export const checkResetOtp = async (email, otp) => {
  try {
    const result = await auth.api.checkVerificationOTP({
      body: { email, type: 'forget-password', otp },
    });
    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      message: error.body?.message || error.message || 'Invalid OTP',
    };
  }
};

// Reset password with OTP
export const resetPassword = async (email, otp, newPassword) => {
  try {
    const result = await auth.api.resetPasswordEmailOTP({
      body: { email, otp, password: newPassword },
    });
    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      message: error.body?.message || error.message || 'Password reset failed',
    };
  }
};
