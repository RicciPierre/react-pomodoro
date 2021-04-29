/* eslint-disable react/prop-types */
import React from "react";

function SessionLenght(props) {
  function decreaseSession() {
    if (props.sessionLength === 0) {
      return;
    }
    props.decreaseSession();
  }

  function increaseSession() {
    if (props.sessionLength === 60) {
      return;
    }
    props.increaseSession();
  }

  return (
    <section>
      <section className="interval-container">
        <button className="up" disabled={props.isPlay === true ? "disabled" : ""} onClick={decreaseSession}>
          -
        </button>
        <p className="interval-p">{props.sessionLength}</p>
        <button className="down" disabled={props.isPlay === true ? "disabled" : ""} onClick={increaseSession}>
          +
        </button>
      </section>
    </section>
  );
}

export default SessionLenght;
