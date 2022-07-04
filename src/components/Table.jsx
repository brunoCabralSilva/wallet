import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { excluiDespesa, subtraiDespesa } from '../actions';
import { motion } from 'framer-motion';

class Table extends React.Component {
  editar = ({ target }) => {
    const { name } = target;
    console.log(name);
  }

  excluir = ({ target }) => {
    const { name } = target;
    const { despesas, excluir, subtrai } = this.props;
    const deletar = despesas.filter((d) => Number(d.id) !== Number(name));
    const subtrair = despesas.find((d) => Number(d.id) === Number(name));
    const exchange = Object.entries(subtrair.exchangeRates);
    const moeda = exchange.find((ex) => ex[0] === subtrair.currency);
    subtrai(Number(subtrair.value) * Number(moeda[1].ask));
    excluir(deletar);
  }

  retornaListaMobile = () => {
    const { despesas } = this.props;
    const lista = despesas.map((list) => {
      const exchange = Object.entries(list.exchangeRates);
      const moeda = exchange.find((ex) => ex[0] === list.currency);
      const nomeMoeda = moeda[1].name.split('/');
      return (
        <motion.div
            initial={{y:10, opacity:0}}
            animate={{y:0, opacity:1}}
            transition={{delay:0, duration:0.5}}
            exit={{y:10, opacity: 0, transition:{duration:0.5}}}
          key={ list.id } className="text-left text-white mb-3 p-3 bg-half-transparent2">
          <motion.div
          initial={{y:10, opacity:0}}
          animate={{y:0, opacity:1}}
          transition={{delay:0.05, duration:0.5}}
          exit={{y:10, opacity: 0, transition:{duration:0.5}}}
          className="">
          <div className="py-3 px-2">
          <p className=""><span className="font-bold">{`Descrição:  `}</span><span className="w-1/2">{list.description}</span></p>
            </div>
            </motion.div>
            <motion.div
          initial={{y:10, opacity:0}}
          animate={{y:0, opacity:1}}
          transition={{delay:0.1, duration:0.5}}
          exit={{y:10, opacity: 0, transition:{duration:0.5}}}
          className="">
          <div
          className="py-3 px-2">
            <p className=""><span className="font-bold">{`Categoria: `}</span> <span>{list.tag}</span></p>
          </div> 
          </motion.div>
          <motion.div
          initial={{y:10, opacity:0}}
          animate={{y:0, opacity:1}}
          transition={{delay:0.15, duration:0.5}}
          exit={{y:10, opacity: 0, transition:{duration:0.5}}}
          className="">
          <div className="py-3 px-2 items-center text-bolder">
          <span className="font-bold">{`Método de Pagamento:  `}</span><span>{list.method}</span>
            </div>
            </motion.div>
            <motion.div
          initial={{y:10, opacity:0}}
          animate={{y:0, opacity:1}}
          transition={{delay:0.2, duration:0.5}}
          exit={{y:10, opacity: 0, transition:{duration:0.5}}}
            className="">
          <div className="py-3 px-2 text-bolder">
          <span className="font-bold">{`Valor:  `}</span><span>{`${list.tipografia} ${Number(list.value).toFixed(2)} (${ nomeMoeda[0] })`}</span>
            </div>
            </motion.div>
            <motion.div
          initial={{y:10, opacity:0}}
          animate={{y:0, opacity:1}}
          transition={{delay:0.3, duration:0.5}}
          exit={{y:10, opacity: 0, transition:{duration:0.5}}}
            className="">
          <div className="py-3 px-2 text-bolder">
          <span className="font-bold">{`Câmbio utilizado: `}</span><span>{Number(moeda[1].ask).toFixed(2)}</span>
            </div>
            </motion.div>
            <motion.div
          initial={{y:10, opacity:0}}
          animate={{y:0, opacity:1}}
          transition={{delay:0.35, duration:0.5}}
          exit={{y:10, opacity: 0, transition:{duration:0.5}}}
            className="">
          <div className="py-3 px-2 text-bolder">
          <span className="font-bold">{`Valor convertido: `}</span><span>{`R$ ${(Number(list.value) * Number(moeda[1].ask)).toFixed(2)}`}</span>
            </div>
            </motion.div>
            <motion.div
          initial={{y:10, opacity:0}}
          animate={{y:0, opacity:1}}
          transition={{delay:0.4, duration:0.5}}
          exit={{y:10, opacity: 0, transition:{duration:0.5}}}
            className="">
          <div className="py-3 px-2">
          <span className="font-bold">{`Moeda de conversão: `}</span><span>Real</span>
            </div>
            </motion.div>
            <motion.div
          initial={{y:10, opacity:0}}
          animate={{y:0, opacity:1}}
          transition={{delay:0.45, duration:0.5}}
          exit={{y:10, opacity: 0, transition:{duration:0.5}}}
            className="">
          <div className="py-3 px-2 flex flex-col items-center justify-center">
            <button
              type="button"
              name={ list.id }
              data-testid="edit-btn"
              onClick={ this.editar }
              className="p-2 bg-stone-800 hover:bg-brown-transparent m-1 w-full text-white transition duration-500 text-bolder"
            >
              Editar
            </button>
            <button
              type="button"
              name={ list.id }
              data-testid="delete-btn"
              onClick={ this.excluir }
              className="p-2 bg-stone-800 hover:bg-brown-transparent w-full text-white transition duration-500 text-bolder"
            >
              Excluir
            </button>
            </div>
          </motion.div>
        </motion.div>
      );
    });
    return lista;
  }

