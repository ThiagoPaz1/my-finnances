import React, {useState} from 'react'
import Login from './pages/login'

interface IFildForm {
  email: string,
  password: string,
}

function App() {

  const [count, setCount] = useState<number>(0);
  const [fildsForm, setFildsForm] = useState<IFildForm>({email: "", password:""});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
    const {name, value} = event.target;
    setFildsForm({...fildsForm, [name]: value});
  }

  const reset = (event: any) => {
    event.preventDefault();
    setFildsForm({email: "", password: ""});
  }

  console.log(fildsForm);

  return (
    <div>
      <Login/>
      <h1>Iniciando os trabalhos</h1>
      <input type="button" value={count} onClick={() => setCount(count + 1)}/>
      <form action="">
        <input type="email" placeholder='Digite seu email' name='email' value={fildsForm.email} onChange={handleChange}/>
        <input type="password" placeholder='Digite sua senha' name='password' value={fildsForm.password} onChange={handleChange}/>
        <input type="submit" value="send resquest" onClick={reset}/>
      </form>
    </div>
  )
}

export default App