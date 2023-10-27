import React from 'react';
// Props é sempre um objeto
type FormProps = {
  onCancelForm: () => void,
};

function Form({ onCancelForm } : FormProps) {
  const inputValidation = () => {
    const inputServiceName = /^[a-zA-Z0-9 _-]+$/;
    const inputLogin = /^[a-zA-Z0-9 _-]+$/;
    const inputPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/;

    const inputValidServiceName = inputServiceName.test();
    const inputValidLogin = inputLogin.test();
    const inputValidPassword = inputPassword.test();

    return inputValidLogin && inputValidPassword && inputValidServiceName;
  };

  return (
    <div>
      <form>
        <label>
          Nome do serviço
          <input type="text" />
        </label>

        <label>
          Login
          <input type="text" />
        </label>

        <label>
          Senha
          <input type="password" />
        </label>

        <label>
          URL
          <input type="text" />
        </label>

        <button type="submit">Cadastrar</button>
        <button onClick={ onCancelForm }>Cancelar</button>
      </form>
    </div>
  );
}

export default Form;
