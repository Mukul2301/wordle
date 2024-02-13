import React, { useContext } from "react";
import { AppContext } from "../App";

const Instructions = () => {
  const { setGameStart } = useContext(AppContext);
  const handleGameStart = () => {
    setGameStart(false);
  };
  return (
    <div>
      <h2>
        <p>
          <h1> Welcome to Wordle!</h1> <br />
          The goal is to guess a secret five-letter word chosen by the game,
          within six attempts. <br />
          <ul>
            <li>
              Letters in the correct position are displayed in{" "}
              <span style={{ color: "#528d4e" }}> GREEN.</span>
            </li>
            <br />
            <li>
              Letters that are in the secret word but in the wrong
              <br />
              position are displayed in{" "}
              <span style={{ color: "#b49f39" }}> YELLOW.</span>
            </li>
            <br />
            <li>
              Letters that are not in the secret word are displayed in{" "}
              <span style={{ color: "#3a393c" }}> GRAY.</span>
            </li>
          </ul>
        </p>
        <button className="button" onClick={handleGameStart}>
          Start
        </button>
      </h2>
    </div>
  );
};

export default Instructions;
