import React, { useState } from 'react';
import '../css/global.css'
import '../css/cadastro.css'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import axios from 'axios'
import { validName, validPassword, validEmail } from "../utils/regex"

interface IFildForm {
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
}

const schema = object({
  name: string().required("Campo obrigatório"),
  email: string().required("Campo obrigatório."),
  password: string().required("Campo obrigatório.").min(8, "Você precisa inserir pelo menos 8 caracteres").max(16, "Sua senha não pode exceder 16 caracteres"),
  confirmPassword: string().required("Campo obrigatório.").min(8, "Você precisa inserir pelo menos 8 caracteres").max(16, "Sua senha não pode exceder 16 caracteres")
})

const defaultValuesFieldsForm: IFildForm = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
}

export default function Cadastro() {
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [fildsForm, setFildsForm] = useState<IFildForm>(defaultValuesFieldsForm);
  const { register, handleSubmit: onSubmit, watch, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFildsForm({ ...fildsForm, [name]: value });
  }

  const handleSubmit = async () => {
    if (!nameError && !passwordError && !emailError) {
      const body = {
        name: fildsForm.name,
        email: '',
        password: fildsForm.password
      }

      try {
        const request = await axios.post('http://localhost:3000/user', body)
        const response = await request.data
        console.log(response)
        setFildsForm(defaultValuesFieldsForm);
      } catch (error) {
        console.log(error)
      }

    }
  }

  const validateFieldsForm = () => {
    if (!validName.test(fildsForm.name)) {
      setNameError(true);
    }

    if (!validPassword.test(fildsForm.password)) {
      setPasswordError(true);
    }

    if (!validEmail.test(fildsForm.email)) {
      setEmailError(true);
    }

    if (fildsForm.password !== fildsForm.confirmPassword) {
      setPasswordError(true)
    }
  }

  console.log(fildsForm);

  return (
    <div>
      <div className="container">
        <header>
          <h1>Cadastro</h1>
        </header>

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
              {
                passwordError ?
                  <p>
                    A senha precisa ter letra maiscula, miniscula, um caracter especial, e número e no minimo 8 digitos
                  </p>
                  : ''
              }
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
              {passwordError ? <p>As senhas não correspondem</p> : ''}
            </div>

            <input className='submit' type="submit" value="Cadastrar" onClick={validateFieldsForm} />
          </form>
        </section>
      </div>
    </div>
  )
}