
import useSWR from 'swr';

const fetcher = url => fetch(url).then(response => response.json());


export function useFetchApi(api){
    const {data: dataPrice , error: errorPrice} = useSWR("https://api.binance.com/api/v3/ticker/price", fetcher);
    const {data: data24hr, error: error24hr} = useSWR("https://api.binance.com/api/v3/ticker/24hr", fetcher);
    const {data: dataInfo, error: errorInfo} = useSWR("https://api.binance.com/api/v3/exchangeInfo", fetcher);
    let error;
    let data = [];

    if(dataPrice !== undefined && data24hr !== undefined && dataInfo !== undefined){
        data = [...dataPrice];
        data = data.map((coin, index) => ({
            ...coin,
            priceChangePercent: data24hr[index].priceChangePercent,
            baseAsset: dataInfo.symbols[index].baseAsset,
            quoteAsset: dataInfo.symbols[index].quoteAsset
        }));
    }

    return{
        data,
        error,
        loading: false,
    }

}