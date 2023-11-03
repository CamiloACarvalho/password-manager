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

  const format1 = 'link-success link-offset-2 link-underline-opacity-25 ';
  const format3 = 'link-underline-opacity-100-hover';

  return (
    <div>

      <header>
        <h1>Gerenciador de senhas</h1>
      </header>

      <h2>Lista de Serviços</h2>

      { services.length === 0 && !showForm
        && <p className="no-password">Nenhuma senha cadastrada</p> }

      <div className="card">
        {services.map((service, index) => (
          <ul key={ index }>
            <h3>
              #id { index }
            </h3>
            <p>
              <a
                className={ format1 + format3 }
                href={ service.renderingURL }
              >
                <strong>{ service.renderingService }</strong>
              </a>
            </p>
            <p>
              <strong>Login:</strong> { service.renderingLogin }
            </p>
            <div>
              <strong>Senha:</strong> { hidePasswords ? '❌❌❌❌❌' : service.renderingPassword }

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
          </ul>
        ))}
      </div>

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
