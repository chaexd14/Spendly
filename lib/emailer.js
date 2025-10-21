import nodemailer from 'nodemailer';
import { render } from '@react-email/components';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail({ to, subject, react }) {
  const html = await render(react);

  const info = await transporter.sendMail({
    from:
      process.env.EMAIL_FROM ||
      `"No Reply" <noreply@${process.env.EMAIL_DOMAIN}>`,
    to,
    subject,
    html,
    text: html.replace(/<\/?[^>]+(>|$)/g, ''),
  });

  console.log('Verification email sent:', info.messageId);
  return info;
}
