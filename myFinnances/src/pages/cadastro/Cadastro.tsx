import React, { useState } from 'react';
import '../cadastro/style.css';
import '../../css/global.css'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import axios from 'axios';
import { validName, validPassword, validEmail } from "../../utils/regex";
import {countDown} from '../../utils/Modal';
import { FildForm } from '../../interfaces/filds';
import { CustomInput } from '../../components/form';
import { PrimaryButton } from '../../components/button';



// interface IFildForm {
//   name: string,
//   email: string,
//   password: string,
//   confirmPassword: string,
// }

const schema = object({
  name: string().required("Campo obrigatório"),
  email: string().required("Campo obrigatório."),
  password: string().required("Campo obrigatório.").min(8, "Você precisa inserir pelo menos 8 caracteres").max(16, "Sua senha não pode exceder 16 caracteres"),
  confirmPassword: string().required("Campo obrigatório.").min(8, "Você precisa inserir pelo menos 8 caracteres").max(16, "Sua senha não pode exceder 16 caracteres")
})

const defaultValuesFieldsForm: FildForm = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
}

export default function Cadastro() {
  const [fieldErro, setFieldErro] = useState(false);
  const [fildsForm, setFildsForm] = useState<FildForm>(defaultValuesFieldsForm);
  const { register, handleSubmit: onSubmit, watch, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  const [emptyValues, setEmptyValues] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFildsForm({ ...fildsForm, [name]: value });

    let emptyValues = Object.values(fildsForm).some(obj => obj == "");
    setEmptyValues(emptyValues);
  }

  const handleSubmit = async () => {
    console.log("teste");
    
    if (fildsForm.name && fildsForm.email && fildsForm.password) {
      const body = {
        name: fildsForm.name,
        email: '',
        password: fildsForm.password
      }

      try {
        const request = await axios.post('http://localhost:3000/user', body)
        const response = await request.data

        setFildsForm(defaultValuesFieldsForm);
      } catch (error) {
        console.log(error)
      }

    }
  }
  
  console.log(fildsForm);

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
                register={() => register("name")}
                placeholder="Digite seu nome"
                value={fildsForm.name}
              />

              <CustomInput 
                title="Email"
                type="email"
                handleChange={handleChange}
                register={() => register("email")}
                placeholder="Digite seu email"
                value={fildsForm.email}
              />

              <CustomInput 
                title="Senha"
                type="password"
                handleChange={handleChange}
                register={() => register("password")}
                placeholder="Digite sua senha"
                value={fildsForm.password}
              />

              <CustomInput 
                title="Confirmação de senha"
                type="password"
                handleChange={handleChange}
                register={() => register("confirmPassword")}
                placeholder="digite sua senha"
                value={fildsForm.confirmPassword}
              />

              <PrimaryButton 
                title= "Cadastrar"
              />
            </div>
        </section>
      </div>
    </div>
  )
}