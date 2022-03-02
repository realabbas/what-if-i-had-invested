/* eslint-disable */

import axios from "axios";
import api from "../../../config/api";
import { actions } from './slice';

// Get Price by Id
const getPrice = (ids) => {

    return async (dispatch) => {

        await axios({
            method: "get",
            url: api.crypto.getPrice(ids),
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

// curl https://rest.coinapi.io/v1/assets \
//   --request GET
//   --header "X-CoinAPI-Key: 73034021-THIS-IS-SAMPLE-KEY"

const getAllAssets = (per_page, page) => {
    return async (dispatch) => {
        await axios({
            method: "get",
            url: api.crypto.getAllAssets(per_page, page),
            headers: { "X-CoinAPI-Key": "2210EDB9-B6D0-4721-B17E-4EBA3A05885B" }
        })
            .then(result => {
                console.log("re", result)
                dispatch(actions.changeState({ assetList: result.data }))
            })
    }
}

export {
    getPrice,
    getHistory,
    getTokenPriceByAddress,
    getAllAssets
};

