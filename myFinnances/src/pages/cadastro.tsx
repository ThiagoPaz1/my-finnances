import React, {useState} from 'react';
import '../css/global.css'
import '../css/cadastro.css'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import {object, string} from 'yup';
import {validName,validPassword,validEmail} from "../utils/regex"


interface IFildForm {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
}

const schema = object ({
    name: string().required("Campo obrigatório"),
    email: string().required("Campo obrigatório."),
    password: string().required("Campo obrigatório.").min(8,"Você precisa inserir pelo menos 8 caracteres").max(16,"Sua senha não pode exceder 16 caracteres"),
    confirmPassword: string().required("Campo obrigatório.").min(8,"Você precisa inserir pelo menos 8 caracteres").max(16,"Sua senha não pode exceder 16 caracteres")
})

  

export default function cadastro() {

    const { register, handleSubmit: onSubmit, watch, formState: { errors } } = useForm({resolver: yupResolver(schema)});

    const [fildsForm, setFildsForm] = useState<IFildForm>({name: "", email: "", password:"", confirmPassword:""});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = event.target;
        setFildsForm({...fildsForm, [name]: value});
    }

    const handleSubmit = (data: any) => {

        console.log(data);
        setFildsForm({name: "", email: "", password:"", confirmPassword:""});
    }

    const reset = (event: any) => {
        event.preventDefault();
        setFildsForm({name: "", email: "", password:"", confirmPassword:""});
    }


    const [nameError, setNameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [incorrectPassword, setIncorrectPassword] = useState(false);



    const validate = () => {
        if(!validName.test(fildsForm.name)){
            setNameError(true);
            alert("Nome Invalido")
            
        } else{
            setNameError(false);
            alert("Nome Valido");
        }

        if(!validPassword.test(fildsForm.password && fildsForm.confirmPassword)){
            setPasswordError(true);
            alert("Senha invalida");
        } else{
            alert("Senha valida");
        }

        if(!validEmail.test(fildsForm.email)){
            setEmailError(true);
            alert("Email invalido");
        } else{
            setEmailError(false);
            alert("Email valido");
        }
    }

    const validatePassword = () =>{
        if(fildsForm.password != fildsForm.confirmPassword){
            alert("As senhas não correspondem");
        } else{
            alert("As senhas correspodem")
        }
    }

    const handleClick = () => {
        validate();
        validatePassword();
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
                    <form action="" className='form' onSubmit={onSubmit(handleSubmit)}>

                        <div className="name">
                            <label htmlFor="">Nome</label>
                            <input 
                                type="text" 
                                placeholder="Insira seu nome" 
                                {...register("name")}  
                                value={fildsForm.name} 
                                onChange={handleChange}
                            />
                            {/* <span>{errors?.name?.message}</span> */}
                            {nameError && <p>Nome invalido</p>}
                        </div>

                        <div className="email">
                            <label htmlFor="">Email</label>
                            <input 
                                type="email" 
                                placeholder='Digite seu email' 
                                {...register("email")} 
                                value={fildsForm.email} 
                                onChange={handleChange}
                            />
                            <span className='error'>{errors?.email?.message}</span>
                        </div>

                        <div className="senha">
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
                        
                        <div className="confirmPassword">
                            <label htmlFor="">Confirmação de Senha</label>
                            <input 
                                type="password" 
                                placeholder='Digite sua senha' 
                                {...register("confirmPassword")}
                                value={fildsForm.confirmPassword} 
                                onChange={handleChange}
                            />
                            <span className='error'>{errors?.confirmPassword?.message}</span>
                        </div>

                        <input className='submit' type="submit" value="Cadastrar" onClick={handleClick}/>
                    </form>
                </section>
            </div>
        </div>
    )
}