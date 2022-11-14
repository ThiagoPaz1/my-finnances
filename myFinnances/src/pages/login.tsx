import React, {useState} from 'react';
import '../css/login.css'
import logo from '../assets/financa.png';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import {object, string} from 'yup';
import {validEmail, validPassword} from "../utils/regex"


interface IFildForm {
    email: string,
    password: string,
  }

  const schema = object ({
    email: string().required("Campo obrigatório."),
    password: string().required("Campo obrigatório.").min(8,"Você precisa inserir pelo menos 8 caracteres").max(10,"Sua senha não pode exceder 16 caracteres"),
  })

export default function login() {

    const { register, handleSubmit: onSubmit, watch, formState: { errors } } = useForm({resolver: yupResolver(schema)});

    // console.log(errors);
    

    const [fildsForm, setFildsForm] = useState<IFildForm>({email: "", password:""});


    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const validate = () => {
        if(!validateEmail.test(emailError)){
            setEmailError(true);
        } else{
            setEmailError(false);
        }

        if(!validatePassword.test(passwordError)){
            setPasswordError(true);
        } else{
            setPasswordError(false);
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
    const {name, value} = event.target;
    setFildsForm({...fildsForm, [name]: value});
    }

    const handleSubmit = (data: any) => {

        console.log(data);
        setFildsForm({email: "", password: ""});
    }

    return(
    <div>
        <div className="container">
            <header>
                <img className='logo' src={logo} alt="logo-finanças"/>
                <h1>Bem vindo</h1>
            </header>
        {/* <input type="button" value={count} onClick={() => setCount(count + 1)}/> */}

        <section>
        <form className='form' onSubmit={onSubmit(handleSubmit)}>
            <div className="email">
                <label htmlFor="">Usuário</label>
                <input type="email" placeholder='Digite seu email' {...register("email")} value={fildsForm.email} onChange={handleChange}/>
                <span className='error'>{errors?.email?.message}</span>
            </div>
            {emailError && <p>Email incorreto!</p>}

            <div className="password">
                <label htmlFor="">Senha</label>
                <input type="password" placeholder='Digite sua senha' {...register("password")} value={fildsForm.password} onChange={handleChange}/>
                <span className='error'>{errors?.password?.message}</span>
            </div>
            {passwordError && <p>Password incorreto!</p>}
            <a className='esqueceu-senha' href="#">Esqueceu a senha?</a>

            <input className='submit' type="submit" value="Entrar"/>
        </form>
        <div className="new-account">
            <h2>Ainda não tem uma conta? <a href="#">Criar conta</a></h2>
        </div>
        </section>
        </div>
    </div>
    )
}