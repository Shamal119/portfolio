import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  useTheme,
  useMediaQuery,
  Button,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close,
  Home,
  Work,
  Code,
  School,
  ContactMail,
  Description,
  Chat,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  onNavigate: (section: string) => void;
  onChatToggle?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, onChatToggle }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const menuItems = [
    { icon: <Home />, label: 'Home', section: 'hero' },
    { icon: <Work />, label: 'Experience', section: 'experience' },
    { icon: <Code />, label: 'Projects', section: 'projects' },
    { icon: <School />, label: 'Skills', section: 'skills' },
    { icon: <School />, label: 'Certifications', section: 'certifications' },
    { icon: <ContactMail />, label: 'Contact', section: 'contact' },
    { icon: <Description />, label: 'Resume', section: 'resume' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (section: string) => {
    onNavigate(section);
    setIsDrawerOpen(false);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: isScrolled
            ? 'rgba(255, 255, 255, 0.95)'
            : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: isScrolled ? '1px solid rgba(37, 99, 235, 0.1)' : 'none',
          transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          zIndex: 1100,
          boxShadow: isScrolled 
            ? '0 4px 20px rgba(37, 99, 235, 0.1)' 
            : '0 2px 10px rgba(0, 0, 0, 0.05)',
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            px: { xs: 2, sm: 3, md: 4 },
            minHeight: { xs: '64px', sm: '70px' },
          }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h6"
              component="div"
              onClick={() => handleNavigation('hero')}
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(45deg, #2563eb 30%, #1d4ed8 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                cursor: 'pointer',
                fontSize: { xs: '1.25rem', sm: '1.5rem' },
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              Shamal Musthafa
            </Typography>
          </motion.div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {menuItems.slice(0, -1).map((item, index) => (
                <motion.div
                  key={item.section}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Button
                    onClick={() => handleNavigation(item.section)}
                    sx={{
                      color: 'text.primary',
                      fontWeight: 600,
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      textTransform: 'none',
                      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.1), transparent)',
                        transition: 'left 0.5s ease',
                      },
                      '&:hover': {
                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                        color: 'primary.main',
                        transform: 'translateY(-2px) scale(1.05)',
                        boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
                      },
                      '&:hover::before': {
                        left: '100%',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                </motion.div>
              ))}
              
              {/* Resume Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <Button
                  variant="contained"
                  onClick={() => navigate('/resume')}
                  startIcon={<Description />}
                  sx={{
                    ml: 1,
                    background: 'linear-gradient(45deg, #2563eb 30%, #1d4ed8 90%)',
                    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
                    borderRadius: 2,
                    px: 3,
                    textTransform: 'none',
                    fontWeight: 600,
                    '&:hover': {
                      background: 'linear-gradient(45deg, #1d4ed8 30%, #1e40af 90%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 16px rgba(37, 99, 235, 0.4)',
                    },
                  }}
                >
                  Resume
                </Button>
              </motion.div>

              {/* Chat Button */}
              {onChatToggle && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <IconButton
                    onClick={onChatToggle}
                    sx={{
                      ml: 1,
                      backgroundColor: 'rgba(37, 99, 235, 0.1)',
                      color: 'primary.main',
                      '&:hover': {
                        backgroundColor: 'primary.main',
                        color: 'white',
                        transform: 'scale(1.1)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <Chat />
                  </IconButton>
                </motion.div>
              )}
            </Box>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <IconButton
                onClick={toggleDrawer}
                sx={{
                  color: 'primary.main',
                  backgroundColor: 'rgba(37, 99, 235, 0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(37, 99, 235, 0.2)',
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {isDrawerOpen ? <Close /> : <MenuIcon />}
              </IconButton>
            </motion.div>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
            backdropFilter: 'blur(20px)',
          },
        }}
      >
        <Box sx={{ pt: 8, pb: 2 }}>
          <List>
            {menuItems.map((item, index) => (
              <motion.div
                key={item.section}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ListItem
                  component="button"
                  onClick={() => handleNavigation(item.section)}
                  sx={{
                    py: 2,
                    px: 3,
                    mb: 1,
                    mx: 2,
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(37, 99, 235, 0.1)',
                      transform: 'translateX(-5px)',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: 'primary.main',
                      minWidth: 40,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    sx={{
                      '& .MuiListItemText-primary': {
                        fontWeight: 600,
                        color: 'text.primary',
                      },
                    }}
                  />
                </ListItem>
              </motion.div>
            ))}
          </List>

          {/* Mobile Chat Button */}
          {onChatToggle && (
            <Box sx={{ px: 3, mt: 2 }}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  onChatToggle();
                  setIsDrawerOpen(false);
                }}
                startIcon={<Chat />}
                sx={{
                  background: 'linear-gradient(45deg, #2563eb 30%, #1d4ed8 90%)',
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1d4ed8 30%, #1e40af 90%)',
                  },
                }}
              >
                Chat with AI
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
