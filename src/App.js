import './style/App.css';
import {Routes, Route, Link} from 'react-router-dom';
import { Markets } from './components/Markets';
import { Assets } from './components/Assets';

function App() {

  return (
    <>
      <Link to='/markets'>Markets</Link>
      <Link to='/asset'>Asset</Link>
      <Routes>
        <Route path='/markets' element={<Markets />}/>
        <Route path='/asset' element={<Assets />} />
      </Routes>
    </>
  );
}

export default App;
