import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionCurrencie } from '../actions';
import { motion } from 'framer-motion';
import imagem from '../images/favpng_wallet-icon.png';

class Header extends React.Component {
  async componentDidMount() {
    const { addCurr } = this.props;
    const url = 'https://economia.awesomeapi.com.br/json/all';
    const usdt = 'USDT';
    const urlFetch = await fetch(url);
    const urlJson = await urlFetch.json();
    const currencies = Object.keys(urlJson);
    const currFilered = currencies.filter((cur) => cur !== usdt);
    addCurr(currFilered);
  }

  render() {
    const { email, somatorio } = this.props;
    let valorSoma = 0;
    if (somatorio) valorSoma = somatorio.toFixed(2);
    return (
      <motion.div
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{delay:0.3, duration:0.5}}
        exit={{opacity: 0, transition:{duration:0.5}}}
        className="p-4 bg-half-transparent w-11/12 lg:w-full mx-auto flex flex-col lg:flex-row">
        <motion.div
          initial={{x:20, opacity:0}}
          animate={{x:0, opacity:1}}
          transition={{delay:0.5, duration:0.5}}
          exit={{x:20, opacity: 0, transition:{duration:0.5}}}
          className="flex flex-row justify-center lg:justify-start items-center lg:mx-4 lg:w-1/2 mb-4 lg:mb-0"
        >
            <img
                src={ imagem }
                className="w-10"
                alt="carteira"
            />
            <p className="text-white p-3">
              Tribe-Wallet
            </p>
        </motion.div>
        <motion.div
        initial={{x:20, opacity:0}}
        animate={{x:0, opacity:1}}
        transition={{delay:0.8, duration:0.5}}
        exit={{x:20, opacity: 0, transition:{duration:0.5}}}
          className="flex flex-col justify-center lg:justify-end items-center lg:items-end lg:p-2 text-white lg:w-1/2  mb-4 lg:mb-0">
          <p data-testid="email-field" className="px-2">{email}</p>
          <div className="flex flex-row">
          <p data-testid="total-field" className="px-2">{`R$ ${valorSoma}`}</p>
          <p>
            <span data-testid="header-currency-field" className="px-2">
              Moeda: BRL
            </span>
          </p>
          </div>
        </motion.div>
      </motion.div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  somatorio: state.wallet.somatorio,
});

const mapDispatchToProps = (dispatch) => ({
  addCurr: (currencie) => dispatch(actionCurrencie(currencie)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  somatorio: PropTypes.number.isRequired,
  addCurr: PropTypes.string.isRequired,
};
