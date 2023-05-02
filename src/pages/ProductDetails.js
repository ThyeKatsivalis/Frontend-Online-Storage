import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReviewCard from '../components/ReviewCard';
import ReviewsSaved from '../components/ReviewsSaved';

/* Esta página renderiza dois outros componentes:
ReviewCard que abriga o form de avaliação e
ReviewSaved, que mostra todas as avaliações salvas. */

class ProductDetails extends React.Component {
  state = {
    productName: '',
    productImgUrl: '',
    productPrice: 0,
    productQuantity: 1,
    evaluationList: [],
  };

  // 1- Chama função que desestrutura o ID passado via props pela URL.
  componentDidMount() {
    this.getProduct();
    this.getShoppingCartList();
  }

  // 2- Usa ID para chamar função que busca produto peli ID
  getProduct = () => {
    const {
      match: {
        params: {
          id,
        },
      },
    } = this.props;
    this.fetchProduct(id);
  };

  /* 3- Usa API do ML para buscar produto pelo ID
  Seta o state com as chaves do produto retornado.
  No final, chama função que busca no localStorage as avaliações
  desse produto específico. */
  fetchProduct = async (productId) => {
    const url = `https://api.mercadolibre.com/items/${productId}`;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      productName: data.title,
      productImgUrl: data.thumbnail,
      productPrice: data.price,
      productId: data.id,
    }, () => {
      this.getEvaluationList();
    });
  };

  // Seta no state a qtd selecionada do produto;
  selectProductQuantity = ({ target: { value } }) => {
    this.setState({
      productQuantity: value,
    });
  };

  /* Adiciona esse produto ao carrinho, salvando no localStorage.
  Produto é adicionado como novo elemento .
  Numa eventual refatoração, testar se produto já existe no carrinho e
  dar esse retorno ao usuário */
  addToCart = () => {
    const {
      productName,
      productImgUrl,
      productPrice,
      productId,
      productQuantity,
    } = this.state;
    const newCartProduct = {
      productName,
      productImgUrl,
      productPrice,
      productId,
      productQuantity,
    };
    const checkLocalStorage = JSON.parse(localStorage.getItem('cartProducts'));
    if (!checkLocalStorage) {
      localStorage.setItem(
        'cartProducts',
        JSON.stringify([newCartProduct]),
      );
    } else {
      localStorage.setItem('cartProducts', JSON.stringify([...checkLocalStorage,
        newCartProduct]));
    }
    this.getShoppingCartList();
  };

  /* Adiciona, no localStorage, avaliação feita no formulário do comp. ReviewCard.
  Atribui a lista de avaliações desse produto ao evaluationList/state. */
  addEvaluation = (evaluationObj) => {
    const { productId } = this.state;
    const getEvaluationList = JSON.parse((localStorage.getItem(`${productId}`)));

    if (!getEvaluationList) {
      localStorage.setItem(
        `${productId}`,
        JSON.stringify([evaluationObj]),
      );
    } else {
      localStorage.setItem(
        `${productId}`,
        JSON.stringify([...getEvaluationList, evaluationObj]),
      );
    }

    const updatedEvaluationList = JSON.parse((localStorage.getItem(`${productId}`)));
    // console.log(updatedEvaluationList);

    this.setState({
      evaluationList: updatedEvaluationList,
    });
  };

  /* Se houver uma ou mais avaliação salva desse produto,
  será atribuida ao evaluationList/state */
  getEvaluationList = () => {
    const { productId } = this.state;
    const getEvaluationList = JSON.parse((localStorage.getItem(`${productId}`)));
    this.setState({
      evaluationList: getEvaluationList,
    });
  };

  getShoppingCartList = () => {
    const cartList = JSON.parse(localStorage.getItem('cartProducts'));

    if (cartList) {
      const prodQtd = cartList.reduce((a, b) => a + b.productQuantity, 0);
      this.setState({
        cartProductsQtd: cartList && prodQtd,
      });
    }
  };

  render() {
    const {
      productName,
      productImgUrl,
      productPrice,
      productQuantity,
      evaluationList,
      cartProductsQtd,
    } = this.state;

    return (
      <div>
        <p data-testid="product-detail-name">
          { productName }
        </p>
        <img
          src={ productImgUrl }
          alt={ productName }
          data-testid="product-detail-image"
        />
        <p data-testid="product-detail-price">
          { productPrice }
        </p>
        <label htmlFor="selectProductQuantity">
          Selecione a quantidade:
          <input
            id="selecProductQuantity"
            min="1"
            type="number"
            onChange={ this.selectProductQuantity }
            value={ productQuantity }
          />
        </label>
        <button
          data-testid="product-detail-add-to-cart"
          onClick={ this.addToCart }
        >
          Comprar
        </button>
        <fieldset>
          <ReviewCard
            addEvaluation={ this.addEvaluation }
          />
        </fieldset>
        <fieldset>
          <div>
            <ReviewsSaved
              evaluationList={ evaluationList }
            />
          </div>
        </fieldset>
        <Link data-testid="shopping-cart-button" to="/cart">
          Carrinho
        </Link>
        <p
          data-testid="shopping-cart-size"
        >
          { cartProductsQtd }
        </p>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  matc: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default ProductDetails;
