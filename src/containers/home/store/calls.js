/* eslint-disable */

import axios from "axios";
import api from "../../../config/api";

const BASE_URL = `${process.env.REACT_APP_SERVER_ENDPOINT}/${process.env.REACT_APP_SERVER_API_VERSION}`
axios.defaults.baseURL = BASE_URL;

console.log("BASE_URL", BASE_URL)

// Get Price by Id
const getPrice = (ids) => {

    return async (dispatch) => {

        await axios({
            method: "get",
            url: `${api.crypto.getPrice}?ids=${ids}`,
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
            url: `${api.crypto.getTokenPriceByAddress}/${blockchain}?contract_addresses=${token}`,
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
    getTokenPriceByAddress,
};

