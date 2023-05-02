import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Checkout from './pages/Checkout';
import ProductDetails from './pages/ProductDetails';
import Search from './pages/Search';
import ShoppingCart from './pages/ShoppingCart';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/checkout" component={ Checkout } />
        <Route path="/cart" component={ ShoppingCart } />
        <Route
          path="/productDetails/:id"
          render={ (props) => <ProductDetails { ...props } /> }
        />
        <Route exact path="/" component={ Search } />
      </Switch>
    );
  }
}

export default Routes;
