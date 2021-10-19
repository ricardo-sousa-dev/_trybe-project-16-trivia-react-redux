import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { configGame } from '../actions';

class Config extends Component {
  constructor() {
    super();

    this.state = {
      category: '',
      difficulty: '',
      type: '',
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillUnmount() {
    const { category, difficulty, type } = this.state;
    const { getConfigs } = this.props;
    const config = {
      category, difficulty, type,
    };
    getConfigs(config);
  }

  handleLogin() {
    const { history } = this.props;
    history.push('/');
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const categories = ['General Knowledge', 'Entertainment: Books',
      'Entertainment: Film', 'Entertainment: Music', 'Entertainment: Musicals & Theatres',
      'Entertainment: Television', 'Entertainment: Video Games',
      'Entertainment: Board Games', 'Science & Nature', 'Science: Computers',
      'Science: Mathematics', 'Mythology', 'Sports', 'Geography', 'History',
      'Politics', 'Art', 'Celebrities', 'Animals', 'Vehicles', 'Entertainment: Comics',
      'Science: Gadgets', 'Entertainment: Japanese Anime & Manga',
      'Entertainment: Cartoon & Animations'];
    const number = 9;
    return (
      <div className="config">
        <h1 data-testid="settings-title">Configurações</h1>
        <select
          name="category"
          onChange={ this.handleChange }
          className="selectConfig"
        >
          { categories.map((category, index) => (
            <option
              value={ Number(index + number) }
              key={ index }
            >
              {category}
            </option>
          ))}
        </select>
        <select
          name="difficulty"
          onChange={ this.handleChange }
          className="selectConfig"
        >
          <option value="easy">Fácil</option>
          <option value="medium">Médio</option>
          <option value="hard">Difícil</option>
        </select>
        <select name="type" onChange={ this.handleChange } className="selectConfig">
          <option value="multiple">Múltipla Escolha</option>
          <option value="boolean">Verdadeiro / Falso</option>
        </select>
        <button
          type="button"
          onClick={ this.handleLogin }
          className="btn-config"
        >
          Voltar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getConfigs: (payload) => dispatch(configGame(payload)),
});

Config.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  getConfigs: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Config);
