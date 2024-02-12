import wordBank from "./wordle-bank.txt";

export const boardDefault = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

export const generateWordSet = async () => {
  let wordSet;
  let todaysWord;
  await fetch(wordBank)
    .then((response) => response.text())
    .then((result) => {
      const wordArr = result.split("\n");
      const wordsArray = wordArr.flatMap((line) => line.trim().split(/\s+/));
      todaysWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
      wordSet = new Set(wordsArray);
    });
  return { wordSet, todaysWord };
};
