const INITIAL_STATE = {
    currencies: [],
    expenses: [],
    editor: false,
    idToEdit: 0,
    somatorio: 0,
  };
  
  const wallet = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;
    switch (type) {
    case 'ALTERA_CURRENCIE':
      return ({
        ...state,
        currencies: payload,
      });
    case 'ADD_DESPESA':
      return ({
        ...state,
        expenses:
        [
          ...state.expenses,
          {
            id: payload.id,
            value: payload.valor,
            description: payload.description,
            currency: payload.moeda,
            method: payload.pagamento,
            tag: payload.categoria,
            exchangeRates: payload.req,
            tipografia: payload.tipografia,
          }],
      });
    case 'EXCLUIR_DESPESA':
      return ({
        ...state,
        expenses: payload,
      });
    case 'SOMA_VALORES':
      return ({
        ...state,
        somatorio: Number(state.somatorio) + Number(payload),
      });
    case 'SUBTRAI_DESPESA':
      return ({
        ...state,
        somatorio: Number(state.somatorio) - Number(payload),
      });
    default:
      return state;
    }
  };
  
  export default wallet;
  