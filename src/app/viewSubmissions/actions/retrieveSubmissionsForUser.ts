'use server';
import { Submission } from '../../models/Submission';

const retrieveSubmissionsForUser = async (subscriberId: string): Promise<Submission[]> => {
    // const response = await fetch(`/api/submissions?subscriberId=${subscriberId}`);
    // if (!response.ok) {
    //     throw new Error('Failed to fetch submissions');
    // }
    // const data: Submission[] = await response.json();
    console.log('Retrieving submissions for user:', subscriberId);
    return [
        {
            submissionId: 'a1b2c3d4-e5f6-g7h8',
            submissionDate: '2021-01-15',
            userSubId: subscriberId,
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com'
        },
        {
            submissionId: 'i9j0k1l2-m3n4-o5p6',
            submissionDate: '2021-05-20',
            userSubId: subscriberId,
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'jane.doe@example.com'
        },
        {
            submissionId: 'q7r8s9t0-u1v2-w3x4',
            submissionDate: '2021-09-30',
            userSubId: subscriberId,
            firstName: 'Alice',
            lastName: 'Smith',
            email: 'alice.smith@example.com'
        }
    ];
};

export default retrieveSubmissionsForUser;