import React from 'react';
// Props é sempre um objeto
type FormProps = {
  onCancelForm: () => void,
};

function Form({ onCancelForm } : FormProps) {
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
