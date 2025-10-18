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
