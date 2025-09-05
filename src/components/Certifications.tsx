import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import SchoolIcon from '@mui/icons-material/School';
import resumeData from '../data/resumeData.json';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb',
      light: '#3b82f6',
      dark: '#1d4ed8',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
  },
  typography: {
    h2: {
      fontWeight: 700,
      fontSize: '2.5rem',
      marginBottom: '2rem',
    },
    h6: {
      fontWeight: 600,
      color: '#1e293b',
      fontSize: '1.1rem',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 25px rgba(37, 99, 235, 0.15)',
          },
        },
      },
    },
  },
});

const Certifications = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          py: 8,
          background: 'linear-gradient(to bottom, #f0f7ff, #ffffff)',
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h2"
              align="center"
              sx={{
                mb: 6,
                position: 'relative',
                color: '#1e293b',
                '&:after': {
                  content: '""',
                  display: 'block',
                  width: '80px',
                  height: '4px',
                  background: 'linear-gradient(90deg, #2563eb, #3b82f6)',
                  margin: '1.5rem auto',
                  borderRadius: '4px',
                },
              }}
            >
              Certifications
            </Typography>
          </motion.div>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
              },
              gap: 3,
            }}
          >
            {resumeData.certifications.map((certification, index) => (
              <Box key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      minHeight: '200px',
                      display: 'flex',
                      flexDirection: 'column',
                      background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                      border: '1px solid rgba(37, 99, 235, 0.1)',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'pointer',
                      borderRadius: '16px',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 20px 40px rgba(37, 99, 235, 0.15)',
                        borderColor: 'rgba(37, 99, 235, 0.3)',
                      },
                    }}
                  >
                    <CardContent sx={{ 
                      flexGrow: 1, 
                      p: 3, 
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      height: '100%'
                    }}>
                      <Box>
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              width: 60,
                              height: 60,
                              borderRadius: '50%',
                              backgroundColor: 'rgba(37, 99, 235, 0.1)',
                              color: 'primary.main',
                              mb: 2,
                              mx: 'auto',
                            }}
                          >
                            <SchoolIcon fontSize="large" />
                          </Box>
                        </motion.div>

                        <Typography
                          variant="h6"
                          sx={{
                            mb: 2,
                            color: '#1e293b',
                            fontWeight: 600,
                            lineHeight: 1.4,
                            minHeight: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {certification}
                        </Typography>
                      </Box>

                      <Chip
                        label="Certified"
                        size="small"
                        sx={{
                          bgcolor: 'rgba(37, 99, 235, 0.08)',
                          color: 'primary.dark',
                          fontWeight: 500,
                          '&:hover': {
                            bgcolor: 'rgba(37, 99, 235, 0.15)',
                          },
                          transition: 'all 0.2s ease',
                        }}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Certifications;
