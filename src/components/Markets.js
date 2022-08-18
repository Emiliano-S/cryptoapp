import DataTable from 'react-data-table-component';
import { useFetchApi } from './useFetchApi';

const columns = [
    {
        name: 'Nome mercato',
        selector: row => row.symbol,
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
        selector: row => row.price
    },
    {
        name: 'Variazione 24h',
        selector: row => row.priceChangePercent
    }
]

export function Markets({api}){
    const {data1, error1, data2, error2} = useFetchApi(api);

    console.log(data1)

    return(
        <DataTable
            columns={columns}
            data={[data1, data2]}
        />
    )
}