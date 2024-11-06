// src/components/Projects.tsx
import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Container,
  Grid,
  useTheme,
  ThemeProvider,
  createTheme,
  IconButton,
} from '@mui/material';
import { motion } from 'framer-motion';
import LaunchIcon from '@mui/icons-material/Launch';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb',
      light: '#3b82f6',
      dark: '#1d4ed8',
    },
    background: {
      default: '#f8fafc', // Lighter background
      paper: '#ffffff',
    },
  },
  typography: {
    h2: {
      fontWeight: 800, // Increased weight
      fontSize: '2.5rem',
      letterSpacing: '-0.02em',
    },
    h5: {
      fontWeight: 700,
      fontSize: '1.25rem',
      color: '#1e293b', // Darker text for better contrast
    },
    body2: {
      lineHeight: 1.7, // Improved readability
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px', // Rounded corners
        },
      },
    },
  },
});

interface Project {
  title: string;
  description: string;
  tech: string[];
  link?: string;
}

const Projects = () => {
  const projects: Project[] = [
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
      title: "RAG Chatbot Assistant",
      description: "Built a conversational AI system using Retrieval Augmented Generation (RAG) for context-aware responses. Supports OpenAI and Google's Gemini models, with features like document processing, FAISS vector search, conversation history, and source attribution.",
      tech: ["LangChain", "Streamlit", "FAISS", "OpenAI", "Gemini"],
      link: "https://ragchatbot-shamal.streamlit.app/"
    },
    {
      title: "AI Financial Advisor",
      description: "Developed an intelligent financial analysis platform that provides AI-powered insights on spending patterns. Features include interactive visualizations, category-wise analysis, and personalized financial recommendations using both OpenAI and Google's Gemini models.",
      tech: ["Streamlit", "OpenAI", "Gemini", "Plotly", "Pandas"],
      link: "https://aipersonalfinance-shamal.streamlit.app/"
    },
   
    {
      title: "Indian Stock Market Analysis Dashboard",
      description: "Developed a comprehensive real-time stock analysis platform for Indian markets featuring ML-powered predictions, technical analysis, and market intelligence. Implemented LSTM neural networks for 30-day forecasting and integrated multiple data sources for market insights.",
      tech: ["Python", "TensorFlow", "Streamlit", "LSTM", "Plotly"],
      link: "https://indianstockanalysis-shamal119.streamlit.app/"
    },
    {
      title: "Sentiment Analysis Dashboard",
      description: "Built a web application that performs real-time sentiment analysis on custom text and news articles. Features include sentiment scoring, sentence-level breakdown, topic-based news analysis, and interactive visualizations with sentiment distribution and word clouds.",
      tech: ["Streamlit", "TextBlob", "NLTK", "Plotly", "WordCloud", "NewsAPI"],
      link: "https://sentimentalanalysis-shamal.streamlit.app/"
    },
  
    {
      title: "Call Center Data Analytics Dashboard",
      description: "Transcribed call data using OpenAI Whisper, analyzed content, and created Power BI dashboard.",
      tech: ["Python", "NLP", "Power BI", "Alteryx"],
    },
    {
      "title": "Breast Cancer Detection Using Neural Networks",
      "description": "Developed a deep learning classification model using Sequential Neural Networks to predict breast cancer malignancy. Achieved high accuracy through careful preprocessing, model architecture optimization, and deployment as a user-friendly web application. Features include automated hospital recommendations based on predictions and an intuitive interface for medical image analysis.",
      "tech": [
          "Python 3.9",
          "Keras",
          "TensorFlow",
          "Streamlit",
          "Pandas",
          "scikit-learn",
          "NumPy",
          "Matplotlib",
          "Seaborn"
      ],
      "link": "https://breastcancer-shamal.streamlit.app/"
  }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: {
      y: -12,
      transition: { duration: 0.3 },
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          py: 12, // Increased padding
          background: 'linear-gradient(180deg, #ffffff 0%, #f0f7ff 100%)',
          minHeight: '100vh',
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h2"
              align="center"
              sx={{
                mb: 6,
                position: 'relative',
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
              Featured Projects
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {projects.map((project, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      '&:hover': {
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                      },
                      background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                      border: '1px solid rgba(37, 99, 235, 0.1)',
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Typography variant="h5" gutterBottom>
                          {project.title}
                        </Typography>
                        {project.link && (
                          <IconButton
                            size="small"
                            onClick={() => window.open(project.link, '_blank')}
                            sx={{
                              color: 'primary.main',
                              '&:hover': { backgroundColor: 'rgba(37, 99, 235, 0.1)' },
                            }}
                          >
                            <LaunchIcon fontSize="small" />
                          </IconButton>
                        )}
                      </Box>
                      
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 3,
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 4,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {project.description}
                      </Typography>

                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {project.tech.map((tech, i) => (
                          <Chip
                            key={i}
                            label={tech}
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
                        ))}
                      </Box>
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