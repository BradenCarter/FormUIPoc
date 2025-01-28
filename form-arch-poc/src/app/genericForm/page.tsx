'use client';
import { SubmissionPost } from '@/app/models/Submission';
import React, { useState } from 'react';
import { submitForm } from '../actions/submitForm';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        text: {
            primary: '#ffffff',
        },
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ffffff',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ffffff',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ffffff',
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: '#F2F3F4',
                },
            },
        },
    },
});

const SubmitForm = () => {
    const [userSubId, setUserSubId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const formData: SubmissionPost = { formId: 'generic', userId: userSubId, firstName, lastName, email };
            submitForm(formData);
            alert.call('Form submitted successfully');
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Box mt={4}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Submit Form
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <TextField
                                label="User Sub ID"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={userSubId}
                                onChange={(e) => setUserSubId(e.target.value)}
                            />
                        </div>
                        <div>
                            <TextField
                                label="First Name"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div>
                            <TextField
                                label="Last Name"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div>
                            <TextField
                                label="Email"
                                type="email"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary" 
                            size="large" 
                            style={{ height: '3rem', marginTop: '16px' }}
                        >
                            Submit
                        </Button>
                    </form>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default SubmitForm;