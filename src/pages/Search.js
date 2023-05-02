import React from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../components/ProductList';
import CategoriesList from '../components/CategoriesList';

/* Nessa página são renderizados dois componentes:
 CategoriesList que traz no carregamento todas as categorias de produtos
 do ML. E ProductList que cuida dos resultados de produtos, tanto
 por categorias quanto pela pesquisa feita através do input de texto
 que busca por nome.

 Numa eventual refatoração, talvez fosse melhor
 separar a barra de pesquisa do resultado das buscas; */

class Search extends React.Component {
  state = {
    searchQuery: '',
    hasProduct: false,
    productList: [],
    productsByCategory: '',
  };

  componentDidMount() {
    this.getShoppingCartList();
  }

  /* No comp. CategoriesList, ao clicar numa categoria,
   atribui sua id ao productsByCategorie/state, chama função que busca os
   produtos daquela categoria e os atribui ao productList/state, tb afirma
   list de produtos é true por haver produtos nela; */
  handleClick = ({ target: { id } }) => {
    this.setState({
      productsByCategory: id,
    }, async () => {
      const results = await this.fetchProductsbyCategory();
      this.setState({
        productList: results,
        hasProduct: true,
      });
    });
  };

  // Maneja mudanças no componente ProductList;
  queryInput = ({ target: { value } }) => {
    this.setState({
      searchQuery: value,
    });
  };

  /* Usa API do ML parabuscar produtos por nome/termo.
  Atualiza o productList/state com a lista dos produtos encontrados. */
  fetchProductList = async () => {
    const { searchQuery } = this.state;
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${searchQuery}`;
    const response = await fetch(url);
    const data = await response.json();
    const { results } = data;
    this.setState({
      productList: results,
      hasProduct: !!results,
    });
  };

  // Usa APi do ML para buscar produtos a partir de uma categoria;
  fetchProductsbyCategory = async () => {
    const { productsByCategory } = this.state;
    const url = `https://api.mercadolibre.com/sites/MLB/search?category=${productsByCategory}`;
    const response = await fetch(url);
    const data = await response.json();
    const { results } = data;
    return results;
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
      productsByCategory,
      searchQuery,
      hasProduct,
      productList,
      cartProductsQtd,
    } = this.state;
    // console.log('LISTA DE PRODUTOS', productList);

    return (
      <section>
        <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <CategoriesList
          handleClick={ this.handleClick }
          // fetchProductsbyCategory={ this.fetchProductsbyCategory }
        />
        <ProductList
          products={ productsByCategory }
          onChange={ this.queryInput }
          value={ searchQuery }
          hasProduct={ hasProduct }
          productList={ productList }
          fetchProductList={ this.fetchProductList }
          getShoppingCartList={ this.getShoppingCartList }
        />
        <Link data-testid="shopping-cart-button" to="/cart">
          Carrinho
        </Link>
        <p
          data-testid="shopping-cart-size"
        >
          { cartProductsQtd }
        </p>
      </section>
    );
  }
}

export default Search;
