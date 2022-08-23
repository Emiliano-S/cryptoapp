import { useEffect, useState } from 'react';
import KitchenSinkStory from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { FetchApi } from "./FetchApi";

const columns = [
    {
        name: 'Base asset',
        selector: row => row.baseAsset,
    },
    {
        name: 'Totals',
        selector: row => row.total,
    },
]

export function Assets(){
    const [arr, setArr] = useState([]);
    const {data, loading, error, reload} = FetchApi('https://api.binance.com/api/v3/exchangeInfo');

    useEffect(()=>{
        if(data){
           const tempObj = data.symbols.reduce((obj, value) => {
            return {...obj, [value.baseAsset]: (obj[value.baseAsset] || 0) + 1};
           }, {});

           const _data = Object.keys(tempObj).map((key) => ({
            baseAsset: key,
            total: tempObj[key]
           }));
           setArr(_data);
        }
    },[data])


    if(loading) return <p>Loading...</p>
    if(error) return <p>Error: {error}</p>

    return(
        <>
            <table>
                <tr>
                    <th>Base asset</th>
                    <th>Amounts of coins</th>
                </tr>
                {arr.map((coin, index) =>{
                    return <tr key={index}>
                        <td>{<Link to={`/markets?base_assets=${coin.baseAsset}`}>{coin.baseAsset}</Link>}</td>
                        <td>{coin.total}</td>
                    </tr>
                })}
            </table>
            {/* <KitchenSinkStory
                    columns={columns}
                    data={arr}
                    direction="auto"
                    fixedHeaderScrollHeight="300px"
                    pagination
                    responsive
                    subHeaderAlign="right"
                    subHeaderWrap
                /> */}

        </>
    )
}
