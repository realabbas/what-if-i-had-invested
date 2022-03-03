import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import * as React from 'react';

export default function BasicCard({ data, value, backgroundColor, color }) {
  console.log("data, value", data, value)
  return (
    <Card sx={{ minWidth: 275, m: 1, ml: 0, backgroundColor }}>
      <CardContent>
        <Typography sx={{ fontSize: 13, color: backgroundColor ? "#FFF" : "" }} color="text.secondary" gutterBottom>
          {data.split('_').map(i => i.toUpperCase() + " ")}
        </Typography>
        <Typography variant="h6" component="div"
          sx={{ color: value < 0 ? "#E23737" : backgroundColor && !color ? "rgb(194,225,254)" : backgroundColor && color ? color : "" }}>
          {value && typeof value != 'object' ? value : "N/A"}
        </Typography>
      </CardContent>
    </Card>
  );
}
