import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductCard extends React.Component {
  // No click do botão, adicina o produto ao localStorage, que armazena os itens do carrinho.
  saveToLocalStorage = async () => {
    const {
      productName,
      productPrice,
      id,
      productImgUrl,
      getShoppingCartList,
      availableQtd,
    } = this.props;

    const productOnCart = JSON.parse(localStorage.getItem('cartProducts'));
    const newProductOnCart = {
      productName,
      productQuantity: 1,
      productPrice,
      productImgUrl,
      productId: id,
      availableQtd,
    };

    const checkLocalStorage = localStorage.getItem('cartProducts');
    if (!checkLocalStorage) {
      localStorage.setItem(
        'cartProducts',
        JSON.stringify([newProductOnCart]),
      );
    } else {
      localStorage.setItem('cartProducts', JSON.stringify([...productOnCart,
        newProductOnCart]));
    }
    getShoppingCartList();
  };

  /* Cada produto é um link para a página ProductDetais;
  Nesse caso as props foram passdas através do link tb */
  render() {
    const { productName, productImgUrl, productPrice, id, freeShipping } = this.props;
    return (
      <div>
        <Link
          data-testid="product-detail-link"
          to={ {
            pathname: `/productDetails/${id}`,
            productName,
            productImgUrl,
            productPrice,
            id,
          } }
        >
          { freeShipping && (
            <span data-testid="free-shipping">
              Frete Grátis!
            </span>

          )}
          <div data-testid="product">
            <h1>{ productName }</h1>
            <img src={ productImgUrl } alt={ productName } />
            <span>{ productPrice }</span>
          </div>
        </Link>
        <button
          data-testid="product-add-to-cart"
          onClick={ this.saveToLocalStorage }
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}

ProductCard.propTypes = {
  productName: PropTypes.string,
  productImgUrl: PropTypes.string,
  productPrice: PropTypes.number,
  id: PropTypes.string,
}.isRequired;

export default ProductCard;
