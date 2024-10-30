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
  
  // Get the current origin (domain)
  const pdfUrl = '/resume.pdf';

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
          <Box 
            sx={{ 
              mb: 3,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate('/')}
              sx={{ mb: 2 }}
            >
              Back to Home
            </Button>
            <Button
              variant="contained"
              href={pdfUrl}
              download="Shamal_Musthafa_Resume.pdf"
            >
              Download PDF
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
              src={pdfUrl}
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