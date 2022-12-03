import React from 'react';
import { CustomInputTypes } from '../../interfaces/form';
import '../form/style.css';

export const CustomInput = ({
    title,
    register,
    type,
    placeholder,
    value,
    handleChange,
    errorMessage
}: CustomInputTypes) => {
    return <div className="input__container">
        <label>{title}</label>
        <input
            type={type || 'text'}
            placeholder={placeholder}
            {...register()}
            value={value}
            onChange={handleChange}
        />
        <span className='error'>{errorMessage}</span>
    </div>
}