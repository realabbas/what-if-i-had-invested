/* eslint-disable */

import axios from "axios";
import api from "../../../config/api";

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

export {
    getPrice,
    getHistory,
    getTokenPriceByAddress,
};

