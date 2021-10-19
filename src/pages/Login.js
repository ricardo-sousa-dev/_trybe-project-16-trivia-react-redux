import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginInputs from '../components/LoginInputs';
import apiTOKEN from '../actions/services';
import { infoPlayer } from '../actions';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
      check: {
        checkEmail: false,
        checkName: false,
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validateName = this.validateName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleConfig = this.handleConfig.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    if (name === 'email') this.validateEmail(value);
    if (name === 'name') this.validateName(value);
  }

  validateEmail(email) {
    const { check } = this.state;
    if (email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      this.setState({ check: { ...check, checkEmail: true } });
    } else this.setState({ check: { ...check, checkEmail: false } });
  }

  validateName(name) {
    const { check } = this.state;
    if (name.length >= 1) {
      this.setState({ check: { ...check, checkName: true } });
    } else this.setState({ check: { ...check, checkName: false } });
  }

  handleSubmit() {
    const { name, email } = this.state;
    const pay = {
      name,
      email,
    };
    const { history, getToken, getPlayer } = this.props;
    history.push('/game');
    getToken();
    getPlayer(pay);
    const state = {
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      },
    };
    localStorage.state = JSON.stringify(state);
  }

  handleConfig() {
    const { history } = this.props;
    history.push('/config');
  }

  render() {
    const { email, name, check, disable } = this.state;

    return (
      <div className="container">
        <LoginInputs
          email={ email }
          name={ name }
          check={ check }
          disable={ disable }
          handleChange={ this.handleChange }
          handleSubmit={ this.handleSubmit }
          handleConfig={ this.handleConfig }
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(apiTOKEN()),
  getPlayer: (payload) => dispatch(infoPlayer(payload)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  getToken: PropTypes.func.isRequired,
  getPlayer: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
