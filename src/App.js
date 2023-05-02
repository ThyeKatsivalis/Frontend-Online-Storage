import React from 'react';
import Routes from './Routes';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <Routes getShoppingCartList={ this.getShoppingCartList } />
      </div>
    );
  }
}

export default App;
