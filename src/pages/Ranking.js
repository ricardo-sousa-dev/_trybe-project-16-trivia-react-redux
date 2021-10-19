import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Ranking extends Component {
  constructor() {
    super();
    this.redirect = this.redirect.bind(this);
    this.rankingPlayers = this.rankingPlayers.bind(this);
  }

  redirect(path) {
    const { history } = this.props;
    history.push(path);
  }

  rankingPlayers() {
    const { players } = this.props;
    const scoreSort = players.sort((a, b) => b.score - a.score);
    const ranking = scoreSort.map(({ name, picture, score }, index) => (
      <div className="playersRanking" key={ index }>
        <div className="rankingImg">
          <img
            src={ picture }
            alt={ name }
          />

        </div>
        <div className="rankingName">
          <span data-testid={ `player-name-${index}` }>
            {name}
          </span>
        </div>
        <div className="rankingScore">
          <p data-testid={ `player-score-${index}` }>
            { score }
            {' '}
            Pontos
          </p>
        </div>
      </div>
    ));
    return ranking;
  }

  render() {
    return (
      <div className="ranking">
        <h1 data-testid="ranking-title">Ranking</h1>
        { this.rankingPlayers() }
        <div className="buttonsRanking">
          <button
            type="button"
            onClick={ () => this.redirect('/feedback') }
          >
            Voltar
          </button>
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ () => this.redirect('/') }
          >
            Jogar Novamente
          </button>
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  players: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = ({ player }) => ({
  players: player.players,
});

export default connect(mapStateToProps)(Ranking);
