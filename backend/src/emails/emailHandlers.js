/*
src/emails/emailHandlers.js
*/

import { Resend } from "resend";
import { ENV } from "../lib/env.js";

// Step 4.3(b)-1
// Purpose: Import password reset email template
// Logic: Keep HTML email design separate from email-sending logic

import { createPasswordResetEmailTemplate } from "./emailTemplates.js";

const resend = ENV.RESEND_API_KEY ? new Resend(ENV.RESEND_API_KEY) : null;

export const sendWelcomeEmail = async (email, fullName, clientURL) => {
  if (!resend) {
    console.warn("RESEND_API_KEY not set — skipping welcome email");
    return;
  }

  const { data, error } = await resend.emails.send({
    from: ENV.RESEND_FROM_EMAIL || "onboarding@resend.dev",
    to: email,
    subject: "Welcome to Chat App!",
    html: `
      <h2>Welcome, ${fullName}!</h2>
      <p>Thanks for signing up. Start chatting at <a href="${clientURL}">${clientURL}</a>.</p>
    `,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Step 4.3(b)-2
// Purpose: Send password reset email
// Logic: Generate HTML → send through Resend → return result

export const sendPasswordResetEmail = async (email, fullName, resetURL) => {
  // Step 4.3(b)-3
  // Purpose: Skip email sending when Resend is not configured

  if (!resend) {
    console.warn("RESEND_API_KEY not set — skipping password reset email");

    return;
  }

  // Step 4.3(b)-4
  // Purpose: Generate password reset email HTML

  const html = createPasswordResetEmailTemplate(fullName, resetURL);

  // Step 4.3(b)-5
  // Purpose: Send email through Resend

  const { data, error } = await resend.emails.send({
    from: ENV.RESEND_FROM_EMAIL || "onboarding@resend.dev",
    to: email,
    subject: "Reset Your Chat App Password",
    html,
  });

  // Step 4.3(b)-6
  // Purpose: Handle Resend API errors

  if (error) {
    throw new Error(error.message);
  }

  // Step 4.3(b)-7
  // Purpose: Return Resend response

  return data;
};
