/* eslint-disable */
const api = {
    crypto: {
        getPrice: (ids) => `/simple/price?ids=${ids}`,
        getTokenPriceByAddress: (blockchain, token) => `/simple/token_price/${blockchain}?contract_addresses=${token}`,
        getHistory: (ids, date) => `/coins/${ids}/history?date=${date}`,
        getAllAssets: (per_page, page) => `/coins/markets?order=market_cap_desc&per_page=${per_page}&page=${page}&sparkline=false`
    },
};

export default api;