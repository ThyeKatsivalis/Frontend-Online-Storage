import React from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

class CategoriesList extends React.Component {
  state = {
    categoriesList: [],
  };

  // 1- Chama função busca categorias disponiveis na API do ML.
  componentDidMount() {
    this.fetchCategories();
  }

  // 2- Func getCategories() é nativa do projeto, (api.js)
  // Coloca lista de categorias do ML no state;
  fetchCategories = async () => {
    const categories = await getCategories();
    this.setState({
      categoriesList: categories,
    });
  };

  // 3- A lista de categorias é mapeada e colocada em botões na pagina principal;
  render() {
    const {
      handleClick,
    } = this.props;

    const {
      categoriesList,
    } = this.state;

    return (
      <div>
        {categoriesList.map(({ id, name }) => (
          <label data-testid="category" htmlFor={ id } key={ id }>
            <input
              type="button"
              value={ name }
              id={ id }
              onClick={ handleClick }
            />
          </label>
        ))}
      </div>
    );
  }
}

CategoriesList.propTypes = {
  handleClick: PropTypes.func,
}.isRequired;

export default CategoriesList;
