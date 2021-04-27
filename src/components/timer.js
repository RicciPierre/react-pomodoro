/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSession: true,
      timerSecond: 0,
      intervalId: 0
    };
    this.playTimer = this.playTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.decreaseTimer = this.decreaseTimer.bind(this);
  }

  playTimer(intervalId) {
    let interval = setInterval(this.decreaseTimer, 1000);
    this.props.onPlayStopTimer(true);
    this.setState({
      intervalId: intervalId
    });
  }

  decreaseTimer() {
    switch (this.state.timerSecond) {
      case 0:
        if (this.props.timerMinute === 0) {
          if (this.state.isSession) {
            this.setState({
              isSession: false
            });
            this.props.toggleInterval(this.state.isSession);
          } else {
            this.setState({
              isSession: true
            });
            this.props.toggleInterval(this.state.isSession);
          }
        }
        this.props.updateTimerMinute();
        this.setState({
          timerSecond: 59
        });
        break;
      default:
        this.setState((prevState) => {
          return {
            timerSecond: prevState.timerSecond - 1
          };
        });
        break;
    }
  }

  resetTimer() {
    this.props.resetTimer();
    this.props.onPlayStopTimer(false);
    this.setState({
      timerSecond: 0,
      isSession: true
    });
  }

  render() {
    return (
      <div>
        <section className="timer-container">
          <h4>{this.state.isSession === true ? "Session" : "Break"}</h4>
          <span className="timer">{this.props.timerMinute}</span>
          <span className="timer">:</span>
          <span className="timer">
            {
              this.props.timerSecond === 0
              ? "00"
              : this.state.timerSecond < 10
              ? "0" + this.state.timerSecond
              : this.state.timerSecond
            }
          </span>
        </section>
        <section>
          <button className="timer-actions" onClick={this.playTimer}>
            PLAY
          </button>
          <button className="timer-actions" onClick={this.resetTimer}>
            RESET
          </button>
        </section>
      </div>
    );
  }
}

export default Timer;
