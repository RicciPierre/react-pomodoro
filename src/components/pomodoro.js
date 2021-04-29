import React from "react";
import SessionLenght from "./sessionLength";
import Timer from "./timer";

class Pomodoro extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timerMinute: 25,
      isPlay: false
    };
    this.onIncreaseSessionLength = this.onIncreaseSessionLength.bind(this);
    this.onDecreaseSessionLength = this.onDecreaseSessionLength.bind(this);
    this.onUpdateTimerMinute = this.onUpdateTimerMinute.bind(this);
    this.onToggleInterval = this.onToggleInterval.bind(this);
    this.onResetTimer = this.onResetTimer.bind(this);
    this.onPlayStopTimer = this.onPlayStopTimer.bind(this);
  }

  onIncreaseSessionLength() {
    this.setState((prevState) => {
      return {
        sessionLength: prevState.sessionLength + 5,
        timerMinute: prevState.sessionLength + 5,
      };
    });
  }

  onDecreaseSessionLength() {
    this.setState((prevState) => {
      return {
        sessionLength: prevState.sessionLength - 1,
        timerMinute: prevState.sessionLength - 1,
      };
    });
  }

  onUpdateTimerMinute() {
    this.setState((prevState) => {
      return {
        timerMinute: prevState.timerMinute - 1,
      };
    });
  }

  onToggleInterval(isSession) {
    if (isSession) {
      this.setState({
        timerMinute: this.state.sessionLength,
      });
    } else {
      this.setState({
        timerMinute: this.state.breakLength,
      });
    }
  }

  onResetTimer() {
    this.setState({
      timerMinute: this.state.sessionLength,
    });
  }

  onPlayStopTimer(isPlay) {
    this.setState({
      isPlay: isPlay,
    });
  }

  render() {
    return (
      <main>
        <h2>Pomodorrro</h2>
        <section className="interval-length-container">
          <SessionLenght
            isPlay={this.state.isPlay}
            sessionLength={this.state.sessionLength}
            increaseSession={this.onIncreaseSessionLength}
            decreaseSession={this.onDecreaseSessionLength}
          />
        </section>
        <Timer
          timerMinute={this.state.timerMinute}
          breakTimer={this.state.breakLength}
          updateTimerMinute={this.onUpdateTimerMinute}
          toggleInterval={this.onToggleInterval}
          resetTimer={this.onResetTimer}
          onPlayStopTimer={this.onPlayStopTimer}
        />
      </main>
    );
  }
}

export default Pomodoro;
