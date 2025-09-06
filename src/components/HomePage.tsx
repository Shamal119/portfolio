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
    Paper,
    IconButton,
    Tooltip,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Projects from './Projects';
import Skills from './Skills';
import Experience from './Experience';
import Certifications from './Certifications';
import {
    LinkedIn,
    GitHub,
    Email,
    Phone,
    LocationOn,
    WorkOutline,
    BoltOutlined,
    DescriptionOutlined,
    School as SchoolIcon
} from '@mui/icons-material';
import { Code as CodeIcon } from '@mui/icons-material';
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
            fontWeight: 800,
            '@media (max-width:768px)': {
                fontSize: '2.8rem',
            },
            '@media (max-width:600px)': {
                fontSize: '2.2rem',
            },
            '@media (max-width:480px)': {
                fontSize: '1.8rem',
            },
        },
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
        h4: {
            fontWeight: 600,
            '@media (max-width:768px)': {
                fontSize: '1.3rem',
            },
            '@media (max-width:600px)': {
                fontSize: '1.1rem',
            },
        },
        body1: {
            lineHeight: 1.8,
            '@media (max-width:768px)': {
                fontSize: '0.95rem',
            },
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: 12,
                    padding: '14px 28px',
                    fontSize: '1rem',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '@media (max-width:768px)': {
                        padding: '12px 20px',
                        fontSize: '0.9rem',
                        minHeight: '44px',
                    },
                    '@media (max-width:600px)': {
                        padding: '10px 16px',
                        fontSize: '0.85rem',
                        minHeight: '40px',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                },
            },
        },
    },
});

