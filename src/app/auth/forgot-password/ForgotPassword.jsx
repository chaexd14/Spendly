'use client';

import { useState } from 'react';
import {
  sendResetOtp,
  checkResetOtp,
  resetPassword,
} from '../../../../lib/actions/auth-actions';

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // 1=email, 2=otp, 3=new password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Step 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await sendResetOtp(email);
      if (res.success) {
        setStep(2);
        setMessage('OTP has been sent to your email.');
      } else {
        setMessage(res.message || 'Failed to send OTP. Try again.');
      }
    } catch {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await checkResetOtp(email, otp);
      if (res.success) {
        setStep(3);
        setMessage('OTP verified! You can now set a new password.');
      } else {
        setMessage(res.message || 'Invalid OTP. Try again.');
      }
    } catch {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await resetPassword(email, otp, newPassword);
      if (res.success) {
        setMessage(
          'Your password has been reset successfully! You can now log in.'
        );
        setStep(1);
        setEmail('');
        setOtp('');
        setNewPassword('');
      } else {
        setMessage(res.message || 'Password reset failed. Try again.');
      }
    } catch {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="mb-4 text-2xl font-semibold">Forgot Password</h2>

      {step === 1 && (
        <form onSubmit={handleSendOtp} className="w-full max-w-sm space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 text-white bg-blue-600 rounded-md"
          >
            {loading ? 'Sending...' : 'Send OTP'}
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyOtp} className="w-full max-w-sm space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 text-white bg-blue-600 rounded-md"
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
          <button
            type="button"
            onClick={() => setStep(1)}
            className="w-full py-2 text-gray-600 border rounded-md"
          >
            Back
          </button>
        </form>
      )}

      {step === 3 && (
        <form
          onSubmit={handleResetPassword}
          className="w-full max-w-sm space-y-4"
        >
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 text-white bg-green-600 rounded-md"
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
          <button
            type="button"
            onClick={() => setStep(2)}
            className="w-full py-2 text-gray-600 border rounded-md"
          >
            Back
          </button>
        </form>
      )}

      {message && (
        <p className="mt-3 text-sm text-center text-gray-700">{message}</p>
      )}
    </div>
  );
}
