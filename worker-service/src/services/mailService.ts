import { otpTemplate } from "../templates/otpTemplate.js";
import { emailConfig } from "../config/emailConfig.js";
  
export  const mailService = 
    async (type: 'otp', to: string, subject: string, payload: Record<string, any>)  => {
        const { name, otp } = payload;
        const email = to;
    try{
        const html = otpTemplate(name, otp);

        console.log(`📧 html: ${html}`);

        const info =await emailConfig.sendMail({
            from: "Travel Booking System <noreply@travelbookingsystem.com>",
            to: email,
            subject: "OTP for Travel Booking System",
            html,
        });

        console.log(`📧 Email sent to ${info.messageId}`);
    } catch (err) {
        console.error("❌ Email error:", err);
    }
};
