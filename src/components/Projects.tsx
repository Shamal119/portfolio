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
      "description": "Developed a deep learning classification model using Sequential Neural Networks to predict breast cancer malignancy.  Features include automated hospital recommendations based on predictions and an intuitive interface for medical image analysis.",
      "tech": [
          "Python ",
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
                  style={{ textDecoration: 'none' }}
                  onClick={() => project.link && window.open(project.link, '_blank')}
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
                        '& .project-title': {
                          color: theme.palette.primary.main,
                          textDecoration: 'underline'
                        }
                      },
                      borderTop: `4px solid ${theme.palette.primary.main}`,
                      cursor: project.link ? 'pointer' : 'default',
                      position: 'relative',
                      '&::after': project.link ? {
                        content: '"🔗"',
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        fontSize: '1.2rem'
                      } : {}
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                        {project.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
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