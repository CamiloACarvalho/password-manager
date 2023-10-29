import React, { useState } from 'react';
import Form from './components/Form';
import { FormType } from './type';
import './App.css';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [services, setServices] = useState<FormType[]>([]);

  const handleClick = () => {
    setShowForm(!showForm);
  };

  const handleFormSubmit = (serviceData:FormType) => {
    setServices([...services, serviceData]);
    setShowForm(false);
  };

  const handleRemoveService = (index: number) => {
    const updatedServices = services.filter((service, i) => i !== index);
    setServices(updatedServices);
  };

  return (
    <div>
      <h1>Gerenciador de senhas</h1>

      <h2>Lista de Serviços</h2>
      {services.length === 0 && !showForm && <p>Nenhuma senha cadastrada</p>}
      <ul>
        {services.map((service, index) => (
          <li key={ index }>
            <a href={ service.renderingURL }>{service.renderingService}</a>
            <p>
              Login:
              {service.renderingLogin}
            </p>
            <p>
              Senha:
              {service.renderingPassword}
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
      {showForm ? (
        <Form onCancelForm={ handleClick } onFormSubmit={ handleFormSubmit } />
      ) : (
        <button onClick={ handleClick }>Cadastrar nova senha</button>
      )}
    </div>
  );
}

export default App;
