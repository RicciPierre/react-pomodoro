/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import Modal from "react-modal";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSession: true,
      timerSecond: 0,
      intervalId: 0,
      show: false
    };
    this.playTimer = this.playTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.decreaseTimer = this.decreaseTimer.bind(this);
    this.handleClose = this.handleClose.bind(this);
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
              isSession: false,
              show: true
            });
            this.props.toggleInterval(this.state.isSession);
            this.props.toggleInterval(this.state.show);
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
    this.props.resetTimer(window.location.reload());
    this.setState({
      timerSecond: 0,
      isSession: true
    });
  }

  handleClose() {
    this.setState({
      show: false
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
        </section>
        <div>
          <Modal
            isOpen={this.state.show}
            onRequestClose={this.state.show}
            className="Modal"
          >
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
              <button className="timer-actions" onClick={this.resetTimer}>
                RESET
              </button>
              <button className="timer-actions" onClick={this.handleClose}>
                CLOSE
              </button>
            </section>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Timer;
