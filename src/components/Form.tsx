import React, { useState } from 'react';
// Props é sempre um objeto
type FormProps = {
  onCancelForm: () => void,
};

function Form({ onCancelForm } : FormProps) {
  const [serviceName, setServiceName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [url, setUrl] = useState('');

  const inputValidation = () => {
    const inputServiceName = /^[a-zA-Z0-9 _-]+$/;
    const inputLogin = /^(?:[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63})$|^[a-zA-Z0-9._-]{2,16}$/;
    const inputPassword = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$!%^&*?])[a-zA-Z\d@#$!%^&*?]{8,16}$/i;
    const inputURL = /^(ftp|http|https):\/\/[^ "]+$/;

    const validService = inputServiceName.test(serviceName);
    const validLogin = inputLogin.test(login);
    const validPassword = inputPassword.test(password);
    const validURL = inputURL.test(url);

    if (!validPassword) {
      const numLength = /.{8,16}/.test(password);
      const hasLettersAndNumber = /^(?=.*[a-zA-Z])(?=.*\d)/.test(password);
      const hasSpecialCharacters = /[@#$!%^&*?]/.test(password);

      // if (!hasMinimumLength) {
      //   const mensage1 = 'Possuir 8 ou mais caracteres'
      //   return mensage1;
      // } if (!hasMaximumLength) {
      //   const mensage2 = 'Possuir até 16 caracteres';
      //   return mensage2;
      // } if (!hasLettersAndNumber) {
      //   const mensage3 = 'Possuir letras e números';
      //   return mensage3;
      // } if (!hasSpecialCharacters) {
      //   const mensage4 = 'Possuir algum caractere especial';
      //   return mensage4;
      // }
    }

    return (validLogin && validPassword && validURL && validService);
  };

  const handleServiceNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setServiceName(event.target.value);
  };
  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  return (
    <div>
      <form>
        <label>
          Nome do serviço
          <input type="text" value={ serviceName } onChange={ handleServiceNameChange } />
        </label>

        <label>
          Login
          <input type="text" value={ login } onChange={ handleLoginChange } />
        </label>

        <label>
          Senha
          <input type="password" value={ password } onChange={ handlePasswordChange } />
          <p className={ validatePassword(password) ? 'valid-password-check' : 'invalid-password-check' }></p>
          <p className={ !validatePassword(password) && !numLength(password) ? 'invalid-password-check' : 'valid-password-check' }></p>
          <p className={ !validatePassword(password) && !hasLettersAndNumber(password) ? 'invalid-password-check' : '' }></p>
          <p className={ !validatePassword(password) && hasSpecialCharacters(password) ? 'valid-password-check' : '' }></p>
        </label>

        <label>
          URL
          <input type="text" value={ url } onChange={ handleUrlChange } />
        </label>

        <button type="submit" disabled={ !inputValidation() }>
          Cadastrar
        </button>

        <button type="button" onClick={ onCancelForm }>
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default Form;
