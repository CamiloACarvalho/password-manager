import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { FormType } from '../type';

type FormProps = {
  onCancelForm: () => void;
  onFormSubmit: (serviceData: FormType) => void;
};

function Form({
  onCancelForm,
  onFormSubmit,
}: FormProps) {
  const [serviceName, setServiceName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [url, setUrl] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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

      onCancelForm();

      Swal.fire({
        title: 'Seu serviço foi cadastrado com sucesso',
        timer: 1500,
      });
    }
  };

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <label>
          Nome do serviço
          <input
            className="service"
            type="text"
            value={ serviceName }
            onChange={ handleServiceNameChange }
          />
        </label>

        <label>
          Login
          <input type="text" value={ login } onChange={ handleLoginChange } />
        </label>

        <label>
          Senha
          <input
            type={ showPassword ? 'text' : 'password' }
            value={ password }
            onChange={ (event) => setPassword(event.target.value) }
          />
        </label>

        <button
          data-testid="show-hide-form-password"
          type="button"
          onClick={ () => setShowPassword(!showPassword) }
        >
          { showPassword ? 'Ocultar Senha' : 'Mostrar Senha' }
        </button>

        <label>
          URL
          <input type="text" value={ url } onChange={ handleUrlChange } />
        </label>

        <div>
          <p className={ lessLength ? valid : invalid }>
            Possuir 8 ou mais caracteres
          </p>
          <p className={ highLength ? valid : invalid }>
            Possuir até 16 caracteres
          </p>
          <p className={ letterNum ? valid : invalid }>
            Possuir letras e números
          </p>
          <p className={ specialChar ? valid : invalid }>
            Possuir algum caractere especial
          </p>
        </div>

        <button
          type="submit"
          disabled={ !inputValidation() }
        >
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
