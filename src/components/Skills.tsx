import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  useTheme,
  Card,
  Tooltip,
  styled,
  Zoom,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import CloudIcon from '@mui/icons-material/Cloud';
import BarChartIcon from '@mui/icons-material/BarChart';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import BiotechIcon from '@mui/icons-material/Biotech';

// Match the theme from Projects component
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
      fontSize: '2.5rem', // Match Projects heading size
      marginBottom: '2rem',
    },
    h5: {
      fontWeight: 600,
      color: '#1e293b', // Darker text color to match Projects
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
      { name: "AWS Bedrock", level: 55 }
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
              mb: 6, // Match Projects spacing
              position: 'relative',
              color: '#1e293b', // Match Projects heading color
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
                        color: '#1e293b', // Darker text color to match Projects
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
                          <Box sx={{ mb: 2 }}>
                            <Box sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              mb: 1,
                              alignItems: 'center'
                            }}>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: '#64748b', // Lighter text color for skills
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
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Skills;
