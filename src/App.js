import './style/App.css';
import {Routes, Route} from 'react-router-dom';
import { Markets } from './components/Markets';
import { Assets } from './components/Assets';


const api = 'https://api.binance.com';


function App() {
  return (
    <Routes>
      <Route path='/markets' element={<Markets api={api}/>}/>
      <Route path='/' element={<Assets />}/>
      <Route path='*' element={<Assets />}/>
    </Routes>
  );
}

export default App;
