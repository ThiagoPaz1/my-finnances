import React from 'react';
import { Modal } from 'antd';

export function countDown() {
  let secondsToGo = 5;

  const modal = Modal.success({
    title: 'Cadastro realizado com sucesso!',
    content: `Você será redirecionado a página de login em ${secondsToGo} segundos.`,
  });

  const timer = setInterval(() => {
    secondsToGo -= 1;
    modal.update({
      content: `Você será redirecionado a página de login em ${secondsToGo} segundos.`,
    });
  }, 1000);

  setTimeout(() => {
    clearInterval(timer);
    modal.destroy();
  }, secondsToGo * 1000);
};