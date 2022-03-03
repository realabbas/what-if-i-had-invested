/* eslint-disable */
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux';
import Select from '../../components/select';
import Stats from '../../components/stats';
import * as calls from './store/calls';

const Home = () => {

    const dispatch = useDispatch();
    const appState = useSelector((state) => state.app)
    const [selectedAsset, setSelectedAsset] = useState(null)
    const [startDate, setStartDate] = useState(new Date());
    const [investedValue, setInvestedValue] = useState(500)

    const blockchain = "ethereum"
    const address = "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce"
    const currency = "inr"

    console.log("selectedAsset", selectedAsset)

    const formatDate = (date) => {
        let today = date;
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        const yyyy = today.getFullYear();
        if (dd < 10) {
            dd = "0" + dd;
        }
        if (mm < 10) {
            mm = "0" + mm;
        }
        today = dd + "-" + mm + "-" + yyyy;
        return today;
    };

    React.useEffect(async () => {
        // dispatch(calls.getTokenPriceByAddress(blockchain, address, currency))
        // dispatch(calls.getHistory("bitcoin", "02-03-2022"))
        if (!appState.supportedCurriencies) {
            dispatch(calls.getSupportedCurriencies())
        }
        // if (!appState.assetList) {
        dispatch(calls.getAllAssets(100, 1, appState.currency))
        // }

    }, [])

    console.log(startDate, formatDate(startDate))

    const compute = () => {
        const past_price = appState.assetHistory.market_data.current_price.usd;
        const current_price = selectedAsset.current_price
        const percentageDifference = (((current_price - past_price) / past_price) * 100)
        return {
            past_price,
            current_price,
            difference: (current_price - past_price),
            percentageDifference,
            multiplier: investedValue * (1 + (percentageDifference / 100)),
            investedValue: percentageDifference > 0 ? investedValue + (parseFloat(investedValue) * percentageDifference) / 100 :
                investedValue + (parseFloat(investedValue) * percentageDifference) / 100
        }
    }


    return (
        <div style={{ margin: "1em" }}>

            {/* <Select
                currency={true}
                label="Currency"
                data={appState.supportedCurriencies ? appState.supportedCurriencies.sort() : null}
                action={(currency) => dispatch(actions.changeState({ currency }))}
            /> */}

            <Grid container spacing={2}>
                <Grid item lg={3}>
                    <Select
                        cryptocurrency={true}
                        label="Cryptocurrency"
                        data={appState.assetList}
                        action={(asset) => setSelectedAsset(asset)}
                    />
                </Grid>
                <Grid item={3}>
                    <TextField
                        id="outlined-basic"
                        label="Invested"
                        variant="outlined"
                        value={investedValue}
                        onChange={(e) => setInvestedValue(e.target.value)}
                    />
                </Grid>
                <Grid item lg={3}>

                    <DatePicker
                        selected={startDate}
                        onChange={(date) => {
                            setStartDate(date)
                            dispatch(calls.getHistory(selectedAsset.id, formatDate(date)))
                        }} />
                </Grid>

                {appState.assetHistory && selectedAsset ? <Grid item lg={3}>
                    <p variant="h3">
                        Current Price :  =   ${compute().current_price}
                        <br />
                        <br />
                        Past Price :   =    ${compute().past_price}
                        <br />
                        <br />
                        Difference :  =     ${compute().difference}
                        <br />
                        <br />
                        PercentageDifference : =     {compute().percentageDifference}
                        <br />
                        <br />
                        If you had invested {investedValue}, it would have become ${compute().multiplier}
                    </p>
                </Grid> : null}
            </Grid>

            {selectedAsset ?
                <div style={{ marginTop: 20 }}>
                    <Stats asset={selectedAsset} />
                    <pre>
                        <code>
                            {JSON.stringify(selectedAsset, null, 2)}
                        </code>
                    </pre>
                </div> : null}
        </div>
    )
}

export default Home;