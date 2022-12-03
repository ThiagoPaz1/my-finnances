import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';

import './css/global.css'
import './css/cadastro.css'
import './css/login.css'


function App() {
  return (
    <div> 
      <Router>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/Cadastro" element={<Cadastro />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App