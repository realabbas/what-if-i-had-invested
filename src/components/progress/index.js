import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import * as React from 'react';

export default function LinearIndeterminate({loading}) {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress  />
    </Box>
  );
}
