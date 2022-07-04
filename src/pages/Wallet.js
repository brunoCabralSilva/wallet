import React from 'react';
import Header from '../components/Header';
import Despesa from '../components/Despesas';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <div className="bg-slate-300 min-h-85 bg-coin bg-center bg-cover">
        <Header />
        <div className="flex flex-col lg:flex-row items-center lg:items-start mt-2">
        <Despesa />
        <Table />
        </div>
      </div>
    );
  }
}

export default Wallet;
