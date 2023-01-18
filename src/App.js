import './App.css';
import { Route,Routes } from 'react-router-dom';
import Home from './pages/Home';
import Treasury from './pages/Treasury';
import Navbar from './components/Navbar';
import abi from "./contracts/Treasury.json"
import { ethers,utils } from 'ethers';

function App() {  
  return (
    <div className="App">
      <Navbar/>
      <div className="nav-routers">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/treasury' element={<Treasury/>}/>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
