// Step 4.3(a)-1
// Purpose: Create HTML template for password reset email
// Logic: Provide a secure reset link with a limited validity period

export function createPasswordResetEmailTemplate(name, resetURL) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
  </head>

  <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">

    <div style="background: linear-gradient(to right, #36D1DC, #5B86E5); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
      <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 500;">
        Password Reset
      </h1>
    </div>

    <div style="background-color: #ffffff; padding: 35px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">

      <p style="font-size: 18px; color: #5B86E5;">
        <strong>Hello ${name},</strong>
      </p>

      <p>
        We received a request to reset the password for your Chat App account.
      </p>

      <p>
        Click the button below to create a new password:
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <a
          href="${resetURL}"
          style="background: linear-gradient(to right, #36D1DC, #5B86E5); color: white; text-decoration: none; padding: 12px 30px; border-radius: 50px; font-weight: 500; display: inline-block;"
        >
          Reset Password
        </a>
      </div>

      <p>
        This password reset link will expire in <strong>15 minutes</strong>.
      </p>

      <p>
        If you did not request a password reset, you can safely ignore this email.
      </p>

      <p style="margin-top: 25px;">
        Best regards,<br>
        The Chat App Team
      </p>

    </div>

    <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
      <p>© 2026 Chat App. All rights reserved.</p>
    </div>

  </body>
  </html>
  `;
}
