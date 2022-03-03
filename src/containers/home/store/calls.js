/* eslint-disable */

import axios from "axios";
import api from "../../../config/api";
import { actions } from './slice';

const BASE_URL = `/api/${process.env.REACT_APP_SERVER_API_VERSION}`
axios.defaults.baseURL = BASE_URL

// Get Price by Id
const getPrice = (ids, currency) => {

    return async (dispatch) => {

        await axios({
            method: "get",
            url: api.crypto.getPrice(ids, currency),
            headers: { "Content-Type": "application/json" },
        })
            .then((result) => {
                console.log("result", result)
            })
            .catch((err) => {
                console.log("err", err)

            });
    };
};

// Get History by Id
const getHistory = (ids, date) => {

    console.log(api.crypto.getHistory(ids, date))

    return async (dispatch) => {

        await axios({
            method: "get",
            url: `${api.crypto.getHistory(ids, date)}`,
            headers: { "Content-Type": "application/json" },
        })
            .then((result) => {
                console.log("result", result)
                dispatch(actions.changeState({ assetHistory: result.data }))
            })
            .catch((err) => {
                console.log("err", err)
            });
    };
};

// Get Price by Contract Address of the token deployed on that blockchain
const getTokenPriceByAddress = (blockchain, token) => {

    return async (dispatch) => {

        await axios({
            method: "get",
            url: api.crypto.getTokenPriceByAddress(blockchain, token),
            headers: { "Content-Type": "application/json" },
        })
            .then((result) => {
                console.log("result", result)
            })
            .catch((err) => {
                console.log("err", err)

            });
    };
};

const getAllAssets = (per_page, page, currency) => {
    return async (dispatch) => {
        await axios({
            method: "get",
            url: api.crypto.getAllAssets(per_page, page, currency),
        })
            .then(result => {
                dispatch(actions.changeState({ assetList: result.data }))
            }).catch((err) => {
                console.log("err", err)
            });
    }
}

const getSupportedCurriencies = () => {
    return async (dispatch) => {
        await axios({
            method: "get",
            url: api.crypto.getSupportedCurriencies,
        })
            .then(result => {
                dispatch(actions.changeState({ supportedCurriencies: result.data }))
            }).catch((err) => {
                console.log("err", err)
            });
    }
}

export {
    getPrice,
    getHistory,
    getTokenPriceByAddress,
    getAllAssets,
    getSupportedCurriencies
};

