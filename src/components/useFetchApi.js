import useSWR from 'swr';

const fetcher = url => fetch(url).then(response => response.json());


export function useFetchApi(api){
    const {data: data1 , error: error1} = useSWR("https://api.binance.com/api/v3/ticker/price", fetcher);
    const {data: data2, error: error2} = useSWR("https://api.binance.com/api/v3/ticker/24hr", fetcher);




    return{
        data1,
        data2,
        error1,
        error2 ,
    }

}