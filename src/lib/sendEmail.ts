import emailjs from 'emailjs-com';

export const sendEmail = async (formData: any) => {
  // Customize service ID, template ID, user ID
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const userId = process.env.NEXT_PUBLIC_EMAILJS_USER_ID;
  const gmEmail = process.env.NEXT_PUBLIC_GM_EMAIL;

  if (!serviceId || !templateId || !userId || !gmEmail) {
    throw new Error('Missing required environment variables for email service');
  }

  const templateParams = {
    ...formData,
    gmEmail,
  };

  try {
    const response = await emailjs.send(serviceId, templateId, templateParams, userId);
    return response;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to send email');
  }
};
