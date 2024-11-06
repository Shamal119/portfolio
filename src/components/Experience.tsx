import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
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

interface ExperienceData {
  title: string;
  company: string;
  period: string;
  responsibilities: string[];
}

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
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        py: { xs: 4, md: 8 }, // Reduced padding on mobile
        background: 'linear-gradient(to bottom, #ffffff, #f0f7ff)',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          align="center"
          sx={{
            mb: { xs: 4, md: 6 }, // Reduced margin on mobile
            fontSize: { xs: '2rem', md: '2.5rem' }, // Smaller font on mobile
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

        <Timeline
          position="right"  // Force right alignment for mobile
          sx={{
            p: { xs: 0, sm: 2 },
            position: 'relative',
            [`& .MuiTimelineItem-root`]: {
              '&:before': {
                display: 'none',  // Remove the left spacing completely on mobile
              },
              minHeight: '100px',
              '&:last-child': {
                minHeight: 'auto'
              }
            }
          }}
        >
          {experienceData.map((exp, index) => (
            <TimelineItem
              key={index}
              sx={{
                minHeight: { xs: 'auto', sm: '70px' },
                mb: { xs: 3, sm: 0 },
                position: 'relative',  // Add this
              }}
            >
              <TimelineSeparator sx={{ position: 'relative' }}>
                <TimelineDot
                  sx={{
                    bgcolor: theme.palette.primary.main,
                    boxShadow: `0 0 0 4px ${theme.palette.primary.main}20`,
                    zIndex: 1,
                    position: 'relative'
                  }}
                />
                <TimelineConnector
                  sx={{
                    bgcolor: theme.palette.primary.main,
                    opacity: 0.3,
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '2px',
                    height: '100%',
                    top: 0,
                    zIndex: 0,
                    display: 'block'
                  }}
                />
              </TimelineSeparator>
              <TimelineContent
                sx={{
                  py: '12px',
                  px: '16px',
                  ml: 2,  // Add left margin to create space between line and content
                }}
              >
                <motion.div
                  initial={{ opacity: 0, x: isMobile ? 20 : (index % 2 === 0 ? 50 : -50) }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Paper
                    elevation={3}
                    sx={{
                      p: { xs: 2, sm: 3 }, // Reduced padding on mobile
                      transition: '0.3s',
                      '&:hover': {
                        transform: { xs: 'none', sm: 'translateY(-5px)' }, // Disable hover effect on mobile
                        boxShadow: '0 12px 20px rgba(37, 99, 235, 0.1)',
                      },
                      borderTop: `4px solid ${theme.palette.primary.main}`,
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="h3"
                      color="primary"
                      sx={{
                        fontWeight: 600,
                        fontSize: { xs: '1.1rem', sm: '1.25rem' }, // Smaller font on mobile
                      }}
                    >
                      {exp.title}
                    </Typography>
                    <Typography
                      sx={{
                        mb: 1,
                        fontSize: { xs: '0.9rem', sm: '1rem' }, // Smaller font on mobile
                      }}
                      color="text.secondary"
                    >
                      {exp.company}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        display: 'block',
                        mb: 2,
                        color: theme.palette.primary.main,
                        fontSize: { xs: '0.75rem', sm: '0.875rem' }, // Smaller font on mobile
                      }}
                    >
                      {exp.period}
                    </Typography>
                    <Box
                      component="ul"
                      sx={{
                        pl: { xs: 2, sm: 3 }, // Reduced padding on mobile
                        m: 0,
                        '& li': {
                          marginBottom: { xs: '8px', sm: '12px' }, // Reduced spacing on mobile
                        }
                      }}
                    >
                      {exp.responsibilities.map((resp, i) => (
                        <Typography
                          key={i}
                          component="li"
                          variant="body2"
                          sx={{
                            fontSize: { xs: '0.85rem', sm: '0.875rem' }, // Smaller font on mobile
                            lineHeight: { xs: 1.4, sm: 1.6 }, // Adjusted line height for mobile
                          }}
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