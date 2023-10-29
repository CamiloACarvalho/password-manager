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

  const handleFormSubmit = (serviceData) => {
    setServices([...services, serviceData]);
    setShowForm(false);
  };

  return (
    <div>
      <h1>Gerenciador de senhas</h1>

      <h3>Lista de Serviços</h3>
      {services.length === 0 && !showForm && <p>Nenhuma senha cadastrada</p>}
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
              { service.renderingPassword }
            </p>
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