  retornaListaDespesas = () => {
    const { despesas } = this.props;
    const lista = despesas.map((list) => {
      const exchange = Object.entries(list.exchangeRates);
      const moeda = exchange.find((ex) => ex[0] === list.currency);
      const nomeMoeda = moeda[1].name.split('/');
      return (
        <motion.tr
            initial={{y:10, opacity:0}}
            animate={{y:0, opacity:1}}
            transition={{delay:0, duration:0.5}}
            exit={{y:10, opacity: 0, transition:{duration:0.5}}}
          key={ list.id } className="text-center text-white bg-half-transparent2">
          <motion.td
          initial={{y:10, opacity:0}}
          animate={{y:0, opacity:1}}
          transition={{delay:0.05, duration:0.5}}
          exit={{y:10, opacity: 0, transition:{duration:0.5}}}
          className="border border-white">
          <div className="py-3 px-2 flex">
          <p className="text-center w-full">{list.description}</p>
            </div>
            </motion.td>
            <motion.td
          initial={{y:10, opacity:0}}
          animate={{y:0, opacity:1}}
          transition={{delay:0.1, duration:0.5}}
          exit={{y:10, opacity: 0, transition:{duration:0.5}}}
          className="border border-white">
          <div
          className="py-3 px-2 flex">
            <p className="text-center w-full">{list.tag}</p>
          </div> 
          </motion.td>
          <motion.td
          initial={{y:10, opacity:0}}
          animate={{y:0, opacity:1}}
          transition={{delay:0.15, duration:0.5}}
          exit={{y:10, opacity: 0, transition:{duration:0.5}}}
          className="border border-white">
          <div className="py-3 px-2 text-center w-full flex h-full items-center justify-center">
            {list.method}
            </div>
            </motion.td>
            <motion.td
          initial={{y:10, opacity:0}}
          animate={{y:0, opacity:1}}
          transition={{delay:0.2, duration:0.5}}
          exit={{y:10, opacity: 0, transition:{duration:0.5}}}
            className="border border-white">
          <div className="py-3 px-2 text-center w-full flex items-center justify-center">
            {`${list.tipografia} ${Number(list.value).toFixed(2)}`}
            </div>
            </motion.td>
            <motion.td
          initial={{y:10, opacity:0}}
          animate={{y:0, opacity:1}}
          transition={{delay:0.25, duration:0.5}}
          exit={{y:10, opacity: 0, transition:{duration:0.5}}}
            className="border border-white">
          <div className="py-3 px-2 flex items-center justify-center">
            { nomeMoeda[0] }
            </div>
            </motion.td>
            <motion.td
          initial={{y:10, opacity:0}}
          animate={{y:0, opacity:1}}
          transition={{delay:0.3, duration:0.5}}
          exit={{y:10, opacity: 0, transition:{duration:0.5}}}
            className="border border-white">
          <div className="py-3 px-2 flex items-center justify-center">
            {Number(moeda[1].ask).toFixed(2)}
            </div>
            </motion.td>
            <motion.td
          initial={{y:10, opacity:0}}
          animate={{y:0, opacity:1}}
          transition={{delay:0.35, duration:0.5}}
          exit={{y:10, opacity: 0, transition:{duration:0.5}}}
            className="border border-white">
          <div className="py-3 px-2 flex items-center justify-center">
            {`R$ ${(Number(list.value) * Number(moeda[1].ask)).toFixed(2)}`}
            </div>
            </motion.td>
            <motion.td
          initial={{y:10, opacity:0}}
          animate={{y:0, opacity:1}}
          transition={{delay:0.4, duration:0.5}}
          exit={{y:10, opacity: 0, transition:{duration:0.5}}}
            className="border border-white">
          <div className="py-3 px-2 flex items-center justify-center">
            Moeda de conversão: Real
            </div>
            </motion.td>
            <motion.td
          initial={{y:10, opacity:0}}
          animate={{y:0, opacity:1}}
          transition={{delay:0.45, duration:0.5}}
          exit={{y:10, opacity: 0, transition:{duration:0.5}}}
            className="border border-white">
          <div className="py-3 px-2 flex flex-col items-center justify-center">
            <button
              type="button"
              name={ list.id }
              data-testid="edit-btn"
              onClick={ this.editar }
              className="p-2 bg-stone-800 hover:bg-brown-transparent m-1 w-full text-white transition duration-500"
            >
              Editar
            </button>
            <button
              type="button"
              name={ list.id }
              data-testid="delete-btn"
              onClick={ this.excluir }
              className="p-2 bg-stone-800 hover:bg-brown-transparent w-full text-white transition duration-500"
            >
              Excluir
            </button>
            </div>
          </motion.td>
        </motion.tr>
      );
    });
    return lista;
  }

