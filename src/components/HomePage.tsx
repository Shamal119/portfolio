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
import {
    LinkedIn,
    GitHub,
    Email,
    Download,
    Phone,
    LocationOn,
    WorkOutline,
    BoltOutlined,
    DescriptionOutlined
} from '@mui/icons-material';
import { useInView } from 'react-intersection-observer';
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
            '@media (max-width:600px)': {
                fontSize: '2.5rem',
            },
        },
        h2: {
            fontWeight: 700,
            fontSize: '2.5rem',
            marginBottom: '2rem',
        },
        h4: {
            fontWeight: 600,
        },
        body1: {
            lineHeight: 1.8,
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
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

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

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                duration: 0.5,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            {/* Hero Section */}
            <Box
                component={motion.div}
                initial="hidden"
                animate="visible"
                variants={containerVariants}
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
                        backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(37, 99, 235, 0.08) 0%, transparent 60%)',
                        animation: 'pulse 8s ease-in-out infinite',
                    },
                    '@keyframes pulse': {
                        '0%, 100%': { opacity: 0.5 },
                        '50%': { opacity: 0.8 },
                    },
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={8}>
                            <motion.div variants={itemVariants}>
                                <Typography
                                    variant="h1"
                                    sx={{
                                        background: 'linear-gradient(45deg, #2563eb 30%, #1d4ed8 90%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        mb: 2,
                                        filter: 'drop-shadow(0 2px 4px rgba(37, 99, 235, 0.2))',
                                    }}
                                >
                                    Shamal Musthafa
                                </Typography>

                                <Typography
                                    variant="h4"
                                    sx={{
                                        color: 'text.secondary',
                                        mb: 3,
                                        position: 'relative',
                                        '&::after': {
                                            content: '""',
                                            position: 'absolute',
                                            bottom: -8,
                                            left: 0,
                                            width: '60px',
                                            height: '3px',
                                            background: 'linear-gradient(90deg, #2563eb, transparent)',
                                        },
                                    }}
                                >
                                    Data Scientist & AI Engineer
                                </Typography>

                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: 'text.secondary',
                                        mb: 4,
                                        maxWidth: 600,
                                        lineHeight: 1.8,
                                    }}
                                >
                                    Data Scientist specializing in Generative AI, Machine Learning, and Cloud AI Solutions.
                                    Expert in LLMs, API development, and NLP techniques with experience in Azure AI,
                                    Virtex AI and Other AI tools.
                                </Typography>

                                {/* Social Links */}
                                <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
                                    {[
                                        { icon: <Email />, link: 'mailto:shamalmusthafa59@gmail.com', label: 'Email' },
                                        { icon: <LinkedIn />, link: 'https://www.linkedin.com/in/shamalmusthafa/', label: 'LinkedIn' },
                                        { icon: <GitHub />, link: 'https://github.com/Shamal119', label: 'GitHub' },
                                    ].map((social, index) => (
                                        <motion.div
                                            key={index}
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Tooltip title={social.label} placement="top">
                                                <IconButton
                                                    href={social.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    sx={{
                                                        color: 'primary.main',
                                                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                                                        backdropFilter: 'blur(4px)',
                                                        '&:hover': {
                                                            backgroundColor: 'primary.main',
                                                            color: 'white',
                                                            transform: 'translateY(-2px)',
                                                            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
                                                        },
                                                    }}
                                                >
                                                    {social.icon}
                                                </IconButton>
                                            </Tooltip>
                                        </motion.div>
                                    ))}
                                </Box>

                                {/* Action Buttons */}
                                <motion.div variants={itemVariants}>
                                    <Grid
                                        container
                                        spacing={2}
                                        sx={{
                                            maxWidth: 'fit-content',
                                            p: 1.5,
                                            borderRadius: 4,
                                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                            backdropFilter: 'blur(10px)',
                                            boxShadow: '0 8px 32px rgba(37, 99, 235, 0.1)',
                                        }}
                                    >
                                        <Grid item>
                                            <motion.div whileHover={{ scale: 1.02 }}>
                                                <Button
                                                    variant="outlined"
                                                    size="large"
                                                    onClick={() => scrollToSection('experience')}
                                                    startIcon={<WorkOutline />}
                                                    sx={{
                                                        borderColor: 'primary.main',
                                                        borderWidth: 2,
                                                        '&:hover': {
                                                            borderColor: 'primary.dark',
                                                            backgroundColor: 'rgba(37, 99, 235, 0.05)',
                                                            transform: 'translateY(-2px)',
                                                            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.1)',
                                                        },
                                                    }}
                                                >
                                                    <Typography sx={{ fontWeight: 600 }}>
                                                        Experience
                                                    </Typography>
                                                </Button>
                                            </motion.div>
                                        </Grid>
                                        <Grid item>
                                            <motion.div whileHover={{ scale: 1.02 }}>
                                                <Button
                                                    variant="contained"
                                                    size="large"
                                                    onClick={() => scrollToSection('projects')}
                                                    startIcon={<CodeIcon />}
                                                    sx={{
                                                        background: 'linear-gradient(45deg, #2563eb 30%, #1d4ed8 90%)',
                                                        boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
                                                        '&:hover': {
                                                            background: 'linear-gradient(45deg, #1d4ed8 30%, #1e40af 90%)',
                                                            transform: 'translateY(-2px)',
                                                            boxShadow: '0 8px 16px rgba(37, 99, 235, 0.3)',
                                                        },
                                                    }}
                                                >
                                                    <Typography sx={{ fontWeight: 600 }}>
                                                        Projects
                                                    </Typography>
                                                </Button>
                                            </motion.div>
                                        </Grid>

                                        <Grid item>
                                            <motion.div whileHover={{ scale: 1.02 }}>
                                                <Button
                                                    variant="outlined"
                                                    size="large"
                                                    onClick={() => scrollToSection('skills')}
                                                    startIcon={<BoltOutlined />}
                                                    sx={{
                                                        borderColor: 'primary.main',
                                                        borderWidth: 2,
                                                        '&:hover': {
                                                            borderColor: 'primary.dark',
                                                            backgroundColor: 'rgba(37, 99, 235, 0.05)',
                                                            transform: 'translateY(-2px)',
                                                            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.1)',
                                                        },
                                                    }}
                                                >
                                                    <Typography sx={{ fontWeight: 600 }}>
                                                        Skills
                                                    </Typography>
                                                </Button>
                                            </motion.div>
                                        </Grid>

                                        <Grid item>
                                            <motion.div whileHover={{ scale: 1.02 }}>
                                                <Button
                                                    variant="contained"
                                                    size="large"
                                                    onClick={() => navigate('/resume')}
                                                    startIcon={<DescriptionOutlined />}
                                                    sx={{
                                                        background: 'linear-gradient(45deg, #2563eb 30%, #1d4ed8 90%)',
                                                        boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
                                                        '&:hover': {
                                                            background: 'linear-gradient(45deg, #1d4ed8 30%, #1e40af 90%)',
                                                            transform: 'translateY(-2px)',
                                                            boxShadow: '0 8px 16px rgba(37, 99, 235, 0.3)',
                                                        },
                                                    }}
                                                >
                                                    <Typography sx={{ fontWeight: 600 }}>
                                                        Resume
                                                    </Typography>
                                                </Button>
                                            </motion.div>
                                        </Grid>
                                    </Grid>
                                </motion.div>
                            </motion.div>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Other Sections */}
            <motion.div
                ref={ref}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={containerVariants}
            >

                {/* Experience Section */}
                <Box id="experience" sx={{ py: 8 }}>
                    <Experience />
                </Box>
                {/* Projects Section */}
                <Box id="projects" sx={{ py: 8 }}>
                    <Projects />
                </Box>

                {/* Skills Section */}
                <Box id="skills" sx={{
                    py: 8,
                    backgroundColor: 'rgba(37, 99, 235, 0.02)',
                    position: 'relative',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '100%',
                        backgroundImage: 'radial-gradient(circle at 70% 50%, rgba(37, 99, 235, 0.05) 0%, transparent 70%)',
                    },
                }}>
                    <Skills />
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
                        <motion.div variants={itemVariants}>
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
                                        background: 'linear-gradient(90deg, #2563eb, #1d4ed8)',
                                        margin: '1rem auto',
                                        borderRadius: '2px',
                                    },
                                }}
                            >
                                Get In Touch
                            </Typography>
                        </motion.div>

                        <Grid container spacing={3} justifyContent="center">
                            {contactInfo.map((info, index) => (
                                <Grid item xs={12} sm={4} key={index}>
                                    <motion.div
                                        variants={itemVariants}
                                        whileHover={{
                                            y: -5,
                                            transition: { duration: 0.2 }
                                        }}
                                    >
                                        <Paper
                                            elevation={0}
                                            sx={{
                                                p: 3,
                                                textAlign: 'center',
                                                height: '100%',
                                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                                backdropFilter: 'blur(10px)',
                                                boxShadow: '0 4px 20px rgba(37, 99, 235, 0.1)',
                                                border: '1px solid rgba(37, 99, 235, 0.1)',
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                                    boxShadow: '0 8px 30px rgba(37, 99, 235, 0.15)',
                                                },
                                            }}
                                        >
                                            <motion.div
                                                whileHover={{ scale: 1.1 }}
                                                transition={{ duration: 0.2 }}
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
                                                        transition: 'all 0.3s ease',
                                                        '&:hover': {
                                                            backgroundColor: 'primary.main',
                                                            color: 'white',
                                                            transform: 'rotate(8deg)',
                                                        },
                                                    }}
                                                >
                                                    {info.icon}
                                                </IconButton>
                                            </motion.div>

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
                                    </motion.div>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>
            </motion.div>

            {/* Scroll to Top Button */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                style={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    zIndex: 1000,
                }}
            >
                <Tooltip title="Scroll to Top" placement="left">
                    <IconButton
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        sx={{
                            backgroundColor: 'primary.main',
                            color: 'white',
                            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
                            '&:hover': {
                                backgroundColor: 'primary.dark',
                                transform: 'translateY(-2px)',
                            },
                            transition: 'all 0.3s ease',
                            width: 48,
                            height: 48,
                        }}
                    >
                        <motion.div
                            animate={{
                                y: [0, -4, 0],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <WorkOutline />
                        </motion.div>
                    </IconButton>
                </Tooltip>
            </motion.div>
        </ThemeProvider>
    );
};

export default HomePage;