import React, { useCallback, useEffect, useContext, useMemo } from "react";
import Key from "./Key";
import { AppContext } from "../App";

const Keyboard = () => {
  const keys1 = useMemo(
    () => ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    []
  );
  const keys2 = useMemo(
    () => ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    []
  );
  const keys3 = useMemo(() => ["Z", "X", "C", "V", "B", "N", "M"], []);

  const { disabledLetters, gameOver, onSelectLetter, onEnter, onDelete } =
    useContext(AppContext);

  const handleKeyboard = useCallback(
    (event) => {
      if (gameOver.gameOver) return;
      if (event.key === "Enter") {
        onEnter();
      } else if (event.key === "Backspace") {
        onDelete();
      } else {
        const allKeys = [...keys1, ...keys2, ...keys3];
        const pressedKey = event.key.toUpperCase();
        if (allKeys.includes(pressedKey)) {
          onSelectLetter(pressedKey);
        }
      }
    },
    [gameOver.gameOver, keys1, keys2, keys3, onSelectLetter, onEnter, onDelete]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <div className="keyboard">
      <div className="line1">
        {keys1.map((key) => {
          return (
            <Key
              key={key}
              keyVal={key}
              disabled={disabledLetters.includes(key)}
            />
          );
        })}
      </div>
      <div className="line2">
        {keys2.map((key) => {
          return (
            <Key
              key={key}
              keyVal={key}
              disabled={disabledLetters.includes(key)}
            />
          );
        })}
      </div>
      <div className="line3">
        {keys3.map((key) => {
          return (
            <Key
              key={key}
              keyVal={key}
              disabled={disabledLetters.includes(key)}
            />
          );
        })}
        <Key keyVal={"DELETE"} bigKey />
      </div>
      <div className="line4">
        <Key keyVal={"ENTER"} bigKey />
      </div>
    </div>
  );
};

export default Keyboard;
