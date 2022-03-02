/* eslint-disable */
const api = {
    crypto: {
        getPrice: (ids) => `/simple/price?ids=${ids}`,
        getTokenPriceByAddress: (blockchain, token) => `/simple/token_price/${blockchain}?contract_addresses=${token}`,
        getHistory: (ids, date) => `/coins/${ids}/history?date=${date}`
    },
};

export default api;