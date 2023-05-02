import React from 'react';
import PropTypes from 'prop-types';

/* Abriga o forms de preenchimento de avaliações, além de
testar se os inputs estão preenchidos corretamente. */

class ReviewCard extends React.Component {
  state = {
    email: '',
    rating: 0,
    text: '',
    okToSend: false,
  };

  // Maneja mudanças no inputs e seta o state de acordo.
  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });
  };

  /* Maneja o clique de salvar a avaliação.
   Testa se email foi preenchido corretamnte e rating foi escolhida; */
  handleClick = () => {
    const { addEvaluation } = this.props;
    const { email, rating, text } = this.state;
    const evaluationObj = {
      email,
      text,
      rating,
    };
    const emailRegex = /^[A-Za-z0-9_!#$%&'*+=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;
    const checkEmail = emailRegex.test(email);
    const checkRating = rating > 0;

    /* Se sim, atribui true para okToSend/state e envia obj com dados da avaliação
    para a função de adicionar ao localStorage, abrigada no comp. productdetails.
    No final, limpa os campos preenchidos. */
    if (checkEmail && checkRating) {
      this.setState({
        okToSend: true,
      }, () => {
        addEvaluation(evaluationObj);

        this.setState({
          email: '',
          rating: 0,
          text: '',
        });
      });
    }
  };

  render() {
    const {
      email,
      text,
      okToSend,
    } = this.state;

    return (
      <form>
        <div>
          <input
            type="email"
            placeholder="Email"
            name="email"
            data-testid="product-detail-email"
            onChange={ this.handleChange }
            value={ email }
          />
        </div>
        <div>
          <label htmlFor="rating1">
            1
            <input
              type="radio"
              id="rating1"
              name="rating"
              value="1"
              data-testid="1-rating"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="rating2">
            2
            <input
              type="radio"
              id="rating2"
              name="rating"
              value="2"
              data-testid="2-rating"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="rating3">
            3
            <input
              type="radio"
              id="rating3"
              name="rating"
              value="3"
              data-testid="3-rating"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="rating4">
            4
            <input
              type="radio"
              id="rating4"
              name="rating"
              value="4"
              data-testid="4-rating"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="rating5">
            5
            <input
              type="radio"
              id="rating5"
              name="rating"
              value="5"
              data-testid="5-rating"
              onChange={ this.handleChange }
            />
          </label>
        </div>
        <div>
          <label htmlFor="evaluation">
            <textarea
              id="evaluation"
              data-testid="product-detail-evaluation"
              name="text"
              onChange={ this.handleChange }
              value={ text }
              placeholder="Escresa sua avaliação aqui"
            />
          </label>
        </div>
        <div>
          <input
            type="button"
            value="Avaliar"
            data-testid="submit-review-btn"
            name="btnSubmit"
            onClick={ this.handleClick }
          />
          { (!okToSend)
          // Se inputs não estiverem preenchidos corretamente, mostra msg abaixo.
          && (
            <div data-testid="error-msg">
              Campos inválidos
            </div>
          )}
        </div>
      </form>
    );
  }
}

ReviewCard.propTypes = {
  addEvaluation: PropTypes.func,
}.isRequired;

export default ReviewCard;
