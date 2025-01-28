export type Submission = {
    submissionId: string;
    submissionDate: string;
    userSubId: string;
    firstName: string;
    lastName: string;
    email: string;
}

export type SubmissionPost = {
    formId: string;
    userId: string;
    [key: string]: unknown; // Allows for any number of other variables with data
}
