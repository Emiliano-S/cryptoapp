import KitchenSinkStory from 'react-data-table-component';
import { useEffect, useState } from "react";
import { FetchApi } from "./FetchApi";
import { useSearchParams } from "react-router-dom";


const columns = [
    {
        name: 'Nome mercato',
        selector: row => row.symbol,
        sortable: true,
    },
    {
        name: 'Base asset',
        selector: row => row.baseAsset,
    },
    {
        name: 'Quote asset',
        selector: row => row.quoteAsset,
    },
    {
        name: 'Prezzo',
        selector: row => row.price,
    },
    {
        name: 'Variazione 24h %',
        selector: row => row.priceChangePercent,
        sortable: true,
    }
]

export function Markets(){;
    const [ searchParams ] = useSearchParams();
    const filterPage = searchParams.get('base_assets');


    const [data, setData] = useState([]);
    const { data: data1, loading: loading1, error: error1, reaload: reload1} = FetchApi('https://api.binance.com/api/v3/ticker/price');
    const { data: data2, loading: loading2, error: error2, reaload: reload2} = FetchApi('https://api.binance.com/api/v3/exchangeInfo');
    const { data: data3, loading: loading3, error: error3, reaload: reload3} = FetchApi('https://api.binance.com/api/v3/ticker/24hr');

    useEffect(()=>{
        if(data1 && data2 && data3){
            let _data = data1.map(item => {
                const baseAsset = data2.symbols.find(element  => element.symbol === item.symbol).baseAsset;
                const quoteAsset = data2.symbols.find(element  => element.symbol === item.symbol).quoteAsset;
                const priceChangePercent = data3.find(element => element.symbol === item.symbol).priceChangePercent
                return {
                    ...item,
                    baseAsset,
                    quoteAsset,
                    priceChangePercent,
                }
            });

            if(filterPage){
                _data = _data.filter(data => data.baseAsset == filterPage)
            }
            setData(_data);
        }
    }, [data1, data2, data3]);

    if(loading1 && loading2 && loading3) return <p>Loading...</p>

    return(
        <>
            <KitchenSinkStory
                    columns={columns}
                    data={data}
                    direction="auto"
                    fixedHeaderScrollHeight="300px"
                    pagination
                    responsive
                    subHeaderAlign="right"
                    subHeaderWrap
                />

        </>
    )
}