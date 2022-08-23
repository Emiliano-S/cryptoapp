import axios from "axios";
import { useEffect, useState } from "react";

export function FetchApi(url, options = { method: 'GET', headers: {}, data: null }){
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const reload = async () =>{
        try{
            setError(false);
            setLoading(true);
            const response = await axios({
                url,
                method: options.method,
                headers: options.headers,
                data: options.data,
            });
            const {data: _data} = response;
            setData(_data);
            setLoading(false);
        }catch (err){
            setError(err.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        reload();
    }, []);

    return{
        data,
        loading,
        error,
        reload
    }
}