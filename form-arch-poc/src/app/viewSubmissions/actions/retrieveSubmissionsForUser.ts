'use server';
import { Submission } from '../../models/Submission';

const retrieveSubmissionsForUser = async (userId: string): Promise<Submission[]> => {
    const url = `${process.env.FUNC_APP_URL}/getFormsForUser?userId=${userId}`;
    const response = await fetch(url);
    if (!response.ok) {
        console.error('Failed to fetch submissions:', await response.json());
        throw new Error('Failed to fetch submissions');
    }
    return await response.json();
};

export default retrieveSubmissionsForUser;