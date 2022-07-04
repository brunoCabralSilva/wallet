import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionEmail } from '../actions/index';
import imagem from '../images/favpng_wallet-icon.png';
import { motion } from 'framer-motion';

class Login extends React.Component {
  state={
    email: '',
    senha: '',
    desabilitar: false,
  }

  salvaEstadoLocal = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  redireciona = () => {
    const { email } = this.state;
    const { history, salvaEmail } = this.props;
    salvaEmail(email);
    history.push('/carteira');
  }

  disable = () => {
    const caracterMinimo = 6;
    const { email, senha } = this.state;
    const validacao = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return !(validacao.test(email) && senha.length >= caracterMinimo);
  }

  desabilitaClass = () => {
    const caracterMinimo = 6;
    const { email, senha } = this.state;
    const validacao = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (!(validacao.test(email) && senha.length >= caracterMinimo)) {
      return 'bg-brown-transparent transition duration-500';
    } return 'bg-black border border-white transition duration-500';
  }

  render() {
    const { email, senha, desabilitar } = this.state;
    return (
        <div className="flex flex-row justify-center w-full h-screen items-center bg-stone-400">
          <img
              src={require('../images/wallet.jpg')}
              className="w-full h-full object-cover absolute z-0"
              alt="Carteira"
            />
            <motion.div
            initial={{y:20, opacity:0}}
            animate={{y:0, opacity:1}}
            transition={{delay:0.3, duration:0.5}}
            exit={{y:20, opacity: 0, transition:{duration:0.5}}}
            className="flex flex-col justify-center items-center p-10 bg-half-transparent border border-slate-900 z-10">
            <img
              src={ imagem }
              className="w-20"
              alt="carteira"
            />
            <p className="text-center m-5 text-white font-bold">TrybeWallet</p>
            <input
              type="email"
              value={ email }
              name="email"
              data-testid="email-input"
              className="text-center p-2 m-1 bg-brown-transparent text-white font-medium w-full"
              placeholder="Login"
              onChange={ this.salvaEstadoLocal }
            />
            <input
              type="password"
              value={ senha }
              name="senha"
              data-testid="password-input"
              className="text-center p-2 mt-1 mb-1 bg-brown-transparent text-white w-full font-medium"
              placeholder="Senha"
              onChange={ this.salvaEstadoLocal }
            />
          <button
            type="button"
            className={`p-2 m-1 mt-2 w-full ${ this.desabilitaClass() } text-white font-medium`}
            disabled={ this.disable() }
            onClick={ this.redireciona }
          >
            Entrar
          </button>
          </motion.div>
          </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  salvaEmail: (email) => dispatch(actionEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  salvaEmail: PropTypes.func.isRequired,
};
