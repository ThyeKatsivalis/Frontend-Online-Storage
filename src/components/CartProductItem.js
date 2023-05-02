import React from 'react';
import PropTypes from 'prop-types';

class CartProductItem extends React.Component {
  state = {

  };

  /* Compara o id do produto com o que está no localStorage e
  pega a seta em quantity/state a quantidade escolhida pelo usuário na
  pagina ProductDetails.
  Dessa maneira faz-se a sincronização de qtd do state com o localStorage. */
  componentDidMount() {
    const { productId } = this.props;
    const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
    const productFound = cartProducts.find((product) => product.productId === productId);

    this.setState({
      quantity: productFound.productQuantity,
      availableQtd: productFound.availableQtd,
    });
  }

  /* Aumenta qtd do produto no carrinho de compras.
  Busca o produto no localStorage comparando IDs, soma 1 à qtd e
  reseta somando 1 tb quantity/state */
  increaseQuantity = () => {
    const { productId } = this.props;
    const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));

    const productMap = cartProducts.map((product) => {
      if (product.productId === productId) {
        product.productQuantity += 1;
        return product;
      }
      return product;
    });
    localStorage.setItem('cartProducts', JSON.stringify(productMap));

    this.setState((prevState) => ({
      quantity: prevState.quantity + 1,
    }));
  };

  /* Diminui qtd do produto no carrinho de compras.
  Busca o produto no localStorage comparando IDs, subtrai 1 na qtd e
  reseta subtraindo 1 tb quantity/state */
  decreaseQuantity = () => {
    const { productId } = this.props;
    const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));

    const productMap = cartProducts.map((product) => {
      if (product.productId === productId) {
        product.productQuantity -= 1;
        return product;
      }
      return product;
    });
    localStorage.setItem('cartProducts', JSON.stringify(productMap));

    this.setState((prevState) => ({
      quantity: prevState.quantity - 1,
    }));
  };

  render() {
    const { productName, productPrice, productId, removeProduct } = this.props;
    const { quantity, availableQtd } = this.state;

    return (
      <div key={ productId }>
        <fieldset>
          <h2>Produto:</h2>
          <span data-testid="shopping-cart-product-name">{productName}</span>
          <h2>Preço:</h2>
          <span>{productPrice}</span>
          <h2>Quantidade:</h2>
          <span data-testid="shopping-cart-product-quantity">{quantity}</span>

          <span>
            <button
              type="button"
              data-testid="product-decrease-quantity"
              onClick={ this.decreaseQuantity }
              disabled={ quantity < 2 }
            >
              -
            </button>
            <button
              type="button"
              data-testid="product-increase-quantity"
              onClick={ this.increaseQuantity }
              disabled={ quantity >= availableQtd }
            >
              +
            </button>
            <button
              type="button"
              data-testid="remove-product"
              onClick={ () => removeProduct(productId) }
            >
              remover
            </button>
          </span>
        </fieldset>
      </div>
    );
  }
}

CartProductItem.propTypes = {
  productName: PropTypes.string,
  productId: PropTypes.string,
  productQuantity: PropTypes.number,
  productPrice: PropTypes.number,
}.isRequired;

export default CartProductItem;
