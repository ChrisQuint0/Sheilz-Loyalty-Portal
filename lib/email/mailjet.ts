// lib/email/mailjet.ts
import mailjet from 'node-mailjet';

const MJ_API_KEY = process.env.MAILJET_API_KEY!;
const MJ_SECRET_KEY = process.env.MAILJET_SECRET_KEY!;
const MJ_FROM_EMAIL = process.env.MAILJET_FROM_EMAIL!;

const client = mailjet.apiConnect(MJ_API_KEY, MJ_SECRET_KEY);

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

// Bound the Mailjet call so a slow / hanging upstream can never block a
// Server Action for tens of seconds (which manifests to the user as a 504).
// 8s is well above Mailjet's normal p99 but short enough to fail fast.
const MAILJET_TIMEOUT_MS = 8_000;

export async function sendEmail({ to, subject, html, text }: SendEmailParams) {
  try {
    const requestPromise = client
      .post('send', { version: 'v3.1' })
      .request({
        Messages: [
          {
            From: {
              Email: MJ_FROM_EMAIL,
              Name: 'Your App Name',
            },
            To: [
              {
                Email: to,
              },
            ],
            Subject: subject,
            HTMLPart: html,
            TextPart: text || html.replace(/<[^>]+>/g, ''),
          },
        ],
      });

    const result = await Promise.race([
      requestPromise,
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error(`Mailjet request timed out after ${MAILJET_TIMEOUT_MS}ms`)),
          MAILJET_TIMEOUT_MS,
        ),
      ),
    ]);

    return { success: true as const, data: result.body };
  } catch (error) {
    console.error('Mailjet send error:', error);
    return { success: false as const, error };
  }
}

export function generateVerificationEmail(verificationLink: string) {
  return {
    subject: 'Verify your email address',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .button { 
              display: inline-block; 
              padding: 12px 24px; 
              background-color: #4F46E5; 
              color: white; 
              text-decoration: none; 
              border-radius: 5px;
              margin: 20px 0;
            }
            .footer { margin-top: 30px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Verify Your Email</h1>
            <p>Thank you for signing up! Please click the button below to verify your email address:</p>
            <a href="${verificationLink}" class="button">Verify Email</a>
            <p>Or copy and paste this link into your browser:</p>
            <p><a href="${verificationLink}">${verificationLink}</a></p>
            <p>This link will expire in 24 hours.</p>
            <div class="footer">
              <p>If you didn't create an account with us, you can safely ignore this email.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      Verify Your Email
      
      Thank you for signing up! Please click the link below to verify your email address:
      
      ${verificationLink}
      
      This link will expire in 24 hours.
      
      If you didn't create an account with us, you can safely ignore this email.
    `,
  };
}

export function generatePasswordResetEmail(resetLink: string) {
  return {
    subject: 'Reset your password',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .button { 
              display: inline-block; 
              padding: 12px 24px; 
              background-color: #EF4444; 
              color: white; 
              text-decoration: none; 
              border-radius: 5px;
              margin: 20px 0;
            }
            .footer { margin-top: 30px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Reset Your Password</h1>
            <p>We received a request to reset your password. Click the button below to set a new password:</p>
            <a href="${resetLink}" class="button">Reset Password</a>
            <p>Or copy and paste this link into your browser:</p>
            <p><a href="${resetLink}">${resetLink}</a></p>
            <p>This link will expire in 1 hour.</p>
            <div class="footer">
              <p>If you didn't request a password reset, you can safely ignore this email.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      Reset Your Password
      
      We received a request to reset your password. Click the link below to set a new password:
      
      ${resetLink}
      
      This link will expire in 1 hour.
      
      If you didn't request a password reset, you can safely ignore this email.
    `,
  };
}