'use server';
import { SubmissionPost } from "@/app/models/Submission";

export const submitForm = async (formData: SubmissionPost) => {
    try {
        const url = process.env.FUNC_APP_URL + '/submitForm';
        console.log(`Submitting form to ${url} - ${JSON.stringify(formData)}`);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (response.ok) {
            console.log('Form submitted successfully');
        } else {
            console.error('Form submission failed');
            console.error(await response.json())
        }
    } catch (error) {
        console.error('Error submitting form:', error);
    }
};