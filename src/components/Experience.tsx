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
import resumeData from '../data/resumeData.json';

interface ExperienceData {
  title: string;
  company: string;
  location: string;
  period: string;
  responsibilities: string[];
}

const experienceData: ExperienceData[] = resumeData.experience;

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
                      p: { xs: 2, sm: 3 },
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: { xs: 'none', sm: 'translateY(-8px)' },
                        boxShadow: '0 20px 40px rgba(37, 99, 235, 0.15)',
                      },
                      borderTop: `4px solid ${theme.palette.primary.main}`,
                      borderRadius: '16px',
                      background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                      border: '1px solid rgba(37, 99, 235, 0.1)',
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
                      {exp.company} • {exp.location}
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