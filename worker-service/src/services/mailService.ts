import { otpTemplate } from "../templates/otpTemplate.js";
import { emailConfig } from "../config/emailConfig.js";
import logger from "../config/logger.js";
  
export  const mailService = 
    async (type: 'otp', to: string, subject: string, payload: Record<string, any>)  => {
        const { name, otp } = payload;
        const email = to;
    try{
        const html = otpTemplate(name, otp);

        const info =await emailConfig.sendMail({
            from: "Travel Booking System <noreply@travelbookingsystem.com>",
            to: email,
            subject: "OTP for Travel Booking System",
            html,
        });

        console.log(`📧 Email sent to ${info.messageId}`);
        logger.info(`📧 Email sent to ${email} and Id is ${info.messageId}`);
    } catch (err) {
        console.error("❌ Email error:", err);
        logger.error("❌ Email error:", err);
    }
};
