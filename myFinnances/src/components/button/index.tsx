import React from 'react';
import '../button/style.css';

export const PrimaryButton = ({ title, handleSubmit }: any) => {
    return <div className="primary-button__container">
        <button onClick={handleSubmit}>{title}</button>
    </div>
}