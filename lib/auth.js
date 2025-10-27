import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import prisma from './prisma';
import { nextCookies } from 'better-auth/next-js';
import { sendEmail } from './emailer';
import { emailOTP } from 'better-auth/plugins';

import EmailVerification from '@/app/components/emails/email-verification';
import PasswordResetOTP from '@/app/components/emails/password-reset-otp';

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: 'mongodb' }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationParams: {
        prompt: 'select_account',
      },
    },
  },

  emailVerification: {
    sendOnSignUp: true,
    sendOnSignIn: true,
    autoSignInAfterVerification: true,

    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: 'Verify your email address',
        react: <EmailVerification user={user.name ?? user.email} url={url} />,
      });
    },
  },

  plugins: [
    nextCookies(),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (type === 'sign-in') {
          // Send the OTP for sign in
          await sendEmail({
            to: email,
            subject: 'Sign In OTP',
            // your email template with otp
          });
        } else if (type === 'email-verification') {
          // Send the OTP for email verification
          await sendEmail({
            to: email,
            subject: 'Email Verification OTP',
            // your email template with otp
          });
        } else {
          // Send the OTP for password reset
          await sendEmail({
            to: email,
            subject: 'Password Reset OTP',
            react: (
              <PasswordResetOTP user={user.name ?? user.email} otp={otp} />
            ),
          });
        }
      },
      otpLength: 8,
      expiresIn: 600,
      allowedAttempts: 5,
    }),
  ],
});
