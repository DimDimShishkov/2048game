import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  GestureResponderEvent,
  useWindowDimensions,
} from "react-native";

import { StyleSheet, Text, View } from "react-native";
import Header from "./src/components/Header/Header";
import Board from "./src/components/Board/Board";
import { useEffect, useState } from "react";

interface IBoardMatrix {
  row: number[];
  boardMatrix: number[][];
}

export default function App() {
  const [isGameOver, setGameOver] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [boardMatrix, setBoardMatrix] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  useEffect(() => {
    setRandomTile();
  }, []);

  // появление новой ячейки в рандомном месте
  const setRandomTile = () => {
    let result: number[][] = boardMatrix;
    const emptyCells = boardMatrix.flatMap((row, r) =>
      row.flatMap((cell, c) => (cell == 0 ? { r, c, cell } : []))
    );
    const item = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    item && (result[item.r][item.c] = Math.random() < 0.5 ? 2 : 4);
    const score = result.reduce(
      (acc, num) => acc + num.reduce((acc2, item) => acc2 + item, 0),
      0
    );
    bestScore < score && setBestScore(score);
    setCurrentScore(score);
    setBoardMatrix(result);
  };

  // начать новую игру
  const startNewGame = () => {
    setCurrentScore(0);
    setBoardMatrix([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
    return true;
  };

  function rotateRight(matrix: number[][]) {
    let result = [];
    for (let c = 0; c < matrix.length; c++) {
      let row = [];
      for (let r = matrix.length - 1; r >= 0; r--) {
        row.push(matrix[r][c]);
      }
      result.push(row);
    }
    return result;
  }

  function rotateLeft(matrix: number[][]) {
    let result = [];
    for (let c = matrix.length - 1; c >= 0; c--) {
      let row = [];
      for (let r = matrix.length - 1; r >= 0; r--) {
        row.unshift(matrix[r][c]);
      }
      result.push(row);
    }
    return result;
  }

  function moveUp(inputBoard: number[][]) {
    let rotatedRight = rotateRight(inputBoard);
    let board = [];
    // Shift all numbers to the right
    for (let r = 0; r < rotatedRight.length; r++) {
      let row = [];
      for (let c = 0; c < rotatedRight[r].length; c++) {
        let current = rotatedRight[r][c];
        current === 0 ? row.unshift(current) : row.push(current);
      }
      board.push(row);
    }
    // Combine numbers and shift to right
    for (let r = 0; r < board.length; r++) {
      for (let c = board[r].length - 1; c >= 0; c--) {
        if (board[r][c] > 0 && board[r][c] === board[r][c - 1]) {
          board[r][c] = board[r][c] * 2;
          board[r][c - 1] = 0;
        } else if (board[r][c] === 0 && board[r][c - 1] > 0) {
          board[r][c] = board[r][c - 1];
          board[r][c - 1] = 0;
        }
      }
    }
    board = rotateLeft(board);
    return setBoardMatrix(board);
  }

  function moveDown(inputBoard: number[][]) {
    let rotatedRight = rotateRight(inputBoard);
    let board = [];
    // Shift all numbers to the left
    for (let r = 0; r < rotatedRight.length; r++) {
      let row = [];
      for (let c = rotatedRight[r].length - 1; c >= 0; c--) {
        let current = rotatedRight[r][c];
        current === 0 ? row.push(current) : row.unshift(current);
      }
      board.push(row);
    }

    // Combine numbers and shift to left
    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board.length; c++) {
        if (board[r][c] > 0 && board[r][c] === board[r][c + 1]) {
          board[r][c] = board[r][c] * 2;
          board[r][c + 1] = 0;
        } else if (board[r][c] === 0 && board[r][c + 1] > 0) {
          board[r][c] = board[r][c + 1];
          board[r][c + 1] = 0;
        }
      }
    }

    // Rotate board back upright
    board = rotateLeft(board);
    return setBoardMatrix(board);
  }

  function moveRight(inputBoard: number[][]) {
    let board = [];
    // Shift all numbers to the right
    for (let r = 0; r < inputBoard.length; r++) {
      let row = [];
      for (let c = 0; c < inputBoard[r].length; c++) {
        let current = inputBoard[r][c];
        current === 0 ? row.unshift(current) : row.push(current);
      }
      board.push(row);
    }
    // Combine numbers and shift to right
    for (let r = 0; r < board.length; r++) {
      for (let c = board[r].length - 1; c >= 0; c--) {
        if (board[r][c] > 0 && board[r][c] === board[r][c - 1]) {
          board[r][c] = board[r][c] * 2;
          board[r][c - 1] = 0;
        } else if (board[r][c] === 0 && board[r][c - 1] > 0) {
          board[r][c] = board[r][c - 1];
          board[r][c - 1] = 0;
        }
      }
    }
    return setBoardMatrix(board);
  }

  function moveLeft(inputBoard: number[][]) {
    let board = [];
    // Shift all numbers to the left
    for (let r = 0; r < inputBoard.length; r++) {
      let row = [];
      for (let c = inputBoard[r].length - 1; c >= 0; c--) {
        let current = inputBoard[r][c];
        current === 0 ? row.push(current) : row.unshift(current);
      }
      board.push(row);
    }
    // Combine numbers and shift to left
    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board.length; c++) {
        if (board[r][c] > 0 && board[r][c] === board[r][c + 1]) {
          board[r][c] = board[r][c] * 2;
          board[r][c + 1] = 0;
        } else if (board[r][c] === 0 && board[r][c + 1] > 0) {
          board[r][c] = board[r][c + 1];
          board[r][c + 1] = 0;
        }
      }
    }
    return setBoardMatrix(board);
  }

  // слушатель свайпа по экрану
  const swipeHandler = (direction: string) => {
    setRandomTile();
    console.log(direction);
    if (direction === "SWIPE_RIGHT") moveRight(boardMatrix);
    if (direction === "SWIPE_LEFT") moveLeft(boardMatrix);
    if (direction === "SWIPE_UP") moveUp(boardMatrix);
    if (direction === "SWIPE_DOWN") moveDown(boardMatrix);
  };

  return (
    <View style={styles.container}>
      <Header
        startNewGame={() => startNewGame()}
        currentScore={currentScore}
        bestScore={bestScore}
      />
      <Board
        boardMatrix={boardMatrix}
        swipeHandler={(i: string) => swipeHandler(i)}
      />
      <Text>
        HOW TO PLAY: Swipe to move the tiles. Tiles with the same number merge
        into one when they touch. Add them up to reach 2048!
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: "100%",
    maxWidth: Dimensions.get("window").width - 10,
    marginHorizontal: "auto",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,

    // marginTop: 100,
  },
});
