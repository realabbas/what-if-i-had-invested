import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import * as React from 'react';

export default function BasicSelect({ assetList, selectAsset }) {
    const [selectedAsset, setSelectedAsset] = React.useState('Select');

    const handleChange = (event) => {
        setSelectedAsset(event.target.value);
        selectAsset(event.target.value)
    };

    const renderItem = (name, image_uri) => {
        return <Stack direction="row" spacing={2}>
            <Avatar
                alt={name}
                src={image_uri}
                sx={{ width: 24, height: 24 }}
            />
            <Typography>
                {name}
            </Typography>
        </Stack>
    }

    return (
        <FormControl sx={{ width: 200 }}>
            <InputLabel id="demo-simple-select-label">Cryptocurrency</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedAsset}
                label="Cryptocurrency"
                onChange={handleChange}
            >
                {assetList ? assetList.map((i, j) => {
                    return <MenuItem value={i}>
                        {renderItem(i.name, i.image)}
                    </MenuItem>

                }) : null}
            </Select>
        </FormControl>
    );
}
