/* eslint-disable */
import React from 'react';
import { useDispatch } from 'react-redux';
import * as calls from './store/calls';

const Home = () => {

    const dispatch = useDispatch();

    const blockchain = "ethereum"
    const address = "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce"
    const currency = "inr"

    React.useEffect(() => {
        dispatch(calls.getTokenPriceByAddress(blockchain, address, currency))
        dispatch(calls.getPrice("bitcoin", currency))

    }, [])
    return <h3>Home</h3>
}

export default Home;