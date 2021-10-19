import React, { Component } from 'react';
import Header from '../components/Header';
import Questions from '../components/Questions';
import Timer from '../components/Timer';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      currentTime: 30,
      index: 0,
    };

    this.questionIndex = this.questionIndex.bind(this);
    this.setTimer = this.setTimer.bind(this);
    this.timerGame = this.timerGame.bind(this);
    this.reloadTime = this.reloadTime.bind(this);
  }

  setTimer(callback) {
    this.setState((prevState) => ({ currentTime: prevState.currentTime - 1 }), callback);
  }

  questionIndex() {
    this.setState((prevState) => ({ index: prevState.index + 1 }
    ));
  }

  clearTimeInterval() {
    const { currentTime } = this.state;
    if (currentTime === 0) {
      clearInterval(this.timer);
    }
  }

  reloadTime() {
    this.setState(({ currentTime: 30 }));
    this.timerGame();
  }

  timerGame() {
    const ONE_SECOND = 1000;
    this.timer = setInterval(() => {
      this.setTimer(this.clearTimeInterval);
    }, ONE_SECOND);
  }

  render() {
    const { currentTime, index } = this.state;
    return (
      <div className="game">
        <h1>TrybeTrivia</h1>
        <Header />
        <Questions
          currentTime={ currentTime }
          index={ index }
          questionIndex={ this.questionIndex }
          reloadTime={ this.reloadTime }
          stopTimer={ () => clearInterval(this.timer) }
        />
        <Timer timerGame={ this.timerGame } currentTime={ currentTime } />
      </div>
    );
  }
}

export default Game;
