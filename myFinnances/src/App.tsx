import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './pages/login';
import Cadastro from './pages/cadastro';

import './css/global.css'
import './css/cadastro.css'
import './css/login.css'


function App() {
  return (
    <div> 
      <Router>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/cadastro" element={<Cadastro />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App