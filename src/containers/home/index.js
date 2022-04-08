/* eslint-disable */
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux';
import StatCard from '../../components/card';
import Picker from '../../components/picker';
import Select from '../../components/select';
import Stats from '../../components/stats';
import Graph from './graph';
import * as calls from './store/calls';
import { actions } from './store/slice';

const Home = () => {

    const dispatch = useDispatch();
    const appState = useSelector((state) => state.app)
    const [selectedAsset, setSelectedAsset] = useState(null)
    const [selectedPlatform, setSelectedPlatform] = useState(null)
    const [startDate, setStartDate] = useState(new Date());
    const [investedValue, setInvestedValue] = useState(500)
    const [contractAddress, setContractAddress] = useState('')

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
        if (!appState.blockchainPlatforms) {
            dispatch(calls.getBlockchainPlatforms())
        }
        // if (!appState.assetList) {
        dispatch(calls.getAllAssets(100, 1, appState.currency))
        // }

    }, [])

    const compute = () => {
        try {
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
        catch (e) {
            console.log(e)
        }
    }

    const handleReset = () => {
        setSelectedAsset(null);
        setSelectedPlatform(null);
        setStartDate(new Date());
        setContractAddress('')
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
                <Grid item lg={2}>
                    <Select
                        cryptocurrency={true}
                        label="Cryptocurrency"
                        data={appState.assetList}
                        action={(asset) => {
                            setSelectedAsset(asset);
                            dispatch(calls.getParticularAssetDetail(asset.id))
                            dispatch(actions.changeState({ assetHistory: null }))
                        }}
                    />
                </Grid>
                {/* {selectedAsset == null ?
                    <>
                        <Grid item lg={2}>
                            <Select
                                cryptocurrency={true}
                                label="Blockchain Platforms"
                                data={appState.blockchainPlatforms}
                                action={(platform) => {
                                    setSelectedPlatform(platform);
                                }}
                            />
                        </Grid>
                        <Grid item lg={2}>
                            <TextField
                                id="outlined-basic"
                                label="Contract Address"
                                variant="outlined"
                                value={contractAddress}
                                onChange={(e) => {
                                    setContractAddress(e.target.value)
                                    dispatch(calls.getTokenPriceByAddress(selectedPlatform, e.target.value, appState.currency))
                                }}
                            />
                        </Grid>
                    </>
                    : null} */}

                <Grid item lg={2}>
                    {/* <DatePicker
                        selected={startDate}
                        onChange={(date) => {
                            setStartDate(date)
                            dispatch(calls.getHistory(selectedAsset.id, formatDate(date)))
                        }} /> */}
                    <Picker action={(date) => {
                        setStartDate(date)
                        dispatch(calls.getHistory(selectedAsset.id, formatDate(date)))
                    }} />
                </Grid>
                <Grid item={2}>
                    <TextField
                        id="outlined-basic"
                        label="Invested"
                        type="number"
                        variant="outlined"
                        value={investedValue}
                        onKeyDown={(event) => {
                            if (event.keyCode === 13) {
                                dispatch(calls.getHistory(selectedAsset.id, formatDate(startDate)))
                            }
                        }}
                        onChange={(e) => setInvestedValue(e.target.value)}
                    />
                </Grid>

                <Grid item={2}>
                    <Button
                        variant="filled"
                        sx={{ backgroundColor: "red", color: "white" }}
                        onClick={() => handleReset()} >
                        RESET
                    </Button>
                </Grid>

                <Grid item={6}>
                    <div style={{ display: "flex", alignItems: "center", marginTop: 10 }}>
                        <span>
                            Crypto Data powered by
                        </span>
                        <img
                            alt="logo"
                            src="https://static.coingecko.com/s/coingecko-logo-d13d6bcceddbb003f146b33c2f7e8193d72b93bb343d38e392897c3df3e78bdd.png"
                            style={{ height: 35, marginLeft: 8 }}
                        />
                    </div>
                </Grid>


                {appState.assetHistory && appState.assetHistory.market_data && selectedAsset ?
                    <Grid sx={{ m: 0.2 }} container spacing={2} >
                        <Grid item lg={3}>
                            <StatCard backgroundColor="#0A1829" data={"current_price"} value={compute().current_price.toFixed(5)} />
                        </Grid>
                        <Grid item lg={3}>
                            <StatCard backgroundColor="#0A1829" data={"past_price"} value={compute().past_price.toFixed(5)} />
                        </Grid>

                        <Grid item lg={3}>
                            <StatCard backgroundColor="#0A1829" data={"percentage_difference_%"} value={compute().percentageDifference.toFixed(5)} />
                        </Grid>
                        <Grid item lg={3}>
                            <StatCard
                                backgroundColor="#0A1829"
                                data={"current_value_of_invested_amount"}
                                value={compute().multiplier.toFixed(2)}
                                color={compute().current_price > compute().past_price ? "green" : "#e23737"}
                            />
                        </Grid>
                    </Grid>
                    : null}
            </Grid>



            {selectedAsset ?
                <div style={{ marginTop: 50 }}>
                    <Graph asset={selectedAsset} />
                </div>
                : null}
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