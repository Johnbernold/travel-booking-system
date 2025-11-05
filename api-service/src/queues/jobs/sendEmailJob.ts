import emailQueue  from "../emailQueue.js";

interface emailJobData {
    type: "otp";
    to: string;
    subject: string;
    payload: Record<string, any>;
}

const sendEmailJobQueue = async (job: emailJobData) => {
    await emailQueue.add("otpEmailJob", job, {
        attempts: 3,
        backoff: {
            type: "exponential",
            delay: 1000,
        },
        removeOnComplete: true,
    });
    console.log(`🚀 Job added to queue: ${job.type}`);
};

export default sendEmailJobQueue;
