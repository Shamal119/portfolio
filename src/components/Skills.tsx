import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  Tooltip,
  styled,
  Zoom,
  ThemeProvider,
  createTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  List,
  ListItem,
} from '@mui/material';
import { motion } from 'framer-motion';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import CloudIcon from '@mui/icons-material/Cloud';
import BarChartIcon from '@mui/icons-material/BarChart';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import BiotechIcon from '@mui/icons-material/Biotech';
import LaunchIcon from '@mui/icons-material/Launch';
import CloseIcon from '@mui/icons-material/Close';

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
    h5: {
      fontWeight: 600,
      color: '#1e293b',
      fontSize: '1.25rem',
    },
  },
});

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  padding: theme.spacing(3),
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  borderRadius: '12px',
  background: '#ffffff',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  borderTop: `4px solid ${theme.palette.primary.main}`,
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 20px rgba(37, 99, 235, 0.1)',
  },
}));

const SkillIcon = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 50,
  height: 50,
  borderRadius: '8px',
  backgroundColor: 'rgba(37, 99, 235, 0.1)',
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: '#ffffff',
    transform: 'scale(1.05)',
  },
}));

const SkillBar = styled(Box)(({ value }: { value: number }) => ({
  height: '8px',
  width: '100%',
  backgroundColor: 'rgba(37, 99, 235, 0.1)',
  borderRadius: '4px',
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: `${value}%`,
    backgroundColor: '#2563eb',
    borderRadius: '4px',
    transition: 'width 1s ease-in-out',
  },
}));

interface Project {
  name: string;
  description: string;
  link?: string;
}

interface SkillDetail {
  name: string;
  level: number;
  projects: Project[];
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: SkillDetail[];
}

