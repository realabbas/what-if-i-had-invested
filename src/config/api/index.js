/* eslint-disable */
const api = {
    crypto: {
        getPrice: (ids, currency) => `/simple/price?ids=${ids}&vs_currencies=${currency}`,
        getTokenPriceByAddress: (blockchain, token) => `/simple/token_price/${blockchain}?contract_addresses=${token}`,
        getHistory: (ids, date) => `/coins/${ids}/history?date=${date}`,
        getAllAssets: (per_page, page, currency) => `/coins/markets?order=market_cap_desc&per_page=${per_page}&page=${page}&sparkline=false&vs_currency=${currency}`,
        getSupportedCurriencies: "/simple/supported_vs_currencies"
    },
};

export default api;