import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LoginInputs extends Component {
  buttons() {
    const { check, handleSubmit, handleConfig } = this.props;
    return (
      <>
        <button
          type="button"
          data-testid="btn-play"
          className="btn float-right login_btn"
          disabled={ check.checkEmail === false || check.checkName === false }
          onClick={ handleSubmit }
        >
          Jogar
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          className="btn float-right settings_btn"
          onClick={ handleConfig }
        >
          Configurações
        </button>
      </>
    );
  }

  render() {
    const { email, name, handleChange } = this.props;
    return (
      <div className="divLogin">
        <h1>TrybeTrivia</h1>
        <div className="d-flex justify-content-center h-100">
          <div className="card">
            <div className="card-header">
              <h3>Login</h3>
            </div>
            <div className="card-body">
              <input
                type="text"
                name="name"
                id="input-name"
                className="form-control"
                placeholder="Nome"
                data-testid="input-player-name"
                value={ name }
                onChange={ handleChange }
              />
              <input
                type="text"
                name="email"
                id="input-email"
                className="form-control"
                placeholder="Email"
                data-testid="input-gravatar-email"
                value={ email }
                onChange={ handleChange }
              />
              { this.buttons() }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LoginInputs.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  check: PropTypes.shape({
    checkEmail: PropTypes.bool.isRequired,
    checkName: PropTypes.bool.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleConfig: PropTypes.func.isRequired,
};

export default LoginInputs;
