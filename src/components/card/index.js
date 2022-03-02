import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import * as React from 'react';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard({ data, asset }) {
  console.log("data, asset", data, asset)
  return (
    <Card sx={{ minWidth: 275, m: 1, ml: 0 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {data.split('_').map(i => i.toUpperCase() + " ")}
        </Typography>
        <Typography variant="h5" component="div">
          {asset[data] && typeof asset[data] != 'object' ? asset[data] : "N/A"}
        </Typography>
      </CardContent>
    </Card>
  );
}
