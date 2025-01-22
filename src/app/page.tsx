'use client';
import { Box, Button, Container, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Home() {

  const router = useRouter();

  return (
    <Container suppressHydrationWarning>
      <Box mt={2}>
        <Typography variant="h1" gutterBottom>
          Welcome to the Form Submission Portal
        </Typography>
        <Typography variant="body1" gutterBottom>
          Please choose an option below:
        </Typography>
        <Button
          variant="contained"
          color="primary"
          style={{ marginRight: '10px', height: '3rem', fontSize: '1rem' }}
          onClick={() => router.push('/viewSubmissions')}
        >
          View Submitted Forms
        </Button>
        <Button
          variant="contained"
          color="secondary"
          style={{height: '3rem', fontSize: '1rem' }}
          onClick={() => router.push('/submitForm')}
        >
          Start Form Submission
        </Button>
      </Box>
    </Container>
  );
}
