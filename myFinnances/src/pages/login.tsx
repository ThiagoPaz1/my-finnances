import React, {useState} from 'react';
import '../css/login.css'
import logo from '../assets/financa.png';


interface IFildForm {
    email: string,
    password: string,
  }

export default function login() {

    // const [count, setCount] = useState<number>(0);
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

    return(
    <div>
        <div className="container">
            <header>
                <img className='logo' src={logo} alt="logo-finanças"/>
                <h1>Bem vindo</h1>
            </header>
        {/* <input type="button" value={count} onClick={() => setCount(count + 1)}/> */}

        <section>
        <form action="" className='form'>
            <label htmlFor="">Usuário</label>
            <input type="email" placeholder='Digite seu email' name='email' value={fildsForm.email} onChange={handleChange}/>

            <label htmlFor="">Senha</label>
            <input type="password" placeholder='Digite sua senha' name='password' value={fildsForm.password} onChange={handleChange}/>
            <a className='esqueceu-senha' href="#">Esqueceu a senha?</a>

            <input className='submit' type="submit" value="Entrar" onClick={reset}/>
        </form>
        <div className="new-account">
            <h2>Ainda não tem uma conta? <a href="#">Criar conta</a></h2>
        </div>
        </section>
        </div>
    </div>
    )
}