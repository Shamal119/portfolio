import React, { useState } from 'react';
import { Box, Container, Button, ThemeProvider, createTheme, Typography, Alert } from '@mui/material';
import { ArrowBack, Download, OpenInNew } from '@mui/icons-material';
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
  const [pdfError, setPdfError] = useState(false);
  
  // PDF path - works for development, GitHub Pages, and Vercel
  const getPdfUrl = () => {
    if (process.env.NODE_ENV === 'development') {
      return '/resume.pdf';
    }
    
    // Check if we're on Vercel (has vercel.app in URL) or GitHub Pages
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      if (hostname.includes('vercel.app')) {
        return '/resume.pdf'; // Vercel
      } else if (hostname.includes('github.io')) {
        return '/portfolio/resume.pdf'; // GitHub Pages
      }
    }
    
    // Default fallback
    return '/resume.pdf';
  };
  
  const pdfUrl = getPdfUrl();

  const handlePdfError = () => {
    setPdfError(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#f8fafc',
          pt: { xs: 2, md: 3 },
          pb: { xs: 4, md: 6 },
        }}
      >
        <Container maxWidth="md" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          <Box 
            sx={{ 
              mb: { xs: 2, md: 3 },
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'stretch', sm: 'center' },
              gap: { xs: 2, sm: 0 }
            }}
          >
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate('/')}
              variant="outlined"
              sx={{ 
                alignSelf: { xs: 'flex-start', sm: 'auto' },
                minWidth: { xs: 'auto', sm: '140px' }
              }}
            >
              Back to Home
            </Button>
            
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                startIcon={<Download />}
                href={pdfUrl}
                download="Shamal_Musthafa_Resume.pdf"
                sx={{ minWidth: { xs: 'auto', sm: '140px' } }}
              >
                Download PDF
              </Button>
              <Button
                variant="outlined"
                startIcon={<OpenInNew />}
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ minWidth: { xs: 'auto', sm: '140px' } }}
              >
                Open in New Tab
              </Button>
            </Box>
          </Box>
          
          {pdfError ? (
            <Box
              sx={{
                height: 'calc(100vh - 200px)',
                backgroundColor: 'white',
                borderRadius: 2,
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 4,
              }}
            >
              <Alert severity="info" sx={{ mb: 3, maxWidth: 500 }}>
                Resume PDF is available for download. Click the "Download PDF" or "Open in New Tab" buttons above to view the resume.
              </Alert>
              <Typography variant="h6" color="text.secondary" align="center">
                Shamal Musthafa - Resume
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
                Data Scientist | Generative AI & Business Intelligence
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2, maxWidth: 400 }}>
                With over two years of experience delivering end-to-end data solutions. 
                Core competencies include automating complex data workflows with Alteryx, 
                developing advanced Generative AI and LLM applications using Python, 
                and translating data into actionable insights through dynamic visualizations 
                in Tableau and Power BI.
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                height: { xs: 'calc(100vh - 200px)', md: 'calc(100vh - 150px)' },
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
                onError={handlePdfError}
              />
            </Box>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default ResumePage;