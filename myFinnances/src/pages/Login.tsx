import React, { useState } from 'react';
import logo from '../assets/financa.png';
import { useForm } from "react-hook-form";
import '../css/global.css'
import '../css/login.css'
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import { validEmail } from "../utils/regex"
import { Link } from "react-router-dom";
import {countDown} from '../utils/Modal';


interface IFildForm {
  email: string,
  password: string,
}

const schema = object({
  email: string().required("Campo obrigatório."),
  password: string().required("Campo obrigatório.").min(8, "Você precisa inserir pelo menos 8 caracteres").max(16, "Sua senha não pode exceder 16 caracteres"),
})

export default function Login() {

  const { register, handleSubmit: onSubmit, watch, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  // console.log(errors);


  const [fildsForm, setFildsForm] = useState<IFildForm>({ email: "", password: "" });

  const [emailError, setEmailError] = useState(false);

  const validate = () => {
    if (!validEmail.test(fildsForm.email)) {
      setEmailError(true);
      console.log("Entrei");
    } else {
      setEmailError(false);
      console.log("Entrei");
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFildsForm({ ...fildsForm, [name]: value });
  }

  const handleSubmit = (data: any) => {
    console.log(data);
    setFildsForm({ email: "", password: "" });
  }

  return (
    <div>
      <div className="container">
        <header>
          <img className='logo' src={logo} alt="logo-finanças" />
          <h1>Bem vindo</h1>
        </header>
        {/* <input type="button" value={count} onClick={() => setCount(count + 1)}/> */}
  
        <section>
          <form className='form' onSubmit={onSubmit(handleSubmit)}>
            <div className="email">
              <label htmlFor="">Usuário</label>
              <input
                type="email"
                placeholder='Digite seu email'
                {...register("email")}
                value={fildsForm.email}
                onChange={handleChange}
              />
              <span className='error'>{errors?.email?.message}</span>
            </div >
  
            <div className="password">
              <label htmlFor="">Senha</label>
              <input
                type="password"
                placeholder='Digite sua senha'
                {...register("password")}
                value={fildsForm.password}
                onChange={handleChange}
              />
              <span className='error'>{errors?.password?.message}</span>
            </div>
            <a className='esqueceu-senha' href="#">Esqueceu a senha?</a>
  
            <input className='submit' type="submit" value="Entrar" onClick={validate} />
          </form>
          <div className="new-account">
            <h2>Não tem uma conta?&nbsp;</h2>
            <Link to="./Cadastro" onClick={countDown}>Cadastre-se</Link>
          </div>
        </section >
      </div >
    </div >
  )
}
