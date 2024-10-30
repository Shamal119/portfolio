import React from 'react';
import { Box, Container, Button, ThemeProvider, createTheme } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb',
      light: '#3b82f6',
      dark: '#1d4ed8',
    },
  },
});

const ResumePage = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#f8fafc',
          pt: 3,
          pb: 6,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ mb: 3 }}>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate('/')}
              sx={{ mb: 2 }}
            >
              Back to Home
            </Button>
          </Box>
          
          <Box
            sx={{
              height: 'calc(100vh - 150px)',
              backgroundColor: 'white',
              borderRadius: 2,
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              overflow: 'hidden',
            }}
          >
            <iframe
              src="/Shamal_Musthafa_Resume.pdf"
              width="100%"
              height="100%"
              style={{ border: 'none' }}
              title="Resume"
            />
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default ResumePage;