  render() {
    return (
      <div className=" mt-5 sm:mt-0 mb-5 sm:mb-0 sm:pl-0 flex justify-center flex-row w-screen lg:w-screenx83">
      <motion.table
      initial={{y:20, opacity:0}}
      animate={{y:0, opacity:1}}
      transition={{delay:0.5, duration:0.3}}
      exit={{y:20, opacity: 0, transition:{duration:0.5}}}
        className="w-screen sm:w-screenx83 sm:text-white lg:inline hidden">
        <tr className="text-center">
          <th className="border border-white bg-half-transparent2">
            <motion.div
            initial={{y:10, opacity:0}}
            animate={{y:0, opacity:1}}
            transition={{delay:0.6, duration:0.3}}
            exit={{y:10, opacity: 0, transition:{duration:0.5}}}
              className="sm:py-3 sm:px-2 sm:h-16 flex items-center justify-center">
            Descrição
            </motion.div>
          </th>
          <th className="border border-white bg-half-transparent2">
            <motion.div
            initial={{y:10, opacity:0}}
            animate={{y:0, opacity:1}}
            transition={{delay:0.65, duration:0.3}}
            exit={{y:10, opacity: 0, transition:{duration:0.5}}}
               className="sm:py-3 sm:px-2 sm:h-16 flex items-center justify-center">
            Tag
            </motion.div>
          </th>
          <th className="border border-white bg-half-transparent2">
          <motion.div
            initial={{y:10, opacity:0}}
            animate={{y:0, opacity:1}}
            transition={{delay:0.7, duration:0.3}}
            exit={{y:10, opacity: 0, transition:{duration:0.5}}}
          className="sm:py-3 sm:px-2 sm:h-16 flex items-center justify-center">
              Método de pagamento
            </motion.div>
          </th>
          <th className="border border-white bg-half-transparent2">
          <motion.div
            initial={{y:10, opacity:0}}
            animate={{y:0, opacity:1}}
            transition={{delay:0.75, duration:0.3}}
            exit={{y:10, opacity: 0, transition:{duration:0.5}}}
          className="sm:py-3 sm:px-2 sm:h-16 flex items-center justify-center">
            Valor
            </motion.div>
          </th>
          <th className="border border-white bg-half-transparent2">
          <motion.div
            initial={{y:10, opacity:0}}
            animate={{y:0, opacity:1}}
            transition={{delay:0.8, duration:0.3}}
            exit={{y:10, opacity: 0, transition:{duration:0.5}}}
          className="sm:py-3 sm:px-2 sm:h-16 flex items-center justify-center">
            Moeda
            </motion.div>
          </th>
          <th className="border border-white bg-half-transparent2">
          <motion.div
            initial={{y:10, opacity:0}}
            animate={{y:0, opacity:1}}
            transition={{delay:0.85, duration:0.3}}
            exit={{y:10, opacity: 0, transition:{duration:0.5}}}
          className="sm:py-3 sm:px-2 sm:h-16 flex items-center justify-center">
            Câmbio utilizado
            </motion.div>
          </th>
          <th className="border border-white bg-half-transparent2">
          <motion.div
            initial={{y:10, opacity:0}}
            animate={{y:0, opacity:1}}
            transition={{delay:0.9, duration:0.3}}
            exit={{y:10, opacity: 0, transition:{duration:0.5}}}
           className="sm:py-3 sm:px-2 sm:h-16 flex items-center justify-center">
            Valor convertido
            </motion.div>
          </th>
          <th className="border border-white bg-half-transparent2">
          <motion.div
            initial={{y:10, opacity:0}}
            animate={{y:0, opacity:1}}
            transition={{delay:0.95, duration:0.3}}
            exit={{y:10, opacity: 0, transition:{duration:0.5}}}
          className="sm:py-3 sm:px-2 sm:h-16 flex items-center justify-center">
            Moeda de conversão
            </motion.div>
          </th>
          <th className="border border-white bg-half-transparent2">
          <motion.div
            initial={{y:10, opacity:0}}
            animate={{y:0, opacity:1}}
            transition={{delay:1, duration:0.3}}
            exit={{y:10, opacity: 0, transition:{duration:0.5}}}
            div className="sm:py-3 sm:px-2 sm:h-16 flex items-center justify-center">
            Editar/Excluir
            </motion.div>
          </th>
        </tr>
        {this.retornaListaDespesas()}
      </motion.table>
      <motion.div
      initial={{y:20, opacity:0}}
      animate={{y:0, opacity:1}}
      transition={{delay:0.5, duration:0.3}}
      exit={{y:20, opacity: 0, transition:{duration:0.5}}}
      className="lg:hidden flex flex-col mx-2 lg:w-screen15 w-11/12 lg:h-screen85 p-2 text-white">
          <h1 className="flex mt-0 sm:mt-5 lg:mg-0 lg:hidden w-full text-2xl mb-2 text-white bg-half-transparent2 py-3 flex justify-center">Lista de Despesas</h1>
          {this.retornaListaMobile()}
      </motion.div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  despesas: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  excluir: (despesas) => dispatch(excluiDespesa(despesas)),
  subtrai: (despesas) => dispatch(subtraiDespesa(despesas)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

Table.propTypes = {
  despesas: PropTypes.string.isRequired,
  excluir: PropTypes.func.isRequired,
  subtrai: PropTypes.func.isRequired,
};
