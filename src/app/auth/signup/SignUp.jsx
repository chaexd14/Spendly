'use client';

import { useState } from 'react';
import { signUp } from '../../../../lib/actions/auth-actions';
import { useRouter } from 'next/navigation';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signUp(email, password, name);
      if (!result.success) {
        throw new Error(result.message);
      }

      router.push('/home');
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleEmailAuth}
        className="flex flex-col items-center justify-center gap-5 p-5 border border-red-400 h-fit w-fit"
      >
        <h1 className="text-3xl font-bold">SignUp</h1>
        {error && <p>{error}</p>}

        <div className="flex flex-col gap-2 p-3 border border-red-400">
          <label className="text-lg font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-5 py-1 text-lg border border-red-400 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2 p-3 border border-red-400">
          <label className="text-lg font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-5 py-1 text-lg border border-red-400 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2 p-3 border border-red-400">
          <label className="text-lg font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-5 py-1 text-lg border border-red-400 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="px-5 py-3 text-xl font-semibold border border-red-400"
        >
          {isLoading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>
    </>
  );
}

export default SignUp;