const HomePage = () => {
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const scrollToSection = (sectionId: string) => {
        if (sectionId === 'hero') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (sectionId === 'resume') {
            navigate('/resume');
        } else {
            const element = document.getElementById(sectionId);
            if (element) {
                const headerHeight = 70;
                const elementPosition = element.offsetTop - headerHeight;
                window.scrollTo({
                    top: elementPosition,
                    behavior: 'smooth'
                });
            }
        }
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

    // Simple animation variants
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: "easeOut" }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            {/* Hero Section */}
            <Box
                id="hero"
                component="section"
                sx={{
                    minHeight: { xs: 'calc(100vh - 70px)', sm: 'calc(100vh - 70px)' },
                    background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f0f7ff 100%)',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    pt: { xs: 4, sm: 6 },
                    pb: { xs: 6, sm: 8 },
                }}
            >
                <Container maxWidth="lg">
                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                    >
                        <Box sx={{ 
                            textAlign: { xs: 'center', md: 'left' },
                            maxWidth: { xs: '100%', md: '800px' },
                            mx: 'auto'
                        }}>
                            <motion.div variants={fadeInUp}>
                                <Typography
                                    variant="h1"
                                    sx={{
                                        background: 'linear-gradient(45deg, #2563eb 30%, #1d4ed8 90%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        mb: 2,
                                        fontWeight: 800,
                                    }}
                                >
                                    Shamal Musthafa
                                </Typography>
                            </motion.div>

                            <motion.div variants={fadeInUp}>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        color: 'text.secondary',
                                        mb: 3,
                                        fontWeight: 600,
                                    }}
                                >
                                    Data Scientist | Generative AI & Business Intelligence
                                </Typography>
                            </motion.div>

                            <motion.div variants={fadeInUp}>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: 'text.secondary',
                                        mb: 4,
                                        lineHeight: 1.7,
                                        fontSize: { xs: '1rem', sm: '1.125rem' },
                                    }}
                                >
                                    A Data Scientist with over two years of experience delivering end-to-end data solutions. 
                                    Core competencies include automating complex data workflows with Alteryx, developing 
                                    advanced Generative AI and LLM applications using Python, and translating data into 
                                    actionable insights through dynamic visualizations in Tableau and Power BI.
                                </Typography>
                            </motion.div>

                            {/* Social Links */}
                            <motion.div variants={fadeInUp}>
                                <Box sx={{ 
                                    mb: 4, 
                                    display: 'flex', 
                                    gap: 2,
                                    justifyContent: { xs: 'center', md: 'flex-start' }
                                }}>
                                    {[
                                        { icon: <Email />, link: 'mailto:shamalmusthafa59@gmail.com', label: 'Email' },
                                        { icon: <LinkedIn />, link: 'https://www.linkedin.com/in/shamalmusthafa/', label: 'LinkedIn' },
                                        { icon: <GitHub />, link: 'https://github.com/Shamal119', label: 'GitHub' },
                                    ].map((social, index) => (
                                        <Tooltip key={index} title={social.label} placement="top">
                                            <IconButton
                                                href={social.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                sx={{
                                                    color: 'primary.main',
                                                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                                                    '&:hover': {
                                                        backgroundColor: 'primary.main',
                                                        color: 'white',
                                                        transform: 'translateY(-2px)',
                                                        boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
                                                    },
                                                    transition: 'all 0.3s ease',
                                                }}
                                            >
                                                {social.icon}
                                            </IconButton>
                                        </Tooltip>
                                    ))}
                                </Box>
                            </motion.div>

                            {/* Action Buttons */}
                            <motion.div variants={fadeInUp}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: { xs: 2, sm: 3 },
                                        justifyContent: { xs: 'center', md: 'flex-start' },
                                        alignItems: 'center',
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        size="large"
                                        onClick={() => scrollToSection('projects')}
                                        startIcon={<CodeIcon />}
                                        sx={{
                                            background: 'linear-gradient(45deg, #2563eb 30%, #1d4ed8 90%)',
                                            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
                                            px: { xs: 2, sm: 3 },
                                            py: 1.5,
                                            fontWeight: 600,
                                            textTransform: 'none',
                                            '&:hover': {
                                                background: 'linear-gradient(45deg, #1d4ed8 30%, #1e40af 90%)',
                                                transform: 'translateY(-2px)',
                                                boxShadow: '0 6px 16px rgba(37, 99, 235, 0.4)',
                                            },
                                        }}
                                    >
                                        View Projects
                                    </Button>

                                    <Button
                                        variant="outlined"
                                        size="large"
                                        onClick={() => scrollToSection('experience')}
                                        startIcon={<WorkOutline />}
                                        sx={{
                                            borderColor: 'primary.main',
                                            borderWidth: 2,
                                            px: { xs: 2, sm: 3 },
                                            py: 1.5,
                                            fontWeight: 600,
                                            textTransform: 'none',
                                            '&:hover': {
                                                borderColor: 'primary.dark',
                                                backgroundColor: 'rgba(37, 99, 235, 0.05)',
                                                transform: 'translateY(-2px)',
                                            },
                                        }}
                                    >
                                        Experience
                                    </Button>

                                    <Button
                                        variant="contained"
                                        size="large"
                                        onClick={() => navigate('/resume')}
                                        startIcon={<DescriptionOutlined />}
                                        sx={{
                                            background: 'linear-gradient(45deg, #2563eb 30%, #1d4ed8 90%)',
                                            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
                                            px: { xs: 2, sm: 3 },
                                            py: 1.5,
                                            fontWeight: 600,
                                            textTransform: 'none',
                                            '&:hover': {
                                                background: 'linear-gradient(45deg, #1d4ed8 30%, #1e40af 90%)',
                                                transform: 'translateY(-2px)',
                                                boxShadow: '0 6px 16px rgba(37, 99, 235, 0.4)',
                                            },
                                        }}
                                    >
                                        Resume
                                    </Button>
                                </Box>
                            </motion.div>
                        </Box>
                    </motion.div>
                </Container>
            </Box>

            {/* Experience Section */}
            <Box id="experience" component="section" sx={{ py: { xs: 6, md: 8 } }}>
                <Experience />
            </Box>

            {/* Projects Section */}
            <Box id="projects" component="section" sx={{ py: { xs: 6, md: 8 } }}>
                <Projects />
            </Box>

            {/* Skills Section */}
            <Box 
                id="skills" 
                component="section"
                sx={{
                    py: { xs: 6, md: 8 },
                    backgroundColor: 'rgba(37, 99, 235, 0.02)',
                }}
            >
                <Skills />
            </Box>

            {/* Certifications Section */}
            <Box id="certifications" component="section" sx={{ py: { xs: 6, md: 8 } }}>
                <Certifications />
            </Box>



            {/* Contact Section */}
            <Box
                id="contact"
                component="section"
                sx={{
                    py: { xs: 6, md: 8 },
                    background: 'linear-gradient(to bottom, #f8fafc, #ffffff)',
                }}
            >
                <Container maxWidth="md">
                    <Typography
                        variant="h2"
                        align="center"
                        sx={{
                            mb: { xs: 4, md: 6 },
                            fontWeight: 700,
                        }}
                    >
                        Get In Touch
                    </Typography>

                    <Box sx={{ 
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
                        gap: { xs: 3, sm: 4 },
                    }}>
                        {contactInfo.map((info, index) => (
                            <Paper
                                key={index}
                                elevation={0}
                                sx={{
                                    p: 3,
                                    textAlign: 'center',
                                    height: '100%',
                                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                    border: '1px solid rgba(37, 99, 235, 0.1)',
                                    borderRadius: 3,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 1)',
                                        boxShadow: '0 8px 30px rgba(37, 99, 235, 0.15)',
                                        transform: 'translateY(-4px)',
                                    },
                                }}
                            >
                                <IconButton
                                    component={info.link ? 'a' : 'button'}
                                    href={info.link || undefined}
                                    target={info.link ? '_blank' : undefined}
                                    rel={info.link ? 'noopener noreferrer' : undefined}
                                    sx={{
                                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                                        color: 'primary.main',
                                        mb: 2,
                                        width: 56,
                                        height: 56,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: 'primary.main',
                                            color: 'white',
                                            transform: 'scale(1.1)',
                                        },
                                    }}
                                >
                                    {info.icon}
                                </IconButton>

                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    sx={{
                                        fontWeight: 600,
                                        color: 'primary.main',
                                    }}
                                >
                                    {info.label}
                                </Typography>

                                <Typography
                                    color="text.secondary"
                                    sx={{
                                        fontSize: '0.95rem',
                                        lineHeight: 1.6,
                                    }}
                                >
                                    {info.value}
                                </Typography>
                            </Paper>
                        ))}
                    </Box>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default HomePage;