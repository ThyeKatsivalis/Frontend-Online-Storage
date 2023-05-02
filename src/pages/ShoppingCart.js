import React from 'react';
import PropTypes from 'prop-types';
import CartProductItem from '../components/CartProductItem';

/* Renderiza produtos salvos no localstorage do carrinho de compras */
class ShoppingCart extends React.Component {
  state = {
  };

  /* Remove o produto cujo botão é clicado para remover.
  Seta para true o updateProduct/state, atualizando o componente.
  Faz um filtro que retira do localStorage o produto clicado e atualiza
  a lista. */
  removeProduct = (id) => {
    const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));

    this.setState({
      updateProduct: true,
    }, () => {
      const updatedProductList = cartProducts.filter(
        (product) => product.productId !== id,
      );

      localStorage.setItem('cartProducts', JSON.stringify(updatedProductList));
      this.setState({
        updateProduct: false,
      });
    });
  };

  handleClickCheckout = () => {
    const { history } = this.props;
    history.push('/checkout');
  };

  render() {
    const cartList = JSON.parse(localStorage.getItem('cartProducts'));
    const { updateProduct } = this.state;
    if (updateProduct) {
      return <p>CARREGANDO...</p>;
    }
    return (
      <div>
        { // Se houver produto salvo no carrinho, renderiza por map.
          cartList
            ? (
              <div>
                { cartList
                  .map(({ productName, productQuantity, productId, productPrice }) => (
                    <CartProductItem
                      key={ productId }
                      productName={ productName }
                      productQuantity={ productQuantity }
                      productPrice={ productPrice }
                      productId={ productId }
                      removeProduct={ this.removeProduct }
                    />
                  ))}
              </div>
            )
            : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        }
        <div>
          <label>
            <input
              type="button"
              data-testid="checkout-products"
              value="Checkout"
              onClick={ this.handleClickCheckout }
            />
          </label>
        </div>
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default ShoppingCart;
