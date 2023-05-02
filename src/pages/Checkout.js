import React from 'react';
import PropTypes from 'prop-types';

class Checkout extends React.Component {
  state = {
    fullname: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    address: '',
    paymentMethod: '',
    showError: false,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  deleteCart = () => {
    console.log('APAGUEI O CARRINHO, SQN');
    localStorage.removeItem('cartProducts');
  };

  handleClick = () => {
    const { history } = this.props;
    // console.log('CLIQUEI!');
    // console.log(this.validateInputs());

    if (this.validateInputs()) {
      this.deleteCart();
      history.push('/');
    } else {
      this.setState({
        showError: true,
      });
    }
  };

  validateInputs = () => {
    const {
      fullname,
      email,
      cpf,
      phone,
      cep,
      address,
      paymentMethod,
    } = this.state;

    const validInputs = fullname.length > 0
      && email.length > 0
      && cpf.length > 0
      && phone.length > 0
      && cep.length > 0
      && address.length > 0
      && paymentMethod.length > 0;

    return validInputs;
  };

  render() {
    const cartList = JSON.parse(localStorage.getItem('cartProducts'));
    const {
      fullname,
      email,
      cpf,
      phone,
      cep,
      address,
      showError,
    } = this.state;

    return (
      <div>
        <fieldset>
          {cartList.map(({ productName, productPrice, productId, productImgUrl }) => (
            <div key={ productId }>
              <img src={ productImgUrl } alt={ productName } />
              <span>
                { productName }
              </span>
              <span>
                { productPrice }
              </span>
            </div>
          ))}
        </fieldset>
        <form>
          <label htmlFor="fullname">
            <input
              type="text"
              placeholder="Nome Completo"
              name="fullname"
              id="fullname"
              onChange={ this.handleChange }
              value={ fullname }
              data-testid="checkout-fullname"
            />
          </label>
          <label htmlFor="email">
            <input
              type="email"
              placeholder="Email"
              name="email"
              id="email"
              onChange={ this.handleChange }
              value={ email }
              data-testid="checkout-email"
            />
          </label>
          <label htmlFor="cpf">
            <input
              type="text"
              placeholder="CPF"
              name="cpf"
              id="cpf"
              onChange={ this.handleChange }
              value={ cpf }
              data-testid="checkout-cpf"
            />
          </label>
          <label htmlFor="phone">
            <input
              type="tel"
              placeholder="telefone"
              name="phone"
              id="phone"
              onChange={ this.handleChange }
              value={ phone }
              data-testid="checkout-phone"
            />
          </label>
          <label htmlFor="cep">
            <input
              type="text"
              placeholder="CEP"
              name="cep"
              id="cep"
              onChange={ this.handleChange }
              value={ cep }
              data-testid="checkout-cep"
            />
          </label>
          <label htmlFor="address">
            <input
              type="text"
              placeholder="Endereço"
              name="address"
              id="address"
              onChange={ this.handleChange }
              value={ address }
              data-testid="checkout-address"
            />
          </label>
          <fieldset>
            <label htmlFor="boleto">
              Boleto
              <input
                type="radio"
                id="boleto"
                name="paymentMethod"
                value="boleto"
                onChange={ this.handleChange }
                data-testid="ticket-payment"
              />
            </label>
            <label htmlFor="visa">
              Visa
              <input
                type="radio"
                id="visa"
                name="paymentMethod"
                value="visa"
                onChange={ this.handleChange }
                data-testid="visa-payment"
              />
            </label>
            <label htmlFor="masterCard">
              Master Card
              <input
                type="radio"
                id="masterCard"
                name="paymentMethod"
                value="masterCard"
                onChange={ this.handleChange }
                data-testid="master-payment"
              />
            </label>
            <label htmlFor="elo">
              Elo
              <input
                type="radio"
                id="elo"
                name="paymentMethod"
                value="elo"
                onChange={ this.handleChange }
                data-testid="elo-payment"
              />
            </label>
          </fieldset>
        </form>
        <input
          type="button"
          value="Submit"
          data-testid="checkout-btn"
          name="btnSubmit"
          onClick={ this.handleClick }
        />
        {(showError) && (
          <h3 data-testid="error-msg">
            Campos inválidos
          </h3>
        )}
      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default Checkout;
