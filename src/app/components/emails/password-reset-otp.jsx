import React from 'react';
import {
  Html,
  Head,
  Body,
  Tailwind,
  Container,
  Section,
  Text,
  Link,
} from '@react-email/components';

const PasswordResetOTP = ({ user, otp }) => (
  <Html lang="en">
    <Tailwind>
      <Head />
      <Body className="py-10 font-sans bg-gray-100">
        <Container className="bg-white rounded-lg p-8 max-w-[600px] mx-auto shadow-sm">
          <Section>
            <Text className="mb-6 text-3xl font-bold text-center text-gray-900">
              Your OTP Code
            </Text>

            <Text className="mb-4 text-lg text-gray-700">Hi {user},</Text>

            <Text className="mb-8 text-base leading-6 text-gray-600">
              Use the following OTP to complete your verification. This code is
              valid for a limited time.
            </Text>

            <Section className="mb-8 text-center">
              <Text className="text-5xl font-extrabold tracking-wider text-blue-600">
                {otp}
              </Text>
            </Section>

            <Text className="mb-6 text-sm leading-5 text-gray-500">
              If you didn’t request this OTP, you can safely ignore this email.
            </Text>

            <Text className="mb-2 text-base text-gray-700">Thank you!</Text>
            <Text className="text-sm text-gray-500">
              Best regards, <br /> The Team
            </Text>

            <Text className="text-[11px] text-gray-400 text-center mt-8">
              © 2025 Your Company Name • 123 Business Street, City, State 12345
            </Text>
            <Text className="text-[11px] text-gray-400 text-center">
              <Link href="#" className="text-gray-400 underline">
                Unsubscribe
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default PasswordResetOTP;
