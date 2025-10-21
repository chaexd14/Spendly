'use client';

import { useState } from 'react';
import { sendResetOtp } from '../../../../lib/actions/auth-actions';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await sendResetOtp(email);

      if (res.success) {
        setMessage('OTP has been sent to your email address.');
      } else {
        setMessage(res.error || 'Failed to send OTP. Try again.');
      }
    } catch (err) {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="mb-4 text-2xl font-semibold">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
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

          {message && (
            <p className="mt-2 text-sm text-center text-gray-700">{message}</p>
          )}
        </form>
      </div>
    </>
  );
}
