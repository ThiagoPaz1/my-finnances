import React, {useState} from 'react';
import '../../css/global.css'
import '../login/style.css'
import logo from '../../assets/financa.png';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import {object, string} from 'yup';
import {validEmail} from "../../utils/regex"
import { Link } from "react-router-dom";
import { CustomInput } from '../../components/form';
import { FildForm } from '../../interfaces/filds';
import { PrimaryButton } from '../../components/button';



// const fildForm: FildForm = {
//     email: "",
//     password: "",
// }


  const schema = object ({
    email: string().required("Campo obrigatório."),
    password: string().required("Campo obrigatório.").min(8,"Você precisa inserir pelo menos 8 caracteres").max(16,"Sua senha não pode exceder 16 caracteres"),
  })

export default function login() {

    const { register, handleSubmit: onSubmit, watch, formState: { errors } } = useForm({resolver: yupResolver(schema)});

    // console.log(errors);
    

    const [fildForm, setFildsForm] = useState<FildForm>({email: "", password: ""});

    console.log(fildForm);
    


    const [emailError, setEmailError] = useState(false);

    const validate = () => {
        if(!validEmail.test(fildForm.email)){
            setEmailError(true);
            console.log("Entrei");
        } else{
            setEmailError(false);
            console.log("Entrei");
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFildsForm({...fildForm, [name]: value});
    }

    const handleSubmit = (data: any) => {
        console.log(data);

        // Enviar dados para o backend
        setFildsForm({email: "", password: ""});
    }

    return(
    <div>
        <div className="container__login">
            <header>
                <img className='logo' src={logo} alt="logo-finanças"/>
                <h1>Bem vindo</h1>
            </header>
        <section>
            <div className="form__container">
                <CustomInput
                    title="Usuário"
                    handleChange={handleChange}
                    register={() => register("email",{required: true})}
                    placeholder="Digite seu email"
                    value={fildForm.email}
                    errorMessage={errors?.email?.message}
                />
                {emailError && <p>Email incorreto!</p>}
                <CustomInput
                    title="Senha"
                    handleChange={handleChange}
                    placeholder="Digite sua senha"
                    register={() => register("password")}
                    value={fildForm.password}
                    type="password"
                    errorMessage={errors?.password?.message}
                />
                <a className='esqueceu-senha' href="#">Esqueceu a senha?</a>

                <PrimaryButton title="Entrar" handleSubmit={handleSubmit} />
            </div>
            {/* <input className='submit' type="submit" value="Entrar" onClick={validate}/> */}
        <div className="new-account">
            <h2>Não tem uma conta?&nbsp;</h2>
            <Link to="./cadastro">Cadastre-se</Link>
        </div>
        </section>
        </div>
    </div>
    )
}