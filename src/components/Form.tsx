import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { FormType } from '../type';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Form.module.css';

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

  const inputPassword = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$!%^&*?])[a-zA-Z\d@#$!%^&*?]{8,16}$/i;
  const validPassword = inputPassword.test(password);

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
      <form
        onSubmit={ handleSubmit }
        className="input-form"
      >
        <div className="form-floating mb-3">
          <input
            placeholder="Nome do seriço"
            className="form-control"
            type="text"
            value={ serviceName }
            onChange={ handleServiceNameChange }
          />
          <label>Nome do Serviço</label>
        </div>

        <div className="form-floating mb-3">
          <input
            placeholder="Login"
            className="form-control"
            type="text"
            value={ login }
            onChange={ handleLoginChange }
          />
          <label>Login</label>
        </div>

        <div className="form-floating mb-3">
          <input
            placeholder="Senha"
            className="form-control"
            type={ showPassword ? 'text' : 'password' }
            value={ password }
            onChange={ (event) => setPassword(event.target.value) }
          />
          <label>Senha</label>
          { (password.length) ? (
            <div>
              <p className={ lessLength ? valid : invalid }>
                {password.length < 8 ? 'Mínimo 8 caracteres' : ''}
              </p>
              <p className={ highLength ? valid : invalid }>
                {password.length > 16 ? 'Máximo 16 caracteres' : ''}
              </p>
              <p className={ letterNum ? valid : invalid }>
                {!letterNum ? 'Deve conter letras e números' : ''}
              </p>
              <p className={ specialChar ? valid : invalid }>
                {!specialChar ? 'Deve conter algum caractere especial' : ''}
              </p>
              <p className={ validPassword ? valid : invalid }>
                { validPassword ? 'Senha forte' : ''}
              </p>
            </div>
          ) : (null) }
        </div>

        <div className="form-floating mb-3">
          <input
            placeholder="URL"
            className="form-control"
            type="text"
            value={ url }
            onChange={ handleUrlChange }
          />
          <label>URL</label>
        </div>

        <button
          className="btn btn-outline-success"
          type="submit"
          disabled={ !inputValidation() }
        >
          Cadastrar
        </button>

        <button
          className="btn btn-outline-warning"
          data-testid="show-hide-form-password"
          type="button"
          onClick={ () => setShowPassword(!showPassword) }
        >
          { showPassword ? 'Ocultar Senha' : 'Mostrar Senha' }
        </button>

        <button
          className="btn btn-outline-danger"
          type="button"
          onClick={ onCancelForm }
        >
          Cancelar
        </button>

      </form>
    </div>
  );
}

export default Form;
