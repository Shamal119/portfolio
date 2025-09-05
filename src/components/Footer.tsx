import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        textAlign: 'center',
        padding: { xs: '1rem 0.5rem', sm: '1rem' },
        marginTop: 'auto',
        backgroundColor: 'rgba(37, 99, 235, 0.02)',
        borderTop: '1px solid rgba(37, 99, 235, 0.1)',
      }}
    >
      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          fontSize: { xs: '0.8rem', sm: '0.9rem' },
        }}
      >
        © {new Date().getFullYear()} Shamal Musthafa. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
