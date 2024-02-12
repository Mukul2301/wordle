import React, { useContext } from "react";
import { AppContext } from "../App";

const GameOver = () => {
  const { currAttempt, gameOver, correctWord } = useContext(AppContext);
  return (
    <div className="gameOver">
      <h3>
        {gameOver.guessedWord ? (
          <p>
            Yaay!🥳 <br />
            You Correctly Guessed the Wordle
          </p>
        ) : (
          "You Failed to Guess the Word"
        )}
      </h3>
      <h1>Correct word: {correctWord}</h1>
      {gameOver.guessedWord && (
        <h3>You guessed in {currAttempt.attempt} attempts.</h3>
      )}
      <button className="reloadBtn" onClick={() => window.location.reload()}>
        Play Again
      </button>
    </div>
  );
};

export default GameOver;
