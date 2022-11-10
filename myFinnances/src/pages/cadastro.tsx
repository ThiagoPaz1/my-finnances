import React, {useState} from 'react';
import '../css/login.css'


interface IFildForm {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
  }

  

export default function cadastro() {

    const [fildsForm, setFildsForm] = useState<IFildForm>({name: "", email: "", password:"", confirmPassword:""});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
    const {name, value} = event.target;
    setFildsForm({...fildsForm, [name]: value});
    }

    const reset = (event: any) => {
        event.preventDefault();
        setFildsForm({name: "", email: "", password:"", confirmPassword:""});
    }

    console.log(fildsForm);
    
    return (
    <div>
            <div className="container">
                <header>
                    <h1>Cadastro</h1>
                </header>
            {/* <input type="button" value={count} onClick={() => setCount(count + 1)}/> */}

            <section>
                <form action="" className='form'>

                <label htmlFor="">Nome</label>
                <input type="text" placeholder="Insira seu nome" name="name" value={fildsForm.name} onChange={handleChange}/>

                <label htmlFor="">Email</label>
                <input type="email" placeholder='Digite seu email' name='email' value={fildsForm.email} onChange={handleChange}/>

                <label htmlFor="">Senha</label>
                <input type="password" placeholder='Digite sua senha' name='password' value={fildsForm.password} onChange={handleChange}/>
                
                <label htmlFor="">Confirmação de Senha</label>
                <input type="password" placeholder='Digite sua senha' name='password' value={fildsForm.confirmPassword} onChange={handleChange}/>


                <input className='submit' type="submit" value="Cadastrar" onClick={reset}/>
            </form>
            </section>
            </div>
        </div>

    )
}