const Skills = () => {
  const [selectedSkill, setSelectedSkill] = useState<SkillDetail | null>(null);
  const [open, setOpen] = useState(false);

  const handleSkillClick = (skill: SkillDetail) => {
    setSelectedSkill(skill);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSkill(null);
  };

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
              mb: 6,
              position: 'relative',
              color: '#1e293b',
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
            Skills & Technologies
          </Typography>

          <Grid container spacing={4}>
            {skillCategories.map((category, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <StyledCard>
                    <Tooltip
                      title={`${category.title} Skills`}
                      TransitionComponent={Zoom}
                      arrow
                      placement="top"
                    >
                      <SkillIcon>
                        {category.icon}
                      </SkillIcon>
                    </Tooltip>

                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{
                        mb: 2,
                        textAlign: 'center',
                        color: '#1e293b',
                        fontWeight: 600,
                      }}
                    >
                      {category.title}
                    </Typography>

                    <Box sx={{ flexGrow: 1 }}>
                      {category.skills.map((skill, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <Box 
                            sx={{ 
                              mb: 2,
                              cursor: 'pointer',
                              '&:hover': {
                                opacity: 0.8
                              }
                            }}
                            onClick={() => handleSkillClick(skill)}
                          >
                            <Box sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              mb: 1,
                              alignItems: 'center'
                            }}>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: '#64748b',
                                  fontWeight: 500,
                                }}
                              >
                                {skill.name}
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{
                                  color: theme.palette.primary.main,
                                  fontWeight: 600,
                                }}
                              >
                                {skill.level}%
                              </Typography>
                            </Box>
                            <SkillBar value={skill.level} />
                          </Box>
                        </motion.div>
                      ))}
                    </Box>
                  </StyledCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
            TransitionComponent={Zoom}
          >
            <DialogTitle sx={{ 
              borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Typography variant="h6">
                Projects Using {selectedSkill?.name}
              </Typography>
              <IconButton onClick={handleClose} size="small">
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{ mt: 2 }}>
              {selectedSkill?.projects.length ? (
                <List>
                  {selectedSkill.projects.map((project, index) => (
                    <ListItem 
                      key={index}
                      sx={{
                        mb: 2,
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        bgcolor: 'rgba(37, 99, 235, 0.04)',
                        borderRadius: '8px',
                        padding: 2,
                        '&:hover': {
                          bgcolor: 'rgba(37, 99, 235, 0.08)',
                        }
                      }}
                    >
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
                        {project.name}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                        {project.description}
                      </Typography>
                      {project.link && (
                        <Button
                          size="small"
                          startIcon={<LaunchIcon />}
                          onClick={() => window.open(project.link, '_blank')}
                          sx={{ mt: 1 }}
                        >
                          View Project
                        </Button>
                      )}
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body1" sx={{ textAlign: 'center', py: 3 }}>
                  No project references available for this skill.
                </Typography>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Skills;

const skillCategories: SkillCategory[] = [
  {
    title: 'AI & ML',
    icon: <BiotechIcon fontSize="large" />,
    skills: [
      {
        name: "Generative AI",
        level: 95,
        projects: [
          {
            name: "AI-Powered Chatbot Application",
            description: "Developed an enterprise chatbot using Azure OpenAI for generating context-aware responses.",
            link: "https://ragchatbot-shamal.streamlit.app/"
          },
          {
            name: "RAG Chatbot Assistant",
            description: "Implemented RAG architecture with multiple generative AI models for enhanced responses.",
            link: "https://ragchatbot-shamal.streamlit.app/"
          },
          {
            name: "AI Financial Advisor",
            description: "Utilized generative AI for providing personalized financial insights and recommendations.",
            link: "https://aipersonalfinance-shamal.streamlit.app/"
          }
        ]
      },
      {
        name: "LLM",
        level: 90,
        projects: [
          {
            name: "RAG Chatbot Assistant",
            description: "Integrated OpenAI and Google's Gemini models for versatile language processing capabilities.",
            link: "https://ragchatbot-shamal.streamlit.app/"
          },
          {
            name: "AI Financial Advisor",
            description: "Leveraged multiple LLM models for comprehensive financial analysis and advice generation.",
            link: "https://aipersonalfinance-shamal.streamlit.app/"
          }
        ]
      },
      {
        name: "NLP",
        level: 88,
        projects: [
          {
            name: "Sentiment Analysis Dashboard",
            description: "Implemented advanced NLP techniques for analyzing sentiment in text and news articles.",
            link: "https://sentimentalanalysis-shamal.streamlit.app/"
          },
          {
            name: "Call Center Data Analytics Dashboard",
            description: "Applied NLP for analyzing transcribed call center conversations and extracting insights."
          }
        ]
      },
      {
        name: "Deep Learning",
        level: 85,
        projects: [
          {
            name: "Breast Cancer Detection",
            description: "Developed deep learning models using neural networks for accurate cancer detection and classification."
          },
          {
            name: "Indian Stock Market Analysis",
            description: "Implemented LSTM neural networks for stock price prediction and trend analysis.",
            link: "https://indianstockanalysis-shamal119.streamlit.app/"
          }
        ]
      },
      {
        name: "Machine Learning",
        level: 85,
        projects: []
      },
      {
        name: "PyTorch",
        level: 65,
        projects: []
      },
      {
        name: "TensorFlow",
        level: 60,
        projects: []
      }
    ]
  },
  {
    title: 'Cloud & Tools',
    icon: <CloudIcon fontSize="large" />,
    skills: [
      {
        name: "Azure AI",
        level: 95,
        projects: [
          {
            name: "AI-Powered Chatbot Application",
            description: "Utilized Azure AI services including Azure OpenAI and Azure AI Search for building an intelligent chatbot system."
          },
          {
            name: "RAG Chatbot Assistant",
            description: "Integrated Azure AI services for enhanced document processing and search capabilities.",
            link: "https://ragchatbot-shamal.streamlit.app/"
          }
        ]
      },
      {
        name: "OpenAI",
        level: 85,
        projects: [
          {
            name: "RAG Chatbot Assistant",
            description: "Implemented OpenAI models for advanced language understanding and generation.",
            link: "https://ragchatbot-shamal.streamlit.app/"
          },
          {
            name: "AI Financial Advisor",
            description: "Used OpenAI for generating financial insights and recommendations.",
            link: "https://aipersonalfinance-shamal.streamlit.app/"
          }
        ]
      },
      {
        name: "Google Vertex AI",
        level: 85,
        projects: [
          {
            name: "Chatbot Platform",
            description: "Leveraged Google Cloud's Vertex AI for building scalable ML models and chatbot capabilities."
          }
        ]
      },
      {
        name: "Google Gemini",
        level: 85,
        projects: []
      },
      {
        name: "Dialogflow CX",
        level: 80,
        projects: []
      },
      {
        name: "LangChain",
        level: 80,
        projects: []
      },
      {
        name: "AWS Bedrock",
        level: 55,
        projects: []
      }
    ]
  },
  {
    title: 'Programming',
    icon: <CodeIcon fontSize="large" />,
    skills: [
      {
        name: "Python",
        level: 95,
        projects: [
          {
            name: "RAG Chatbot Assistant",
            description: "Developed complete backend logic and ML pipeline using Python.",
            link: "https://ragchatbot-shamal.streamlit.app/"
          },
          {
            name: "Indian Stock Market Analysis",
            description: "Built data processing and analysis system using Python libraries.",
            link: "https://indianstockanalysis-shamal119.streamlit.app/"
          },
          {
            name: "Sentiment Analysis Dashboard",
            description: "Implemented NLP and data processing workflows in Python.",
            link: "https://sentimentalanalysis-shamal.streamlit.app/"
          }
        ]
      },
      {
        name: "FastAPI",
        level: 85,
        projects: [
          {
            name: "Chatbot Platform",
            description: "Created robust REST API endpoints using FastAPI for the chatbot backend."
          },
          {
            name: "AI-Powered Chatbot Application",
            description: "Developed API infrastructure for handling chat requests and responses."
          }
        ]
      },
      {
        name: "SQL",
        level: 85,
        projects: [
          {
            name: "Call Center Data Analytics",
            description: "Designed and implemented database schemas for storing and analyzing call center data."
          },
          {
            name: "Indian Stock Market Analysis",
            description: "Created complex queries for analyzing market data and generating insights.",
            link: "https://indianstockanalysis-shamal119.streamlit.app/"
          }
        ]
      },
      {
        name: "JavaScript",
        level: 80,
        projects: []
      },
      {
        name: "Java",
        level: 65,
        projects: []
      },
      {
        name: "R",
        level: 55,
        projects: []
      }
    ]
  },
  {
    title: 'Web Development',
    icon: <DeveloperModeIcon fontSize="large" />,
    skills: [
      {
        name: "Streamlit",
        level: 95,
        projects: [
          {
            name: "RAG Chatbot Assistant",
            description: "Built intuitive user interface for chatbot interaction.",
            link: "https://ragchatbot-shamal.streamlit.app/"
          },
          {
            name: "AI Financial Advisor",
            description: "Created interactive dashboard for financial analysis.",
            link: "https://aipersonalfinance-shamal.streamlit.app/"
          },
          {
            name: "Sentiment Analysis Dashboard",
            description: "Developed real-time sentiment analysis interface.",
            link: "https://sentimentalanalysis-shamal.streamlit.app/"
          }
        ]
      },
      {
        name: "ReactJS",
        level: 85,
        projects: [
          {
            name: "AI-Powered Chatbot Application",
            description: "Developed responsive frontend interface using ReactJS."
          },
          {
            name: "Chatbot Platform",
            description: "Built dynamic user interface components and chat interface."
          }
        ]
      },
      {
        name: "NextJS",
        level: 80,
        projects: []
      }
    ]
  },
  {
    title: 'Data Analysis',
    icon: <StorageIcon fontSize="large" />,
    skills: [
      {
        name: "Pandas",
        level: 90,
        projects: [
          {
            name: "Indian Stock Market Analysis",
            description: "Processed and analyzed large-scale market data.",
            link: "https://indianstockanalysis-shamal119.streamlit.app/"
          },
          {
            name: "AI Financial Advisor",
            description: "Implemented data processing pipelines for financial analysis.",
            link: "https://aipersonalfinance-shamal.streamlit.app/"
          }
        ]
      },
      {
        name: "NumPy",
        level: 88,
        projects: []
      },
      {
        name: "Scikit-Learn",
        level: 85,
        projects: [
          {
            name: "Breast Cancer Detection",
            description: "Used machine learning algorithms for cancer classification."
          },
          {
            name: "Sentiment Analysis Dashboard",
            description: "Implemented ML models for sentiment classification.",
            link: "https://sentimentalanalysis-shamal.streamlit.app/"
          }
        ]
      },
      {
        name: "OpenCV",
        level: 82,
        projects: []
      },
      {
        name: "TensorFlow",
        level: 65,
        projects: []
      },
      {
        name: "PyTorch",
        level: 65,
        projects: []
      }
    ]
  },
  {
    title: 'Visualization',
    icon: <BarChartIcon fontSize="large" />,
    skills: [
      {
        name: "Power BI",
        level: 90,
        projects: [
          {
            name: "Call Center Data Analytics Dashboard",
            description: "Created comprehensive dashboards for visualizing call center metrics and KPIs."
          }
        ]
      },
      {
        name: "Matplotlib",
        level: 80,
        projects: []
      },
      {
        name: "Seaborn",
        level: 80,
        projects: []
      },
      {
        name: "Plotly",
        level: 80,
        projects: [
          {
            name: "Indian Stock Market Analysis",
            description: "Implemented interactive financial charts and visualizations.",
            link: "https://indianstockanalysis-shamal119.streamlit.app/"
          },
          {
            name: "AI Financial Advisor",
            description: "Created dynamic visualizations for financial insights.",
            link: "https://aipersonalfinance-shamal.streamlit.app/"
          }
        ]
      },
      {
        name: "Excel",
        level: 75,
        projects: []
      },
      {
        name: "Alteryx",
        level: 65,
        projects: [
          {
            name: "Call Center Data Analytics Dashboard",
            description: "Used Alteryx for data preparation and transformation workflows."
          }
        ]
      }
    ]
  }
];