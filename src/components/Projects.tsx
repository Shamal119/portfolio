// src/components/Projects.tsx
import React from 'react';
import { 
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Container,
  Grid,
  useTheme,
  ThemeProvider,
  createTheme
} from '@mui/material';
import { motion } from 'framer-motion';

// Create custom theme with blue and white
const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb', // Bright blue
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
      marginBottom: '2rem',
    },
    h5: {
      fontWeight: 600,
      color: '#2563eb',
    },
  },
});

const Projects = () => {
  const projects = [
    {
      title: "Chatbot Platform",
      description: "Developed enterprise-grade chatbot using Dialogflow, FastAPI, and cloud services. Implemented custom middleware for enhanced conversation handling and integrated with multiple backend systems.",
      tech: ["Dialogflow", "FastAPI", "Python", "GCP Cloud"],
    },
    {
      title: "AI-Powered Chatbot Application",
      description: "Developed Chatbot using Generative AI, Azure AI search, and OpenAI technologies from scratch using Azure AI search, FastAPI and ReactJS.",
      tech: ["Azure OpenAI", "Azure AI search", "FastAPI", "ReactJS"],
    },
    {
      title: "Call Center Data Analytics Dashboard",
      description: "Transcribed call data using OpenAI Whisper, analyzed content, and created Power BI dashboard.",
      tech: ["Python", "NLP", "Power BI", "Alteryx"],
    },
    {
      title: "Sentiment Analysis Dashboard",
      description: "Built a real-time sentiment analysis tool that monitors social media platforms for brand sentiment using NLP. Created dashboards to visualize sentiment trends and volume.",
      tech: ["Python", "NLP", "Power BI", "FastAPI"],
    },
    {
      title: "Breast Cancer Detection Using Machine Learning",
      description: "Developed classification model achieving 95% accuracy using Random Forest and k-Nearest Neighbors (KNN). Implemented cross-validation and hyperparameter tuning.",
      tech: ["Python", "scikit-learn", "Flask", "Pandas"],
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          py: 8,
          background: 'linear-gradient(to bottom, #ffffff, #f0f7ff)',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            sx={{
              position: 'relative',
              '&:after': {
                content: '""',
                display: 'block',
                width: '60px',
                height: '4px',
                background: theme.palette.primary.main,
                margin: '1rem auto',
                borderRadius: '2px',
              }
            }}
          >
            Featured Projects
          </Typography>

          <Grid container spacing={4}>
            {projects.map((project, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: '0.3s',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 20px rgba(37, 99, 235, 0.1)',
                      },
                      borderTop: `4px solid ${theme.palette.primary.main}`,
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography 
                        variant="h5" 
                        gutterBottom
                        sx={{ mb: 2 }}
                      >
                        {project.title}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {project.description}
                      </Typography>
                      <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {project.tech.map((tech, i) => (
                          <Chip
                            key={i}
                            label={tech}
                            size="small"
                            sx={{
                              bgcolor: 'rgba(37, 99, 235, 0.1)',
                              color: 'primary.main',
                              '&:hover': {
                                bgcolor: 'rgba(37, 99, 235, 0.2)',
                              }
                            }}
                          />
                        ))}
                      </Box>
                      <Button 
                        variant="contained" 
                        fullWidth
                        sx={{
                          mt: 'auto',
                          bgcolor: 'primary.main',
                          '&:hover': {
                            bgcolor: 'primary.dark',
                          }
                        }}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Projects;