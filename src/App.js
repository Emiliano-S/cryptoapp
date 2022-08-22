import './style/App.css';
import {Routes, Route, Link} from 'react-router-dom';
import { Markets } from './components/Markets';
import { Assets } from './components/Assets';
import { useFetchApi } from './components/useFetchApi';


function App() {
  const {data, error, loading} = useFetchApi();


  return (
    <>
      <Link to='/markets'>Markets</Link>
      <Link to='/assets'>Assets</Link>
      <Routes>
        <Route path='/markets' element={<Markets data={data} loading={loading}/>}/>
        <Route path='/assets' element={<Assets data={data} />}/>
        <Route path='/' element={<Assets />}/>
        <Route path='*' element={<Assets />}/>
      </Routes>
    </>
  );
}

export default App;
