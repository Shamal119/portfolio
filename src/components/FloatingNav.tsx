import React, { useState, useEffect } from 'react';
import {
  Box,
  Fab,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Tooltip,
  IconButton,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home,
  Work,
  Code,
  School,
  ContactMail,
  Description,
  Close,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

interface FloatingNavProps {
  onNavigate: (section: string) => void;
}

const FloatingNav: React.FC<FloatingNavProps> = ({ onNavigate }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
      const scrollTop = window.pageYOffset;
      setIsVisible(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (section: string) => {
    onNavigate(section);
    handleMenuClose();
  };

  if (isMobile) {
    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              bottom: '1rem',
              right: '1rem',
              zIndex: 1000,
            }}
          >
            <Fab
              color="primary"
              onClick={handleMenuOpen}
              sx={{
                background: 'linear-gradient(45deg, #2563eb 30%, #1d4ed8 90%)',
                boxShadow: '0 8px 20px rgba(37, 99, 235, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1d4ed8 30%, #1e40af 90%)',
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              {anchorEl ? <Close /> : <MenuIcon />}
            </Fab>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              PaperProps={{
                sx: {
                  borderRadius: '16px',
                  mt: 1,
                  minWidth: 200,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                },
              }}
            >
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.section}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <MenuItem
                    onClick={() => handleNavigation(item.section)}
                    sx={{
                      py: 1.5,
                      px: 2,
                      '&:hover': {
                        backgroundColor: 'rgba(37, 99, 235, 0.08)',
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.label} />
                  </MenuItem>
                </motion.div>
              ))}
            </Menu>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            top: '50%',
            right: '1rem',
            transform: 'translateY(-50%)',
            zIndex: 1000,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              p: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            {menuItems.map((item, index) => (
              <motion.div
                key={item.section}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <Tooltip title={item.label} placement="left" arrow>
                  <IconButton
                    onClick={() => handleNavigation(item.section)}
                    sx={{
                      width: 48,
                      height: 48,
                      color: 'primary.main',
                      backgroundColor: 'transparent',
                      '&:hover': {
                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                        transform: 'scale(1.1)',
                      },
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    {item.icon}
                  </IconButton>
                </Tooltip>
              </motion.div>
            ))}
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingNav;
