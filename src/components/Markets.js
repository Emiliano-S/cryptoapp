import { useEffect, useState } from 'react';
import KitchenSinkStory from 'react-data-table-component';
import { useFetchApi } from './useFetchApi';

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
        name: 'Variazione 24h',
        selector: row => row.priceChangePercent,
        sortable: true,
    }
]

export function Markets({api}){
    const {data} = useFetchApi(api);
    const [input, setInput] = useState("");
    let [list, setList] = useState(data);


    /* v Filtraggio dell'array mostrato in tabella "list" matchando il valore inserito nell'input "searchInput" v */

    const handleInput = (event) =>{
        setInput(event.target.value);
    }

    const handleSearch = (input) =>{
        const _list = [...data];

        if(input !== ""){
          const filtered = _list.filter((value)=>value.symbol.match(new RegExp(input,"ig")))
          setList(filtered);
        }else{
          setList(data);
        }}

    useEffect(()=>{
        handleSearch(input)
    },[input, data]);




    return(
        <div>
            <div>
                <label for="searchInput">Search your coin: </label>
                <input name="searchInput" onInput={handleInput} value={input} />
            </div>
            <div>
                <KitchenSinkStory
                    columns={columns}
                    data={list}
                    direction="auto"
                    fixedHeaderScrollHeight="300px"
                    pagination
                    responsive
                    subHeaderAlign="right"
                    subHeaderWrap
                />
            </div>
        </div>
    )
}