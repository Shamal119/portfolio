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
      '@media (max-width:768px)': {
        fontSize: '2rem',
        marginBottom: '1.5rem',
      },
      '@media (max-width:600px)': {
        fontSize: '1.8rem',
        marginBottom: '1rem',
      },
    },
    h5: {
      fontWeight: 600,
      color: '#1e293b',
      fontSize: '1.25rem',
      '@media (max-width:768px)': {
        fontSize: '1.1rem',
      },
    },
  },
});

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  minHeight: '280px',
  padding: theme.spacing(3),
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  borderRadius: '16px',
  background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  borderTop: `4px solid ${theme.palette.primary.main}`,
  border: '1px solid rgba(37, 99, 235, 0.1)',
  '&:hover': {
    transform: 'translateY(-12px)',
    boxShadow: '0 20px 40px rgba(37, 99, 235, 0.15)',
    borderColor: 'rgba(37, 99, 235, 0.3)',
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
          py: { xs: 6, md: 8 },
          background: 'linear-gradient(to bottom, #ffffff, #f0f7ff)',
        }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
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

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
              },
              gap: { xs: 2, sm: 3 },
            }}
          >
            {skillCategories.map((category, index) => (
              <Box key={index}>
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

                    <Box sx={{ 
                      flexGrow: 1, 
                      display: 'flex', 
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}>
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
                              mb: 1.5,
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
              </Box>
            ))}
          </Box>

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
    title: 'Cloud & AI Tools',
    icon: <CloudIcon fontSize="large" />,
    skills: resumeData.skills.cloud_ai_tools.map(skill => ({
      name: skill,
      level: 85,
      projects: []
    }))
  },
  {
    title: 'AI & Machine Learning',
    icon: <BiotechIcon fontSize="large" />,
    skills: resumeData.skills.ai_ml.map(skill => ({
      name: skill,
      level: 85,
      projects: []
    }))
  },
  {
    title: 'BI & Visualization',
    icon: <BarChartIcon fontSize="large" />,
    skills: resumeData.skills.bi_visualization.map(skill => ({
      name: skill,
      level: 85,
      projects: []
    }))
  },
  {
    title: 'Programming',
    icon: <CodeIcon fontSize="large" />,
    skills: resumeData.skills.programming.map(skill => ({
      name: skill,
      level: 85,
      projects: []
    }))
  },
  {
    title: 'Data Tools',
    icon: <StorageIcon fontSize="large" />,
    skills: resumeData.skills.data_tools.map(skill => ({
      name: skill,
      level: 85,
      projects: []
    }))
  }
];