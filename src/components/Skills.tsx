// src/components/Skills.tsx
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  LinearProgress,
  useTheme,
  Card,
  Icon,
  Tooltip,
  styled,
  Zoom
} from '@mui/material';
import { motion } from 'framer-motion';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import CloudIcon from '@mui/icons-material/Cloud';
import BarChartIcon from '@mui/icons-material/BarChart';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import BiotechIcon from '@mui/icons-material/Biotech';


const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  padding: theme.spacing(3),
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 20px rgba(37, 99, 235, 0.1)',
  },
  display: 'flex',
  flexDirection: 'column',
  borderTop: `4px solid ${theme.palette.primary.main}`,
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
}));

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 4,
  backgroundColor: 'rgba(37, 99, 235, 0.1)',
  '& .MuiLinearProgress-bar': {
    borderRadius: 4,
    backgroundColor: theme.palette.primary.main,
  },
}));

const SkillIcon = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 50,
  height: 50,
  borderRadius: '50%',
  backgroundColor: 'rgba(37, 99, 235, 0.1)',
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
  },
}));

// Define skill categories
const skillCategories = [
  {
    title: 'AI & ML',
    icon: <BiotechIcon fontSize="large" />,
    skills: [
      { name: "Generative AI", level: 95 },
      { name: "LLM", level: 90 },
      { name: "NLP", level: 88 },
      { name: "Deep Learning", level: 85 },
      { name: "Machine Learning", level: 85 },
      { name: "PyTorch", level: 65 },
      { name: "TensorFlow", level: 60 }
    ]
  },
  {
    title: 'Cloud & Tools',
    icon: <CloudIcon fontSize="large" />,
    skills: [
      { name: "Azure AI", level: 95 },
      { name: "OpenAI", level: 85 },
      { name: "Google Vertex AI", level: 85 },
      { name: "Google Gemini", level: 85 },
      { name: "Dialogflow CX", level: 80 },
      { name: "LangChain", level: 80 },
      { name: "AWS Bedrock", level: 70 }
    ]
  },
  {
    title: 'Programming',
    icon: <CodeIcon fontSize="large" />,
    skills: [
      { name: "Python", level: 95 },
      { name: "FastAPI", level: 85 },
      { name: "SQL", level: 85 },
      { name: "JavaScript", level: 80 },
      { name: "Java", level: 65 },
      { name: "R", level: 55 }
    ]
  },
  {
    title: 'Web Development',
    icon: <DeveloperModeIcon fontSize="large" />,
    skills: [
      { name: "Streamlit", level: 95 },
      { name: "ReactJS", level: 85 },
      { name: "NextJS", level: 80 }
    ]
  },
  {
    title: 'Data Analysis',
    icon: <StorageIcon fontSize="large" />,
    skills: [
      { name: "Pandas", level: 90 },
      { name: "NumPy", level: 88 },
      { name: "Scikit-Learn", level: 85 },
      { name: "OpenCV", level: 82 },
      { name: "TensorFlow", level: 65 },
      { name: "PyTorch", level: 65 }
    ]
  },
  {
    title: 'Visualization',
    icon: <BarChartIcon fontSize="large" />,
    skills: [
      { name: "Power BI", level: 90 },
      { name: "Matplotlib", level: 80 },
      { name: "Seaborn", level: 80 },
      { name: "Plotly", level: 80 },
      { name: "Excel", level: 75 },
      { name: "Alteryx", level: 65 },
 
    ]
  }
];


const Skills = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: 8,
        background: 'linear-gradient(165deg, #f0f7ff 0%, #ffffff 50%, #f0f7ff 100%)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(37, 99, 235, 0.05) 0%, transparent 50%)',
        },
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          align="center"
          sx={{
            mb: 6,
            position: 'relative',
            fontWeight: 700,
            color: '#1a365d',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
            '&:after': {
              content: '""',
              display: 'block',
              width: '60px',
              height: '4px',
              background: 'linear-gradient(90deg, #2563eb, #1d4ed8)',
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
                  >
                    <SkillIcon>
                      {category.icon}
                    </SkillIcon>
                  </Tooltip>

                  <Typography
                    variant="h6"
                    sx={{
                      mb: 3,
                      fontWeight: 600,
                      color: theme.palette.primary.main,
                      textAlign: 'center',
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
                        <Box sx={{ mb: 2 }}>
                          <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mb: 1,
                            alignItems: 'center'
                          }}>
                            <Typography variant="body2" color="text.secondary">
                              {skill.name}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ color: theme.palette.primary.main }}
                            >
                              {skill.level}%
                            </Typography>
                          </Box>
                          <StyledLinearProgress
                            variant="determinate"
                            value={skill.level}
                          />
                        </Box>
                      </motion.div>
                    ))}
                  </Box>
                </StyledCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Skills;

