// src/components/Projects.tsx
import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Container,
  Grid,
  ThemeProvider,
  createTheme,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { motion } from 'framer-motion';
import LaunchIcon from '@mui/icons-material/Launch';
import CloseIcon from '@mui/icons-material/Close';
import resumeData from '../data/resumeData.json';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb',
      light: '#3b82f6',
      dark: '#1d4ed8',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
  },
  typography: {
    h2: {
      fontWeight: 800,
      fontSize: '2.5rem',
      letterSpacing: '-0.02em',
      '@media (max-width:768px)': {
        fontSize: '2rem',
      },
      '@media (max-width:600px)': {
        fontSize: '1.8rem',
      },
    },
    h5: {
      fontWeight: 700,
      fontSize: '1.25rem',
      color: '#1e293b',
      '@media (max-width:768px)': {
        fontSize: '1.1rem',
      },
    },
    h6: {
      fontWeight: 700,
      fontSize: '1.1rem',
      color: '#1e293b',
      '@media (max-width:768px)': {
        fontSize: '1rem',
      },
    },
    body2: {
      lineHeight: 1.7,
      '@media (max-width:768px)': {
        fontSize: '0.9rem',
      },
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '16px',
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
  longDescription?: string;
  features?: string[];
  implementation?: string;
  challenges?: string[];
  outcome?: string;
}

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = (project: Project) => {
    setSelectedProject(project);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProject(null);
  };

  const projects: Project[] = [
    // Resume projects (excluding those with detailed versions below)
    ...resumeData.projects
      .filter(project => ![
        "RAG Chatbot Assistant",
        "AI Financial Advisor", 
        "AI-Powered Customer Churn Predictor"
      ].includes(project.title))
      .map(project => ({
        title: project.title,
        description: project.description,
        tech: project.technologies,
        link: undefined,
        longDescription: project.description,
        features: [],
        implementation: "",
        challenges: [],
        outcome: ""
      })),
    // Detailed projects
    {
      title: "Chatbot Platform",
      description: "Developed enterprise-grade chatbot using Dialogflow, FastAPI, and cloud services. Implemented custom middleware for enhanced conversation handling and integrated with multiple backend systems.",
      tech: ["Dialogflow", "FastAPI", "Python", "GCP Cloud"],
      longDescription: "A comprehensive enterprise chatbot solution that revolutionizes customer service by leveraging advanced natural language processing and cloud technologies. The platform handles thousands of customer queries daily with high accuracy and minimal latency.",
      features: [
        "Natural Language Processing with Dialogflow",
        "Real-time response handling",
        "Multi-language support",
        "Analytics dashboard",
        "Custom middleware for enhanced conversation flow",
        "Integration with multiple backend systems"
      ],
      implementation: "The solution was built using Dialogflow for natural language understanding, FastAPI for creating robust microservices, and Google Cloud Platform for scalable infrastructure. Custom middleware was developed to handle complex conversation flows and integrate with existing enterprise systems.",
      challenges: [
        "Complex integration with legacy systems",
        "Handling high concurrent users",
        "Maintaining conversation context across sessions",
        "Ensuring high accuracy in intent recognition"
      ],
      outcome: "The platform have achieved 95% accuracy in intent recognition, reduced customer service response time by 60%, and successfully handles over 10,000 conversations daily."
    },
    {
      title: "AI-Powered Chatbot Application",
      description: "Developed Chatbot using Generative AI, Azure AI search, and OpenAI technologies from scratch using Azure AI search, FastAPI and ReactJS.",
      tech: ["Azure OpenAI", "Azure AI search", "FastAPI", "ReactJS"],
      longDescription: "An innovative AI-powered chatbot that combines the power of OpenAI's language models with Azure's robust search capabilities to provide intelligent and context-aware responses.",
      features: [
        "Advanced language understanding using OpenAI",
        "Use Azure AI search for Indexing",
        "Semantic search capabilities",
        "Real-time response generation",
        "Context-aware conversations",
        "Integration with enterprise knowledge base"
      ],
      implementation: "Built using Azure OpenAI services for natural language processing, Azure AI Search for efficient information retrieval, FastAPI for backend services, and ReactJS for a responsive frontend interface.",
      challenges: [
        "Optimizing response times while maintaining accuracy",
        "Managing API costs effectively",
        "Implementing proper security measures",
        "Handling complex conversational contexts"
      ],
      outcome: "Successfully deployed ."
    },
    {
      title: "RAG Chatbot Assistant",
      description: "Built a conversational AI system using Retrieval Augmented Generation (RAG) for context-aware responses. Supports OpenAI and Google's Gemini models, with features like document processing, FAISS vector search, conversation history, and source attribution.",
      tech: ["LangChain", "Streamlit", "FAISS", "OpenAI", "Gemini"],
      link: "https://ragchatbot-shamal.streamlit.app/",
      longDescription: "A sophisticated RAG-based chatbot that combines the power of large language models with efficient vector search to provide accurate, context-aware responses backed by reliable sources.",
      features: [
        "Document processing and vectorization",
        "FAISS vector database integration",
        "Multi-model support (OpenAI and Gemini)",
        "Conversation history management",
        "Source attribution for responses",
        "Real-time document similarity search"
      ],
      implementation: "Implemented using LangChain framework for RAG pipeline, FAISS for efficient vector search, and Streamlit for the user interface. Integrated both OpenAI and Google's Gemini models for flexible AI processing.",
      challenges: [
        "Optimizing vector search performance",
        "Managing context window limitations",
        "Ensuring accurate source attribution",
        "Balancing response quality and speed"
      ],
      outcome: "Created a robust RAG system capable of processing various document formats and providing accurate, source-backed responses with 90% relevancy rate."
    },
    {
      title: "AI Financial Advisor",
      description: "Developed an intelligent financial analysis platform that provides AI-powered insights on spending patterns. Features include interactive visualizations, category-wise analysis, and personalized financial recommendations.",
      tech: ["Streamlit", "OpenAI", "Gemini", "Plotly", "Pandas"],
      link: "https://aipersonalfinance-shamal.streamlit.app/",
      longDescription: "An innovative financial advisory platform that leverages AI to analyze personal spending patterns and provide actionable insights for better financial management.",
      features: [
        "AI-powered spending analysis",
        "Interactive data visualizations",
        "Category-wise expense tracking",
        "Personalized financial recommendations",
        "Multi-model AI insights (OpenAI & Gemini)",
        "Trend analysis and forecasting"
      ],
      implementation: "Built using Streamlit for the frontend, integrated OpenAI and Gemini models for intelligent analysis, and utilized Plotly for interactive visualizations. Pandas handles data processing and analysis.",
      challenges: [
        "Ensuring accurate expense categorization",
        "Processing diverse financial data formats",
        "Generating relevant financial insights",
        "Maintaining data privacy and security"
      ],
      outcome: "Successfully helped users achieve an average of 25% better budget management through AI-powered insights and recommendations."
    },
    {
      title: "AI-Powered Customer Churn Predictor",
      description: "Built a comprehensive end-to-end machine learning solution for customer churn prediction with 84.6% ROC AUC. Features advanced feature engineering, model optimization, and full-stack deployment with React frontend and FastAPI backend.",
      tech: ["Python", "XGBoost", "Scikit-learn", "React", "FastAPI", "Vercel"],
      link: "https://ai-powered-customer-churn-predictor-7ht7hy9kn.vercel.app",
      longDescription: "A complete end-to-end machine learning workflow showcasing advanced feature engineering, model optimization, and modern full-stack development practices. This project demonstrates technical excellence with production-ready deployment and business-focused insights.",
      features: [
        "Advanced feature engineering with 8 new engineered features",
        "Model comparison: Logistic Regression, Random Forest, XGBoost",
        "Hyperparameter tuning with 324 parameter combinations",
        "Interactive React frontend with real-time predictions",
        "FastAPI backend with automatic API documentation",
        "Production deployment on Vercel",
        "Comprehensive business insights and recommendations",
        "Real-time predictions with <500ms response time"
      ],
      implementation: "Developed using Python with XGBoost for gradient boosting, React 19 with TypeScript for the frontend, FastAPI for the backend API, and comprehensive feature engineering including tenure groups, service counts, and payment method analysis. Deployed on Vercel for production use.",
      challenges: [
        "Improving model performance from 76% to 84.6% ROC AUC",
        "Engineering meaningful features from raw customer data",
        "Optimizing model for production deployment",
        "Creating intuitive user interface for business users",
        "Balancing model complexity with interpretability"
      ],
      outcome: "Achieved 84.6% ROC AUC with actionable business insights. Identified that month-to-month contracts have 55.1% churn rate and customers without online security churn 2.3x more. The model provides clear recommendations for reducing churn by 20-30% through targeted interventions."
    },
    {
      title: "Sentiment Analysis Dashboard",
      description: "Built a web application that performs real-time sentiment analysis on custom text and news articles.",
      tech: ["Streamlit", "TextBlob", "NLTK", "Plotly", "WordCloud", "NewsAPI"],
      link: "https://sentimentalanalysis-shamal.streamlit.app/",
      longDescription: "A comprehensive sentiment analysis platform that combines natural language processing with news aggregation to provide real-time sentiment insights on various topics and news articles.",
      features: [
        "Real-time text sentiment analysis",
        "News article sentiment tracking",
        "Interactive sentiment visualizations",
        "Word cloud generation",
        "Topic-based news filtering",
        "Sentiment trend analysis"
      ],
      implementation: "Integrated multiple NLP libraries including TextBlob and NLTK for sentiment analysis, NewsAPI for real-time news fetching, and Plotly for interactive visualizations.",
      challenges: [
        "Handling multiple news sources",
        "Ensuring accurate sentiment scoring",
        "Processing multilingual content",
        "Real-time data visualization"
      ],
      outcome: "Successfully processes over news articles daily with 85% sentiment accuracy, providing valuable insights for market research and trend analysis."
    },
    {
      title: "Call Center Data Analytics Dashboard",
      description: "Transcribed call data using OpenAI Whisper, analyzed content, and created Power BI dashboard.",
      tech: ["Python", "NLP", "Power BI", "Alteryx"],
      longDescription: "An advanced call center analytics solution that combines speech-to-text technology with powerful data visualization to provide actionable insights from customer interactions.",
      features: [
        "Automated call transcription",
        "Sentiment analysis of calls",
        "Call duration analytics"
      ],
      implementation: "Used OpenAI Whisper for accurate call transcription, implemented NLP techniques for content analysis, and created comprehensive Power BI dashboards using Alteryx for data preparation.",
      challenges: [
        "Processing large audio files",
        "Maintaining transcription accuracy",
        "Handling multiple accent variations",
       
      ],
      outcome: "Improved call center efficiency through better insights and reduced manual transcription time ."
    },
    {
      title: "Breast Cancer Detection Using Neural Networks",
      description: "Developed a deep learning classification model using Sequential Neural Networks to predict breast cancer malignancy.",
      tech: ["Python ", "Keras", "TensorFlow", "Streamlit", "Pandas", "scikit-learn", "NumPy", "Matplotlib", "Seaborn"],
      longDescription: "A sophisticated medical imaging analysis system that leverages deep learning to assist in the early detection and classification of breast cancer from medical images.",
      features: [
        "Advanced image processing",
        "Neural network-based classification",
        "Automated hospital recommendations",
        "Interactive result visualization",
        "Detailed analysis reports",
        "High-accuracy predictions"
      ],
      implementation: "Built using TensorFlow and Keras for the neural network model, implemented comprehensive data preprocessing, and created an intuitive Streamlit interface for medical professionals.",
      challenges: [
        "Ensuring high model accuracy",
        "Managing class imbalance",
        "Processing varied image qualities",
        "Implementing proper validation methods"
      ],
      outcome: "Achieved 75% accuracy in cancer detection, significantly reducing diagnosis time and improving early detection rates."
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
          py: { xs: 6, md: 12 },
          background: 'linear-gradient(180deg, #ffffff 0%, #f0f7ff 100%)',
          minHeight: '100vh',
        }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
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

          <Box
            className="projects-grid"
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
              },
              gap: { xs: 2, sm: 3 },
              width: '100%',
              maxWidth: '100%',
              overflow: 'visible',
              opacity: 1,
              visibility: 'visible',
            }}
          >
            {projects.map((project, index) => (
              <Box key={index}>
                <motion.div
                  variants={cardVariants}
                  initial="visible"
                  whileHover="hover"
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      minHeight: { xs: '280px', sm: '320px' },
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      cursor: 'pointer',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                      border: '1px solid rgba(37, 99, 235, 0.1)',
                      borderRadius: '16px',
                      '&:hover': {
                        boxShadow: '0 20px 25px -5px rgba(37, 99, 235, 0.15)',
                        transform: 'translateY(-8px)',
                        borderColor: 'rgba(37, 99, 235, 0.3)',
                      },
                    }}
                    onClick={() => handleClickOpen(project)}
                  >
                    <CardContent sx={{ 
                      flexGrow: 1, 
                      p: 3, 
                      display: 'flex', 
                      flexDirection: 'column',
                      height: '100%'
                    }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Typography variant="h5" gutterBottom>
                          {project.title}
                        </Typography>
                        {project.link && (
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(project.link, '_blank');
                            }}
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
                          flexGrow: 1,
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          minHeight: '72px',
                        }}
                      >
                        {project.description}
                      </Typography>

                      <Box sx={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        gap: 1,
                        mt: 'auto'
                      }}>
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
              </Box>
            ))}
          </Box>

          <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
            scroll="paper"
          >
            {selectedProject && (
              <>
                <DialogTitle sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                  padding: '20px 24px',
                }}>
                  <Typography variant="h5" component="div">
                    {selectedProject.title}
                  </Typography>
                  <IconButton onClick={handleClose} size="large">
                    <CloseIcon />
                  </IconButton>
                </DialogTitle>
                <DialogContent sx={{ pt: 3 }}>
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" gutterBottom color="primary">
                      Overview
                    </Typography>
                    <Typography variant="body1">
                      {selectedProject.longDescription || selectedProject.description}
                    </Typography>
                  </Box>

                  {selectedProject.features && (
                    <Box sx={{ mb: 4 }}>
                      <Typography variant="h6" gutterBottom color="primary">
                        Key Features
                      </Typography>
                      <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
                        {selectedProject.features.map((feature, index) => (
                          <li key={index}>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                              {feature}
                            </Typography>
                          </li>
                        ))}
                      </ul>
                    </Box>
                  )}

                  {selectedProject.implementation && (
                    <Box sx={{ mb: 4 }}>
                      <Typography variant="h6" gutterBottom color="primary">
                        Implementation
                      </Typography>
                      <Typography variant="body1">
                        {selectedProject.implementation}
                      </Typography>
                    </Box>
                  )}

                  {selectedProject.challenges && (
                    <Box sx={{ mb: 4 }}>
                      <Typography variant="h6" gutterBottom color="primary">
                        Challenges & Solutions
                      </Typography>
                      <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
                        {selectedProject.challenges.map((challenge, index) => (
                          <li key={index}>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                              {challenge}
                            </Typography>
                          </li>
                        ))}
                      </ul>
                    </Box>
                  )}

                  {selectedProject.outcome && (
                    <Box sx={{ mb: 4 }}>
                      <Typography variant="h6" gutterBottom color="primary">
                        Outcome
                      </Typography>
                      <Typography variant="body1">
                        {selectedProject.outcome}
                      </Typography>
                    </Box>
                  )}

                  <Box>
                    <Typography variant="h6" gutterBottom color="primary">
                      Technologies Used
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {selectedProject.tech.map((tech, i) => (
                        <Chip
                          key={i}
                          label={tech}
                          sx={{
                            bgcolor: 'rgba(37, 99, 235, 0.08)',
                            color: 'primary.dark',
                            fontWeight: 500,
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </DialogContent>
                <DialogActions sx={{ padding: '16px 24px' }}>
                  {selectedProject.link && (
                    <Button
                      variant="contained"
                      startIcon={<LaunchIcon />}
                      onClick={() => window.open(selectedProject.link, '_blank')}
                      sx={{ mr: 'auto' }}
                    >
                      View Project
                    </Button>
                  )}
                  <Button onClick={handleClose} variant="outlined">
                    Close
                  </Button>
                </DialogActions>
              </>
            )}
          </Dialog>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Projects;