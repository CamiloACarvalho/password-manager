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
