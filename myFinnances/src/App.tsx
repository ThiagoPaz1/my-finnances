import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './pages/login/Login';
import Cadastro from './pages/cadastro/Cadastro';


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