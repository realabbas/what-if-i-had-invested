import Grid from '@mui/material/Grid';
import React from 'react';
import Card from '../../components/card';

const Stats = ({ asset }) => {
    console.log("asset", asset, Object.keys(asset))
    delete asset.image
    delete asset.id

    let array = Object.keys(asset)

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
    return content;
}
export default Stats;