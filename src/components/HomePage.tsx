// HomePage.tsx
import React from 'react';
import {
    ThemeProvider,
    createTheme,
    CssBaseline,
    Container,
    Box,
    Typography,
    Button,
    useMediaQuery,
    Grid,
    Paper,
    IconButton,
    Tooltip,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Projects from './Projects';
import Skills from './Skills';
import Experience from './Experience';
import { LinkedIn, GitHub, Email, Download, Phone, LocationOn, WorkOutline, BoltOutlined, DescriptionOutlined } from '@mui/icons-material';

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
        h1: {
            fontSize: '3.5rem',
            fontWeight: 700,
            '@media (max-width:600px)': {
                fontSize: '2.5rem',
            },
        },
        h2: {
            fontWeight: 700,
            marginBottom: '2rem',
            fontSize: '2.5rem',
        },
        h4: {
            fontWeight: 600,
        },
        body1: {
            lineHeight: 1.7,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: 8,
                    padding: '12px 24px',
                    fontSize: '1rem',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                },
            },
        },
    },
});

const HomePage = () => {
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const scrollToSection = (sectionId: string) => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    };

    const contactInfo = [
        {
            icon: <Email />,
            label: 'Email',
            value: 'shamalmusthafa59@gmail.com',
            link: 'mailto:shamalmusthafa59@gmail.com',
        },
        {
            icon: <Phone />,
            label: 'Phone',
            value: '+91 7012464811',
            link: 'tel:+917012464811',
        },
        {
            icon: <LocationOn />,
            label: 'Location',
            value: 'Kannur, India',
            link: null,
        },
    ];

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            {/* Hero Section */}
            <Box
                sx={{
                    minHeight: '100vh',
                    background: 'linear-gradient(135deg, #f0f7ff 0%, #ffffff 50%, #f0f7ff 100%)',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
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
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={8}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <Typography
                                    variant="h1"
                                    sx={{
                                        background: 'linear-gradient(to right, #2563eb, #1d4ed8)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        mb: 2,
                                    }}
                                >
                                    Shamal Musthafa
                                </Typography>
                                <Typography
                                    variant="h4"
                                    sx={{ color: 'text.secondary', mb: 3 }}
                                >
                                    Data Scientist & AI Engineer
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{ color: 'text.secondary', mb: 4, maxWidth: 600 }}
                                >
                                    Data Scientist specializing in Generative AI, Machine Learning, and Cloud AI Solutions.
                                    Expert in LLMs, API development, and NLP techniques with experience in Azure AI,
                                    Virtex AI and Amazon bedrock .
                                </Typography>

                                {/* Social Links */}
                                <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
                                    {[
                                        { icon: <Email />, link: 'mailto:shamalmusthafa59@gmail.com' },
                                        { icon: <LinkedIn />, link: 'https://www.linkedin.com/in/shamalmusthafa/' },
                                        { icon: <GitHub />, link: 'https://github.com/Shamal119' },
                                    ].map((social, index) => (
                                        <IconButton
                                            key={index}
                                            href={social.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            sx={{
                                                color: 'primary.main',
                                                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(37, 99, 235, 0.2)',
                                                },
                                            }}
                                        >
                                            {social.icon}
                                        </IconButton>
                                    ))}
                                </Box>

                                {/* Action Buttons */}
                                
                                    <Grid
                                        container
                                        spacing={2}
                                        sx={{
                                            maxWidth: 'fit-content',
                                            p: 1,
                                            borderRadius: 3,
                                            backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                            backdropFilter: 'blur(10px)',
                                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                                        }}
                                    >
                                        <Grid item>
                                            <Button
                                                variant="contained"
                                                size="large"
                                                onClick={() => scrollToSection('projects')}
                                                startIcon={<WorkOutline />} // Add icon
                                                sx={{
                                                    background: 'linear-gradient(45deg, #2563eb 30%, #1d4ed8 90%)',
                                                    boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)',
                                                    px: 4,
                                                    py: 1.5,
                                                    '&:hover': {
                                                        background: 'linear-gradient(45deg, #1d4ed8 30%, #1e40af 90%)',
                                                        transform: 'translateY(-2px)',
                                                        boxShadow: '0 6px 8px -1px rgba(37, 99, 235, 0.3)',
                                                    },
                                                    transition: 'all 0.2s ease-in-out',
                                                }}
                                            >
                                                <Typography sx={{ fontWeight: 600 }}>
                                                    Projects
                                                </Typography>
                                            </Button>
                                        </Grid>

                                        <Grid item>
                                            <Button
                                                variant="outlined"
                                                size="large"
                                                onClick={() => scrollToSection('skills')}
                                                startIcon={<BoltOutlined />} // Add icon
                                                sx={{
                                                    borderColor: 'primary.main',
                                                    borderWidth: 2,
                                                    px: 4,
                                                    py: 1.5,
                                                    '&:hover': {
                                                        borderColor: 'primary.dark',
                                                        backgroundColor: 'rgba(37, 99, 235, 0.05)',
                                                        transform: 'translateY(-2px)',
                                                        boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.1)',
                                                    },
                                                    transition: 'all 0.2s ease-in-out',
                                                }}
                                            >
                                                <Typography sx={{ fontWeight: 600 }}>
                                                    Skills
                                                </Typography>
                                            </Button>
                                        </Grid>

                                        <Grid item>
                                            <Button
                                                variant="contained"
                                                size="large"
                                                startIcon={<DescriptionOutlined />} // Changed icon
                                                onClick={() => navigate('/resume')}
                                                sx={{
                                                    background: 'linear-gradient(45deg, #2563eb 30%, #1d4ed8 90%)',
                                                    boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)',
                                                    px: 4,
                                                    py: 1.5,
                                                    '&:hover': {
                                                        background: 'linear-gradient(45deg, #1d4ed8 30%, #1e40af 90%)',
                                                        transform: 'translateY(-2px)',
                                                        boxShadow: '0 6px 8px -1px rgba(37, 99, 235, 0.3)',
                                                    },
                                                    transition: 'all 0.2s ease-in-out',
                                                }}
                                            >
                                                <Typography sx={{ fontWeight: 600 }}>
                                                    Resume
                                                </Typography>
                                            </Button>
                                        </Grid>
                                    </Grid>

                                </motion.div>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Projects Section */}
            <Box id="projects" sx={{ py: 8 }}>
                <Projects />
            </Box>

            {/* Skills Section */}
            <Box id="skills" sx={{ py: 8, backgroundColor: 'rgba(37, 99, 235, 0.02)' }}>
                <Skills />
            </Box>

            {/* Experience Section */}
            <Box id="experience" sx={{ py: 8 }}>
                <Experience />
            </Box>

            {/* Contact Section */}
            <Box
                id="contact"
                sx={{
                    py: 8,
                    background: 'linear-gradient(to bottom, #f0f7ff, #ffffff)',
                }}
            >
                <Container maxWidth="md">
                    <Typography
                        variant="h2"
                        align="center"
                        sx={{
                            mb: 4,
                            position: 'relative',
                            '&:after': {
                                content: '""',
                                display: 'block',
                                width: '60px',
                                height: '4px',
                                background: theme.palette.primary.main,
                                margin: '1rem auto',
                            },
                        }}
                    >
                        Get In Touch
                    </Typography>

                    <Grid container spacing={3} justifyContent="center">
                        {contactInfo.map((info, index) => (
                            <Grid item xs={12} sm={4} key={index}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 3,
                                        textAlign: 'center',
                                        height: '100%',
                                        backgroundColor: 'rgba(37, 99, 235, 0.02)',
                                        transition: 'transform 0.2s',
                                        '&:hover': {
                                            transform: 'translateY(-5px)',
                                        },
                                    }}
                                >
                                    <IconButton
                                        sx={{
                                            backgroundColor: 'rgba(37, 99, 235, 0.1)',
                                            mb: 2,
                                            '&:hover': {
                                                backgroundColor: 'rgba(37, 99, 235, 0.2)',
                                            },
                                        }}
                                        component={info.link ? 'a' : 'button'}
                                        href={info.link || undefined}
                                    >
                                        {info.icon}
                                    </IconButton>
                                    <Typography variant="h6" gutterBottom>
                                        {info.label}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        {info.value}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default HomePage;