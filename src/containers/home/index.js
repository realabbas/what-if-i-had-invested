/* eslint-disable */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from '../../components/select';
import * as calls from './store/calls';
import Stats from '../../components/stats';

const Home = () => {

    const dispatch = useDispatch();
    const appState = useSelector((state) => state.app)
    const [selectedAsset, setSelectedAsset] = useState(null)

    const blockchain = "ethereum"
    const address = "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce"
    const currency = "inr"

    console.log("selectedAsset", selectedAsset)

    React.useEffect(async () => {
        // dispatch(calls.getTokenPriceByAddress(blockchain, address, currency))
        // dispatch(calls.getPrice("bitcoin", currency))
        dispatch(calls.getHistory("bitcoin", "02-03-2022"))
        // dispatch(calls.getAllAssets(100, 1))
    }, [])

    return (
        <div style={{ margin: "1em" }}>
            <Select
                assetList={appState.assetList}
                selectAsset={(asset) => setSelectedAsset(asset)}
            />

            {selectedAsset ? <Stats asset={selectedAsset} /> : null}

            <pre>
                <code>
                    {JSON.stringify(selectedAsset, null, 2)}
                </code>
            </pre>
        </div>
    )
}

export default Home;