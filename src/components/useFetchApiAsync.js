export async function useFetchApiAsync(){
    let error;
    let data;

    try{
        const [fetchPrice, fetch24hr, fetchInfo] = await [fetch('https://api.binance.com/api/v3/ticker/price'), fetch('https://api.binance.com/api/v3/ticker/24hr'), fetch('https://api.binance.com/api/v3/exchangeInfo')];
        const dataPrice = (await fetchPrice).json();
        const data24hr = (await fetch24hr).json();
        const dataInfo = (await fetchInfo).json();
        data = await [...dataPrice];
        data = await data.map((coin, index) => ({...coin, priceChangePercent: data24hr[index].priceChangePercent, baseAsset: dataInfo.symbols[index].baseAsset, quoteAsset: dataInfo.symbols[index].quoteAsset}))

    } catch (err){
        error = err;
    }


    console.log(data);
    return{
        data,
        error,
        loading: !data && !error,
    }
}