
export const otpTemplate = (name: string, otp: string) => `
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Your OTP Code</title>
    </head>
    <body style="font-family: Arial, sans-serif; color: #333;">
        <h2>Hello ${name},</h2>
        <p>Thank you for registering at <b>Travel Booking System</b>.</p>
        <p>Your OTP code is:</p>

        <div style="font-size: 24px; font-weight: bold; color: #007bff;">
        ${otp}
        </div>

        <p>This OTP is valid for 5 minutes.</p>
        <p>If you did not register at <b>Travel Booking System</b>, please ignore this email.</p>

        <hr />
        <footer>
        <p>© 2025 Travel Booking System. All rights reserved.</p>
        </footer>
    </body>
    </html>
`
