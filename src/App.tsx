import React, { useState } from 'react';
import Form from './components/Form';
import { FormType } from './type';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [services, setServices] = useState<FormType[]>([]);
  const [hidePasswords, setHidePasswords] = useState<boolean>(false);
  const [serviceAdded, setServiceAdded] = useState(false);

  const handleClick = () => {
    setShowForm(!showForm);
  };

  const handleFormSubmit = (serviceData:FormType) => {
    setServices([...services, serviceData]);
    setShowForm(false);

    setServiceAdded(true);

    setTimeout(() => {
      setServiceAdded(false);
    }, 1500);
  };

  const handleRemoveService = (index: number) => {
    const updatedServices = services.filter((service, i) => i !== index);
    setServices(updatedServices);
  };

  return (
    <div>

      <header>
        <h1>Gerenciador de senhas</h1>
      </header>

      <h2>Lista de Serviços</h2>

      { services.length === 0 && !showForm
        && <p className="no-password">Nenhuma senha cadastrada</p> }

      <ul>
        {services.map((service, index) => (
          <li key={ index }>
            <a href={ service.renderingURL }>{ service.renderingService }</a>
            <p>
              Login:
              { service.renderingLogin }
            </p>
            <p>
              Senha:
              { hidePasswords ? '❌❌❌❌❌❌' : service.renderingPassword }
            </p>
            <button
              data-testid="remove-btn"
              type="button"
              onClick={ () => handleRemoveService(index) }
            >
              Remover
            </button>
          </li>
        ))}
      </ul>

      <div className="check-container">
        {showForm ? (
          <Form
            onCancelForm={ handleClick }
            onFormSubmit={ handleFormSubmit }
          />
        ) : (
          <button
            className="btn btn-outline-success"
            onClick={ handleClick }
          >
            Cadastrar nova senha
          </button>
        )}

        { serviceAdded && <p>Serviço cadastrado com sucesso</p> }

        <label
          className="check-name"
          htmlFor="passwordInput"
        >
          <input
            className="form-check-input"
            type="checkbox"
            id="passwordInput"
            checked={ hidePasswords }
            onChange={ () => setHidePasswords(!hidePasswords) }
          />
          Esconder senhas
        </label>
      </div>
    </div>
  );
}

export default App;
