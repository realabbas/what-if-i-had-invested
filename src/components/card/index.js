import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import * as React from 'react';

export default function BasicCard({ data, asset }) {
  // console.log("data, asset", data, asset)
  const value = asset[data];
  return (
    <Card sx={{ minWidth: 275, m: 1, ml: 0 }}>
      <CardContent>
        <Typography sx={{ fontSize: 13 }} color="text.secondary" gutterBottom>
          {data.split('_').map(i => i.toUpperCase() + " ")}
        </Typography>
        <Typography variant="h6" component="div" sx={{ color: value < 0 ? "red" : "" }}>
          {value && typeof value != 'object' ? value : "N/A"}
        </Typography>
      </CardContent>
    </Card>
  );
}
