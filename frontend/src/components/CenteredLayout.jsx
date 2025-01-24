'use client';

import { Box, Container } from '@mui/material';

const CenteredLayout = ({ children }) => {
  return (
    <Box 
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'background.default', 
        padding: 2, 
      }}
    >
      <Container maxWidth="md" sx={{ padding: 2 }}>
        {children}
      </Container>
    </Box>
  );
};

export default CenteredLayout;
