import React, { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Form from './components/Form';
import { FormType } from './type';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [services, setServices] = useState<FormType[]>([]);
  const [hidePasswords, setHidePasswords] = useState<boolean>(true);
  const [serviceAdded, setServiceAdded] = useState(false);

  const handleClick = () => {
    setShowForm(!showForm);
  };

  const handleChange = () => {
    setHidePasswords((prevHidePasswords) => !prevHidePasswords);
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
            <div>
              <p>
                Senha:
                { hidePasswords ? '❌❌❌❌❌❌' : service.renderingPassword }
              </p>

              <button
                className="btn"
                aria-label="Toggle Password Visibility"
                type="button"
                onClick={ handleChange }
              >
                { hidePasswords ? (
                  <VisibilityOffIcon />
                ) : (
                  <VisibilityIcon />
                )}
              </button>
            </div>

            <button
              className="btn btn-outline-danger"
              data-testid="remove-btn"
              type="button"
              onClick={ () => handleRemoveService(index) }
            >
              Remover
              <CancelIcon style={ { marginLeft: '5px' } } />
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
      </div>
    </div>
  );
}

export default App;
