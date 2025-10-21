// app/components/emails/email-otp.jsx
import React from 'react';
import {
  Html,
  Head,
  Body,
  Tailwind,
  Container,
  Section,
  Text,
  Button,
  Link,
} from '@react-email/components';

const PasswordResetOTP = ({ user, otp }) => (
  <Html lang="en" dir="ltr">
    <Tailwind>
      <Head />
      <Body className="bg-gray-100 font-sans py-[40px]">
        <Container className="bg-white rounded-[8px] p-[32px] max-w-[600px] mx-auto">
          <Section>
            <Text className="text-[32px] font-bold text-gray-900 mb-[24px] text-center">
              Your OTP Code
            </Text>
            <Text className="text-[18px] text-gray-700 mb-[24px] text-left">
              Hi {user},
            </Text>
            <Text className="text-[16px] text-gray-600 mb-[32px] leading-[24px] text-justify">
              Use the following OTP to complete your verification. This code is
              valid for a limited time.
            </Text>

            {/* Big OTP Display */}
            <Section className="text-center mb-[32px]">
              <Text className="text-[48px] font-extrabold text-blue-600">
                {otp}
              </Text>
            </Section>

            <Text className="text-[14px] text-gray-500 mb-[24px] leading-[20px] text-justify">
              If you did not request this OTP, you can safely ignore this email.
            </Text>

            <Text className="text-[16px] text-gray-700 mb-[8px] text-left">
              Thank you!
            </Text>
            <Text className="text-[14px] text-gray-500 text-left">
              Best regards, <br /> The Team
            </Text>
          </Section>

          <Section className="border-t border-gray-200 pt-[24px] mt-[40px]">
            <Text className="text-[12px] text-gray-400 text-center m-0">
              © 2025 Your Company Name. All rights reserved.
            </Text>
            <Text className="text-[12px] text-gray-400 text-center m-0">
              123 Business Street, City, State 12345
            </Text>
            <Text className="text-[12px] text-gray-400 text-center m-0">
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
