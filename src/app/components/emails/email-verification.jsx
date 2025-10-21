// app/components/emails/email-verification.jsx
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

const EmailVerification = ({ user, url }) => (
  <Html lang="en" dir="ltr">
    <Tailwind>
      <Head />
      <Body className="bg-gray-100 font-sans py-[40px]">
        <Container className="bg-white rounded-[8px] p-[32px] max-w-[600px] mx-auto">
          <Section>
            <Text className="text-[32px] font-bold text-gray-900 mb-[24px] text-center">
              Welcome to Our Platform!
            </Text>
            <Text className="text-[18px] text-gray-700 mb-[24px]">
              Hi {user},
            </Text>
            <Text className="text-[16px] text-gray-600 mb-[32px] leading-[24px]">
              Thank you for joining us! We're excited to have you on board. To
              get started and secure your account, please verify your email
              address by clicking the button below.
            </Text>
            <Section className="text-center mb-[32px]">
              <Button
                href={url}
                className="bg-blue-600 text-white px-[32px] py-[16px] rounded-[8px] text-[16px] font-semibold no-underline box-border"
              >
                Verify Email Address
              </Button>
            </Section>
            <Text className="text-[14px] text-gray-500 mb-[24px] leading-[20px]">
              If the button above doesn't work, you can also copy and paste the
              following link into your browser:
            </Text>
            <Text className="text-[14px] text-blue-600 mb-[32px] break-all">
              <Link href={url} className="text-blue-600 underline">
                {url}
              </Link>
            </Text>
            <Text className="text-[16px] text-gray-700 mb-[8px]">
              Thank you for choosing us!
            </Text>
            <Text className="text-[14px] text-gray-500">
              Best regards, <br /> The Team
            </Text>
          </Section>

          <Section className="border-t border-gray-200 pt-[24px] mt-[40px]">
            <Text className="text-[12px] text-gray-400 text-center m-0">
              © 2024 Your Company Name. All rights reserved.
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

export default EmailVerification;
