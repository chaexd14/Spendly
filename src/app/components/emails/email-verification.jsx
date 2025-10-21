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
  <Html lang="en">
    <Tailwind>
      <Head />
      <Body className="py-10 font-sans bg-gray-100">
        <Container className="bg-white rounded-lg p-8 max-w-[600px] mx-auto shadow-sm">
          <Section>
            <Text className="mb-6 text-3xl font-bold text-center text-gray-900">
              Welcome to Our Platform!
            </Text>

            <Text className="mb-4 text-lg text-gray-700">Hi {user},</Text>

            <Text className="mb-8 text-base leading-6 text-gray-600">
              Thank you for joining us! Please verify your email address by
              clicking the button below to secure your account.
            </Text>

            <Section className="mb-8 text-center">
              <Button
                href={url}
                className="px-8 py-4 text-base font-semibold text-white no-underline bg-blue-600 rounded-lg"
              >
                Verify Email Address
              </Button>
            </Section>

            <Text className="mb-3 text-sm leading-5 text-gray-500">
              If the button above doesn’t work, copy and paste this link into
              your browser:
            </Text>
            <Text className="mb-8 text-sm text-blue-600 break-all">
              <Link href={url} className="text-blue-600 underline">
                {url}
              </Link>
            </Text>

            <Text className="mb-2 text-base text-gray-700">
              Thank you for choosing us!
            </Text>
            <Text className="text-sm text-gray-500">
              Best regards, <br /> The Team
            </Text>

            <Text className="text-[11px] text-gray-400 text-center mt-8">
              © 2024 Your Company Name • 123 Business Street, City, State 12345
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

export default EmailVerification;
