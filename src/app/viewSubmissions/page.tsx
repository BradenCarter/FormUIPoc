'use client';   
import React, { useState } from 'react';
import { SubmissionSearch } from './components/SubmissionSearch';
import SubmissionsTable from './components/SubmissionsTable';
import retrieveSubmissionsForUser from './actions/retrieveSubmissionsForUser';
import { Submission } from '../models/Submission';
import { Box, Typography } from '@mui/material';

const ViewSubmissions = () => {
    const [submissions, setSubmissions] = useState<Submission[]>([]);

    const handleSearch = async (subscriberId: string) => {
        const data = await retrieveSubmissionsForUser(subscriberId);
        setSubmissions(data);
    };

    return (
        <>
            <Box ml={2}>
                <Box mt={2}>
                    <Typography variant="h4">Search Submissions</Typography>
                </Box>
                <Box mt={2}>
                    <SubmissionSearch handleSearch={handleSearch} />
                </Box>
                <Box mt={4}>
                    <SubmissionsTable submissions={submissions} />
                </Box>
            </Box>
        </>
    );
};

export default ViewSubmissions;