import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
  componentDidMount() {
    const { timerGame } = this.props;
    timerGame();
  }

  render() {
    const { currentTime } = this.props;
    return (
      <p className="timer">{ currentTime }</p>
    );
  }
}

Timer.propTypes = {
  currentTime: PropTypes.number.isRequired,
  timerGame: PropTypes.func.isRequired,
};

export default Timer;
