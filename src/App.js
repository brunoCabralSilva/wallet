import React from 'react';
import './App.css';
import { Switch, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import Footer from './components/Footer';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';

function App() {
  const location = useLocation();
  return (
    <div>
      <AnimateSharedLayout>
      <AnimatePresence>
        <Switch location={location} key={location.key}>
        <Route exact path="/wallet" component={ Login } />
        <Route path="/carteira" component={ Wallet } />
      </Switch>
      </AnimatePresence>
      <Footer />
      </AnimateSharedLayout>
    </div>
  );
}

export default App;
