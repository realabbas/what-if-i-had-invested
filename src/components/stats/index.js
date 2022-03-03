import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';
import Card from '../../components/card';

const Stats = ({ asset }) => {
    // console.log("asset", asset, Object.keys(asset))
    let temp = JSON.parse(JSON.stringify(asset))
    delete temp.image
    delete temp.id
    let array = Object.keys(temp)

    const rows = [...Array(Math.ceil(array.length / 4))];
    const productRows = rows.map((row, idx) => array.slice(idx * 4, idx * 4 + 4));
    const content = productRows.map((row, idx) => (
        <Grid container key={idx} spacing={2}>
            {row.map(product =>
                <Grid item xs={12} sm={6} md={3} lg={3}>
                    <Card data={product} asset={asset} />
                </Grid>)}
        </Grid>)
    );
    return (<>
        <Typography variant="h6" component="div">
            Latest Stats
        </Typography>
        {content}</>
    );
}
export default Stats;