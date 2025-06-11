import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ textAlign: 'center', py: 2, mt: 'auto', backgroundColor: '#f8fafc' }}>
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} Shamal Musthafa. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
