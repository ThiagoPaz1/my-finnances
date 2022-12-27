import React, { useState } from 'react';
import '../cadastro/style.css';
import '../../css/global.css'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import validator from 'validator'
import axios from 'axios';
import { Navigate } from "react-router-dom";
import { validName, validPassword, validEmail } from "../../utils/regex";
import {countDown} from '../../utils/Modal';
import { FildForm } from '../../interfaces/filds';
import { CustomInput } from '../../components/form';
import { PrimaryButton } from '../../components/button';
import { modalSuccess } from '../../components/modal/modal'

// interface IFildForm {
//   name: string,
//   email: string,
//   password: string,
//   confirmPassword: string,
// }

// const schema = object({
//   name: string().required("Campo obrigatório"),
//   email: string().required("Campo obrigatório."),
//   password: string().required("Campo obrigatório.").min(8, "Você precisa inserir pelo menos 8 caracteres").max(16, "Sua senha não pode exceder 16 caracteres"),
//   confirmPassword: string().required("Campo obrigatório.").min(8, "Você precisa inserir pelo menos 8 caracteres").max(16, "Sua senha não pode exceder 16 caracteres")
// })

const defaultValuesFieldsForm: FildForm = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export default function Cadastro() {
  const [fildsForm, setFildsForm] = useState<FildForm>(defaultValuesFieldsForm);
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [emptyValues, setEmptyValues] = useState(false);

  console.log(errors);
  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFildsForm({ ...fildsForm, [name]: value });

    let emptyValues = Object.values(fildsForm).some(obj => obj == "");
    setEmptyValues(emptyValues);
  }


  

  // const handleSubmit = async () => {
  //   console.log("teste");
    
  //   if (fildsForm.name && fildsForm.email && fildsForm.password) {
  //     const body = {
  //       name: fildsForm.name,
  //       email: '',
  //       password: fildsForm.password
  //     }

  //     try {
  //       const request = await axios.post('http://localhost:3000/user', body)
  //       const response = await request.data

  //       setFildsForm(defaultValuesFieldsForm);
  //     } catch (error) {
  //       console.log(error)
  //     }

  //   }
  // }

  const watchPassword = watch('password');
  const [goToLogin, setToLogin] = useState(false);

  if(goToLogin){
    return <Navigate to="/" />
  }

  const maut = () => {
    setToLogin(true)
  }  

  const onSubmit = (data:any) => {
    console.log(data);
    // alert(JSON.stringify(data))

    modalSuccess({handleSubmit: maut});
  }

  return (
    <div>
      <div className="container__cadastro">
        <header>
          <h1>Cadastro</h1>
        </header>

        <section>
          {/* <form action="" className='form' onSubmit={onSubmit(handleSubmit)}> */}
            <div className="form__container">
              <CustomInput 
                title="Nome"
                type="text"
                handleChange={handleChange}
                placeholder="Digite seu nome"
                value={fildsForm.name}
                register={() => register("name", {required: true})}
              />
              {errors?.name?.type === "required" && (
                <p className="error-message">Nome obrigatório.</p>
              )}

              <CustomInput 
                title="Email"
                type="email"
                handleChange={handleChange}
                placeholder="Digite seu email"
                value={fildsForm.email}
                register={() => register("email", {
                  required: true,
                  validate: (value) => validator.isEmail(value),
                })}
              />

              {errors?.email?.type === "required" && (
                <p className="error-message">E-mail obrigatório.</p>
              )}

              {errors?.email?.type === "validate" && (
                <p className="error-message">E-mail inválido.</p>
              )}

              <CustomInput 
                title="Senha"
                type="password"
                handleChange={handleChange}
                placeholder="Digite sua senha"
                value={fildsForm.password}
                register={() => register("password", {
                  required: true,
                  minLength: 8,
                })}
              />

              {errors?.password?.type === "required" && (
                <p className="error-message">Senha obrigatória.</p>
              )}
              {errors?.password?.type === "minLength" && (
                <p className="error-message">A senha precisa ter pelomenos 7 caracteres.</p>
              )}

              <CustomInput 
                title="Confirmação de senha"
                type="password"
                handleChange={handleChange}
                placeholder="Confirmação de senha"
                value={fildsForm.confirmPassword}
                register={() => register("confirmPassword", { 
                  required: true, 
                  minLength: 8,
                  validate: (value) => value === watchPassword,
                })}
              />
              {errors?.password?.type === "required" && (
                <p className="error-message">Senha obrigatória.</p>
              )}
              {errors?.confirmPassword?.type === "minLength" && (
                <p className="error-message">A senha precisa ter pelomenos 7 caracteres.</p>
              )}

              {errors?.confirmPassword?.type === "validate" && (
                <p className="error-message">As senhas não correspondem.</p>
              )}
              {/* <div className="checkbox-group">
                <CustomInput
                  title="Eu concordo com os termos de privacidade."
                  type="checkbox"
                  handleChange={handleChange}
                  register={() => register("privacy")}
                  value={fildsForm.privacy}
                />
              </div> */}

              <PrimaryButton 
                title= "Cadastrar"
                handleSubmit={() => handleSubmit(onSubmit)()}
              />

              {/* <button onClick={()=> handleSubmit(onSubmit)()}>Cadastrar</button> */}
            </div>
        </section>
      </div>
    </div>
  )
}