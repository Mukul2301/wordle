import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { boardDefault, generateWordSet } from "./Words";
import React, {
  useState,
  createContext,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import GameOver from "./components/GameOver";
import Instructions from "./components/Instructions";

export const AppContext = createContext();

const App = () => {
  const [board, setBoard] = useState(boardDefault);
  const [gameStart, setGameStart] = useState(true);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letter: 0 });
  const [wordSet, setWordSet] = useState(new Set());
  const [correctWord, setCorrectWord] = useState("");
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord.toUpperCase());
    });
  }, []);

  const onEnter = useCallback(() => {
    if (currAttempt.letter !== 5) return;

    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }
    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letter: 0 });
    } else {
      alert("Word not found");
    }

    if (currWord === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true });
      return;
    }

    if (currAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
    }
  }, [currAttempt, board, correctWord, wordSet]);

  const onDelete = useCallback(() => {
    if (currAttempt.letter === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letter: currAttempt.letter - 1 });
  }, [currAttempt, board]);

  const onSelectLetter = useCallback(
    (key) => {
      if (currAttempt.letter > 4) return;
      const newBoard = [...board];
      newBoard[currAttempt.attempt][currAttempt.letter] = key;
      setBoard(newBoard);
      setCurrAttempt({
        attempt: currAttempt.attempt,
        letter: currAttempt.letter + 1,
      });
    },
    [currAttempt, board]
  );

  const contextValue = useMemo(
    () => ({
      board,
      setBoard,
      currAttempt,
      setCurrAttempt,
      correctWord,
      onSelectLetter,
      onDelete,
      onEnter,
      setDisabledLetters,
      disabledLetters,
      gameOver,
      setGameStart,
    }),
    [
      board,
      currAttempt,
      correctWord,
      onSelectLetter,
      onDelete,
      onEnter,
      setDisabledLetters,
      disabledLetters,
      gameOver,
      setGameStart,
    ]
  );

  return (
    <div className="App">
      <nav>
        <span>
          <h1>Wordle</h1>by Mukul ❤️
        </span>
      </nav>
      <AppContext.Provider value={contextValue}>
        <div className="game">
          {gameStart ? <Instructions setGameStart={setGameStart} /> : <Board />}
          <div style={{ display: gameStart ? "none" : "block" }}>
            {gameOver.gameOver ? <GameOver /> : <Keyboard />}
          </div>
        </div>
      </AppContext.Provider>
    </div>
  );
};

export default App;
