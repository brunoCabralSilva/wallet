export const soma = (valor) => ({
    type: 'SOMA_VALORES',
    payload: valor,
  });

export const subtraiDespesa = (state) => ({
    type: 'SUBTRAI_DESPESA',
    payload: state,
  });

  export const actionEmail = (email) => ({
    type: 'ALTERA_EMAIL',
    payload: email,
  });

  export const excluiDespesa = (state) => ({
    type: 'EXCLUIR_DESPESA',
    payload: state,
  });

  export const addDespesa = (state) => ({
    type: 'ADD_DESPESA',
    payload: state,
  });

  export const actionCurrencie = (currencie) => ({
    type: 'ALTERA_CURRENCIE',
    payload: currencie,
  });
  