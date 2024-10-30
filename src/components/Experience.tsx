// src/components/Experience.tsx
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  useTheme,
} from '@mui/material';

import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';
import { motion } from 'framer-motion';

// First, install the required package:
// npm install @mui/lab

// Define the experience data type
interface ExperienceData {
  title: string;
  company: string;
  period: string;
  responsibilities: string[];
}

// Define the experience data
const experienceData: ExperienceData[] = [
  {
    title: "Data Scientist",
    company: "Truwave Software LLC",
    period: "August 2023 - Present",
    responsibilities: [
      "Architected and deployed enterprise chatbots using Dialogflow CX and Gemini technologies",
      "Designed and maintained scalable APIs using FastAPI",
      "Developed custom middleware and webhooks for enhanced Dialogflow conversation flows",
      "Implemented Generative AI and LLMs to build advanced AI models",
      "Utilized Azure AI and OpenAI for AI-based functionalities in production environments",
      "Created robust backend systems using Python and FastAPI for data processing pipelines"
    ]
  },
  {
    title: "Data Analyst Intern",
    company: "Truwave Software LLC",
    period: "January 2023 - April 2023",
    responsibilities: [
      "Analyzed call center audio data using OpenAI Whisper Timestamp and LDA",
      "Identified common customer issues and recommended service improvements",
      "Developed proficiency in Alteryx, Microsoft Power BI, and NLP techniques"
    ]
  }
];

const Experience = () => {
  const theme = useTheme();

  return (
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
          Professional Experience
        </Typography>

        <Timeline position="alternate">
          {experienceData.map((exp, index) => (
            <TimelineItem key={index}>
              <TimelineSeparator>
                <TimelineDot sx={{ bgcolor: theme.palette.primary.main }} />
                <TimelineConnector sx={{ bgcolor: theme.palette.primary.main }} />
              </TimelineSeparator>
              <TimelineContent>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Paper
                    elevation={3}
                    sx={{
                      p: 3,
                      transition: '0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 12px 20px rgba(37, 99, 235, 0.1)',
                      },
                      borderTop: `4px solid ${theme.palette.primary.main}`,
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      component="h3"
                      color="primary"
                      sx={{ fontWeight: 600 }}
                    >
                      {exp.title}
                    </Typography>
                    <Typography 
                      sx={{ mb: 1 }}
                      color="text.secondary"
                    >
                      {exp.company}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        display: 'block',
                        mb: 2,
                        color: theme.palette.primary.main 
                      }}
                    >
                      {exp.period}
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, m: 0 }}>
                      {exp.responsibilities.map((resp, i) => (
                        <Typography 
                          key={i} 
                          component="li" 
                          variant="body2"
                          sx={{ mb: 1 }}
                        >
                          {resp}
                        </Typography>
                      ))}
                    </Box>
                  </Paper>
                </motion.div>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Container>
    </Box>
  );
};

export default Experience;