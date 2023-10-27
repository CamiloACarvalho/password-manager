import React, { useState } from 'react';
import Form from './components/Form';
import './App.css';

function App() {
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      <h1>Gerenciador de senhas</h1>
      {showForm ? (
        <Form onCancelForm={ handleClick } />
      ) : (
        <button onClick={ handleClick }>Cadastrar nova senha</button>
      )}
    </div>
  );
}

export default App;
