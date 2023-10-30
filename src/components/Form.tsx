import React, { useState } from 'react';
import { FormType } from '../type';

type FormProps = {
  onCancelForm: () => void;
  onFormSubmit: (serviceData: FormType) => void;
  hidePasswords: boolean;
  setHidePasswords: React.Dispatch<React.SetStateAction<boolean>>;
};

function Form({
  onCancelForm,
  onFormSubmit,
  hidePasswords,
  setHidePasswords,
}: FormProps) {
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

    return validService && validLogin && validPassword && validURL;
  };

  const lessLength = password.length >= 8;
  const highLength = password.length <= 16;
  const letterNum = /^(?=.*[a-zA-Z])(?=.*\d)/.test(password);
  const specialChar = /[@#$!%^&*?]/.test(password);

  const valid = 'valid-password-check';
  const invalid = 'invalid-password-check';

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputValidation()) {
      const serviceData = {
        renderingService: serviceName,
        renderingLogin: login,
        renderingPassword: password,
        renderingURL: url,
      };
      onFormSubmit(serviceData);

      setServiceName('');
      setLogin('');
      setPassword('');
      setUrl('');
    }
  };

  return (
    <div>
      <form onSubmit={ handleSubmit }>
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
          <input
            type={ hidePasswords ? 'password' : 'text' }
            value={ password }
            onChange={ handlePasswordChange }
          />
        </label>

        <label>
          URL
          <input type="text" value={ url } onChange={ handleUrlChange } />
        </label>

        <div>
          <p className={ lessLength ? valid : invalid }>
            { lessLength ? '' : 'Possuir 8 ou mais caracteres' }
          </p>
          <p className={ highLength ? valid : invalid }>
            { highLength ? '' : 'Possuir até 16 caracteres' }
          </p>
          <p className={ letterNum ? valid : invalid }>
            { letterNum ? '' : 'Possuir letras e números' }
          </p>
          <p className={ specialChar ? valid : invalid }>
            { specialChar ? '' : 'Possuir algum caractere especial' }
          </p>
        </div>

        <button type="submit" disabled={ !inputValidation() }>
          Cadastrar
        </button>

        <button type="button" onClick={ onCancelForm }>
          Cancelar
        </button>

        <input
          type="checkbox"
          id="passwordInput"
          checked={ hidePasswords }
          onChange={ () => setHidePasswords(!hidePasswords) }
        />
        <label htmlFor="passwordInput">Esconder senhas</label>
      </form>
    </div>
  );
}

export default Form;
