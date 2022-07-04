import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addDespesa, soma } from '../actions';
import { motion } from 'framer-motion';

class Despesas extends React.Component {
  state = {
    valor: '',
    description: '',
    categoria: 'Alimentação',
    moeda: 'USD',
    pagamento: 'Cartão de crédito',
    id: 0,
    req: [],
    tipografia: '$',
  }

  retornaCurrencie = () => {
    const { currencie } = this.props;

    if (currencie) {
      const lista = currencie.map((curr) => <option className="b" value={curr} key={ curr }>{curr}</option>);
      return lista;
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
    if(name === 'moeda') {
      switch(value){
      case 'GBP':
        this.setState({tipografia:'£'});
        break;
      case 'BTC':
        this.setState({tipografia:'₿'});
        break;
      case 'LTC':
        this.setState({tipografia:'Ł'});
        break;
      case 'EUR':
        this.setState({tipografia:'€'});
        break;
      case 'JPY':
        this.setState({tipografia:'¥'});
        break;
      case 'CHF':
        this.setState({tipografia:'Fr'});
        break;
      case 'CNY':
        this.setState({tipografia:'¥'});
        break;
      case 'ILS':
        this.setState({tipografia:'₪'});
        break;
      case 'DOGE':
        this.setState({tipografia:'Ð'});
        break;
      default: 
        this.setState({tipografia:'$'});
        break;;
      }
    }
  }

  retornaValorDespesa = () => {
    const { somaValor } = this.props;
    const { req, valor, moeda } = this.state;
    const reqArray = Object.entries(req);
    const findCot = reqArray.find((cot) => cot[0] === moeda);
    const cotSelected = Number(valor) * Number(findCot[1].ask);
    somaValor(cotSelected);
  }

  salvaDespesa = async () => {
    const req = await fetch('https://economia.awesomeapi.com.br/json/all');
    const reqJson = await req.json();
    this.setState({ req: reqJson });
    const { enviaParaStore } = this.props;
    this.retornaValorDespesa();
    enviaParaStore(this.state);
    this.setState((prevState) => ({
      valor: '',
      description: '',
      req: [],
      id: prevState.id + 1,
    }));
  }

  render() {
    const {
      valor,
      description,
    } = this.state;
    return (
      <div className="flex flex-col mx-2 lg:w-screen15 w-11/12 lg:h-screen85 text-white justify-center mb-3">
        <h1 className="flex lg:hidden w-full text-2xl text-white bg-half-transparent2 py-3 flex mb-2 justify-center">Cadastre uma Despesa:</h1>
      <motion.div
        initial={{y:20, opacity:0}}
        animate={{y:0, opacity:1}}
        transition={{delay:0.5, duration:0.5}}
        exit={{y:20, opacity: 0, transition:{duration:0.5}}}
        className="flex flex-col lg:w-screen15 w-full bg-half-transparent sm:h-screen85 p-2 text-white">
        <label htmlFor="value-input" className="flex flex-col w-full">
        <strong className="px-1 pb-1">Valor</strong>
          <input
            id="value-input"
            name="valor"
            value={ valor }
            type="number"
            data-testid="value-input"
            className="p-1 text-center bg-brown-transparent"
            onChange={ this.handleChange }
          />
        </label>
        <br />
        <label htmlFor="description-input" className="flex flex-col w-full">
        <strong className="px-1 pb-1">Descrição</strong>
          <textarea
            name="description"
            value={ description }
            id="description-input"
            data-testid="description-input"
            className="p-1 bg-brown-transparent"
            onChange={ this.handleChange }
          />
        </label>
        <br />
        <label htmlFor="currencies" className="flex flex-col w-full">
        <strong className="px-1 pb-1">Moeda</strong>
          <select
            name="moeda"
            id="currencies"
            className='p-1 bg-brown-transparent'
            onChange={ this.handleChange }
          >
            {this.retornaCurrencie()}
          </select>
        </label>
        <br />
        <label htmlFor="payment" className="flex flex-col w-full">
        <strong className="px-1 pb-1">Pagamento</strong>
          <select
            id="payment"
            data-testid="method-input"
            name="pagamento"
            className='p-1 bg-brown-transparent'
            onChange={ this.handleChange }
          >
            <option className="bg-brown-transparent b" value="Cartão de crédito">Cartão de crédito</option>
            <option className="bg-brown-transparent b" value="Cartão de débito">Cartão de débito</option>
            <option className="bg-brown-transparent b" value="Dinheiro">Dinheiro</option>
          </select>
        </label>
        <br />
        <label htmlFor="categoria" className="flex flex-col w-full">
        <strong className="px-1 pb-1">Categoria</strong>
          <select
            id="categoria"
            name="categoria"
            data-testid="tag-input"
            className="p-1 bg-brown-transparent"
            onChange={ this.handleChange }
          >
            <option value="Alimentação" className='b'>Alimentação</option>
            <option value="Lazer" className='p-1 bg-brown-transparent b'>Lazer</option>
            <option value="Trabalho" className='p-1 bg-brown-transparent b'>Trabalho</option>
            <option value="Transporte" className='p-1 bg-brown-transparent b'>Transporte</option>
            <option value="Saúde" className='p-1 bg-brown-transparent b'>Saúde</option>
          </select>
        </label>
        <br />
        <button
          type="button"
          className="w-full bg-stone-800 hover:bg-brown-transparent transition duration-500 p-3 text-white"
          onClick={ this.salvaDespesa }
        >
          Adicionar Despesa
        </button>
      </motion.div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencie: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  enviaParaStore: (array) => dispatch(addDespesa(array)),
  somaValor: (valor) => dispatch(soma(valor)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Despesas);

Despesas.propTypes = {
  currencie: PropTypes.string.isRequired,
  enviaParaStore: PropTypes.func.isRequired,
  somaValor: PropTypes.func.isRequired,
};
