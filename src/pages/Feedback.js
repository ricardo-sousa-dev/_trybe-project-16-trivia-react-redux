import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { playerRanking, zerador } from '../actions';

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.redirect = this.redirect.bind(this);
    this.congrat = this.congrat.bind(this);
  }

  componentDidMount() {
    const { getPlayer } = this.props;
    const infoPlayer = JSON.parse(localStorage.getItem('ranking'));
    getPlayer(infoPlayer[0]);
  }

  componentWillUnmount() {
    const { zeraPlayer } = this.props;
    localStorage.ranking = JSON.stringify('[]');
    const playerZerado = {
      name: '',
      email: '',
      score: 0,
      picture: '',
      token: '',
    };
    zeraPlayer(playerZerado);
  }

  redirect(path) {
    const { history } = this.props;
    history.push(path);
  }

  congrat() {
    const smile = '\u{1F609}';
    const stateLocalStorage = JSON.parse(localStorage.getItem('state'));
    const { assertions } = stateLocalStorage.player;
    if (assertions > 2) {
      return (
        <div className="divCongrat">
          <p>
            Mandou bem!
            <br />
            <span className="emoji">{ smile }</span>
          </p>
        </div>);
    }
    const cry = '\u{1F62D}';
    return (
      <div className="divCongrat">
        <p>
          Podia ser melhor...
          <br />
          <span className="emoji">{ cry }</span>
        </p>
      </div>);
  }

  render() {
    const stateLocalStorage = JSON.parse(localStorage.getItem('state'));
    const { assertions, score } = stateLocalStorage.player;

    return (
      <div className="feedback">
        <Header />
        <p data-testid="feedback-text">{ this.congrat() }</p>
        <div className="placar">
          <p>
            Placar final:
            { ' ' }
            <span data-testid="feedback-total-score">{ score }</span>
          </p>
          <p>
            Acertou:
            { ' ' }
            <span data-testid="feedback-total-question">{ assertions }</span>
          </p>
        </div>
        <div className="buttonsFeedback">
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ () => this.redirect('/') }
          >
            Jogar novamente
          </button>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ () => this.redirect('/ranking') }
          >
            Ver Ranking
          </button>
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  getPlayer: PropTypes.func.isRequired,
  zeraPlayer: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getPlayer: (payload) => dispatch(playerRanking(payload)),
  zeraPlayer: (payload) => dispatch(zerador(payload)),
});

export default connect(null, mapDispatchToProps)(Feedback);
