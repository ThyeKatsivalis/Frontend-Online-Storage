import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';

/* Se houver produtos (productList/state), vai mapear a lista e renderizar,
caso contrário, mostra msg que não encontrou produtos.
Se preencher o campo de pesquisar e clicar, chama a função de busca por nome/termo; */
class ProductList extends React.Component {
  render() {
    const {
      onChange,
      value,
      hasProduct,
      productList,
      fetchProductList,
      getShoppingCartList,
    } = this.props;
    console.log(productList);
    return (
      <div>
        <fieldset>
          <input
            type="text"
            data-testid="query-input"
            value={ value }
            onChange={ onChange }
          />
          <button
            type="submit"
            data-testid="query-button"
            onClick={ fetchProductList }
          >
            Pesquisar
          </button>
        </fieldset>
        { hasProduct
          ? (
            // <section>
            //   {productList
            //     .map(({ title, price, thumbnail, id }) => (<ProductCard
            //       key={ id }
            //       productName={ title }
            //       productImgUrl={ thumbnail }
            //       productPrice={ price }
            //       id={ id }
            //       getShoppingCartList={ getShoppingCartList }
            //       productList={ productList }
            //     />))}
            // </section>)
            <section>
              {productList
                .map((prod) => (<ProductCard
                  key={ prod.id }
                  productName={ prod.title }
                  productImgUrl={ prod.thumbnail }
                  productPrice={ prod.price }
                  id={ prod.id }
                  getShoppingCartList={ getShoppingCartList }
                  availableQtd={ prod.available_quantity }
                  freeShipping={ prod.shipping.free_shipping }
                />))}
            </section>)
          : <p>Nenhum produto foi encontrado</p> }
      </div>
    );
  }
}

ProductList.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  hasProduct: PropTypes.bool,
  productList: PropTypes.array,
  fetchProductList: PropTypes.func,
}.isRequired;

export default ProductList;
