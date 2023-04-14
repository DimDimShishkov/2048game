import { StatusBar } from "expo-status-bar";
import { Dimensions } from "react-native";

import { StyleSheet, Text, View } from "react-native";
import Header from "./src/components/Header/Header";
import Board from "./src/components/Board/Board";
import { useEffect, useState } from "react";
import Footer from "./src/components/Footer/Footer";
import { boardGenerator } from "./src/hooks/common";
import { IBoardMatrix } from "./src/hooks/types";

export default function App() {
  const [isGameOver, setGameOver] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const [boardMatrix, setBoardMatrix] = useState<IBoardMatrix[][]>([]);
  const [boardRows, setBoardRows] = useState(4);
  const [boardColumns, setBoardColumns] = useState(4);

  useEffect(() => {
    let newBoard = boardGenerator(boardRows, boardColumns);
    setBoardMatrix(handleRandomTile(newBoard));
  }, [boardRows, boardColumns]);

  // появление новой ячейки в рандомный месте
  const handleRandomTile = (newBoard: IBoardMatrix[][]) => {
    let result = newBoard;
    // берем массив всех пустых клеток и выбираем одну из них
    const emptyCells = newBoard.flatMap((row) =>
      row.filter((cell) => cell.value == 0 && cell)
    );
    const emptyCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    // если найдена, присвоить новое значение
    emptyCell
      ? (result = result.map((row) =>
          row.map((cell) =>
            cell.x === emptyCell.x && cell.y === emptyCell.y
              ? { ...cell, value: Math.random() < 0.5 ? 2 : 4, isNew: true }
              : cell
          )
        ))
      : setGameOver(true);
    // суммируем очки и записываем результат
    const score = result.reduce(
      (acc, row) => acc + row.reduce((acc, item) => acc + item.value, 0),
      0
    );
    bestScore < score && setBestScore(score);
    setCurrentScore(score);
    return result;
  };

  // начать новую игру
  const startNewGame = () => {
    let newBoard = boardGenerator(boardRows, boardColumns);
    setCurrentScore(0);
    setBoardMatrix(newBoard);
    handleRandomTile(newBoard);
    setGameOver(false);
    return true;
  };

  function rotateRight(matrix: IBoardMatrix[][]) {
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
  function rotateLeft(matrix: IBoardMatrix[][]) {
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

  // свапы
  function moveLeft(inputBoard: IBoardMatrix[][]) {
    // фильтруем ячейки со значениями и складываем если значения одинаковые
    let board = inputBoard.map((row) => {
      let currentTiles = row.filter((tile) => tile.value != 0);
      for (let c = 0; c < currentTiles.length; c++) {
        if (currentTiles[c].value === currentTiles[c + 1]?.value) {
          currentTiles[c].value = currentTiles[c].value * 2;
          currentTiles.splice(c + 1, 1);
        }
      }
      // перезаписываем значения
      return row.map((item, index) => {
        return currentTiles[index]
          ? { ...item, value: currentTiles[index].value }
          : { ...item, value: 0 };
      });
    });
    return setBoardMatrix(handleRandomTile(board));
  }
  function moveRight(inputBoard: IBoardMatrix[][]) {
    let board = inputBoard.map((row) => {
      let currentTiles = row.filter((tile) => tile.value != 0);
      for (let c = currentTiles.length; c > 0; c--) {
        if (currentTiles[c - 1].value === currentTiles[c - 2]?.value) {
          currentTiles[c - 1].value = currentTiles[c - 1].value * 2;
          currentTiles.splice(c - 2, 1);
        }
      }
      let rotatedTiles = currentTiles.reverse();
      // // перезаписываем значения
      return row.map((item, index) => {
        return rotatedTiles[row.length - 1 - index]
          ? {
              ...item,
              value: rotatedTiles[row.length - 1 - index].value,
            }
          : {
              ...item,
              value: 0,
            };
      });
    });

    return setBoardMatrix(handleRandomTile(board));
  }
  function moveUp(inputBoard: IBoardMatrix[][]) {
    let rotatedRight = rotateLeft(inputBoard);
    let board = rotatedRight.map((row) => {
      let currentTiles = row.filter((tile) => tile.value != 0);
      for (let c = 0; c < currentTiles.length; c++) {
        if (currentTiles[c].value === currentTiles[c + 1]?.value) {
          currentTiles[c].value = currentTiles[c].value * 2;
          currentTiles.splice(c + 1, 1);
        }
      }
      // перезаписываем значения
      return row.map((item, index) => {
        return currentTiles[index]
          ? { ...item, value: currentTiles[index].value }
          : { ...item, value: 0 };
      });
    });
    return setBoardMatrix(handleRandomTile(rotateRight(board)));
  }
  function moveDown(inputBoard: IBoardMatrix[][]) {
    let rotatedRight = rotateRight(inputBoard);
    let board = rotatedRight.map((row) => {
      let currentTiles = row.filter((tile) => tile.value != 0);
      for (let c = 0; c < currentTiles.length; c++) {
        if (currentTiles[c].value === currentTiles[c + 1]?.value) {
          currentTiles[c].value = currentTiles[c].value * 2;
          currentTiles.splice(c + 1, 1);
        }
      }
      // перезаписываем значения
      return row.map((item, index) => {
        return currentTiles[index]
          ? { ...item, value: currentTiles[index].value }
          : { ...item, value: 0 };
      });
    });
    return setBoardMatrix(handleRandomTile(rotateLeft(board)));
  }

  // слушатель свапа по экрану
  const swipeHandler = (direction: string) => {
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
      {boardMatrix && (
        <Board
          boardMatrix={boardMatrix}
          swipeHandler={(i: string) => swipeHandler(i)}
        />
      )}

      <Footer />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: "100%",
    height: "100%",
    maxWidth: Dimensions.get("window").width,
    marginHorizontal: "auto",
    backgroundColor: "#fff",
    alignItems: "center",
    position: "relative",
    // justifyContent: "center",
    // padding: 10,

    // marginTop: 100,
  },
});
