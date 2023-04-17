import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Appearance, Dimensions } from "react-native";
import styled, { ThemeProvider } from "styled-components/native";
import Header from "./src/components/Header/Header";
import Board from "./src/components/Board/Board";
import Footer from "./src/components/Footer/Footer";
import { boardGenerator } from "./src/hooks/common";
import { IBoardMatrix } from "./src/hooks/types";
import { theme } from "./src/styles/default";
import { nightTheme } from "./src/styles/night";
import { ThemeName } from "./src/styles/types";

export default function App() {
  const [isGameOver, setGameOver] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [currentScheme, setScheme] = useState<ThemeName>("light");
  const [boardMatrix, setBoardMatrix] = useState<IBoardMatrix[][]>([]);
  const [boardRows, setBoardRows] = useState(4);
  const [boardColumns, setBoardColumns] = useState(4);

  useEffect(() => {
    setScheme(Appearance.getColorScheme() || "light");
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
    setBoardMatrix(handleRandomTile(newBoard));
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
          currentTiles[c].isNew = true;
          currentTiles.splice(c + 1, 1);
        } else {
          currentTiles[c].isNew = false;
        }
      }
      // перезаписываем значения
      return row.map((item, index) => {
        return currentTiles[index]
          ? {
              ...item,
              value: currentTiles[index].value,
              isNew: currentTiles[index].isNew,
            }
          : { ...item, value: 0, isNew: false };
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
          currentTiles[c - 1].isNew = true;
          currentTiles.splice(c - 2, 1);
        } else {
          currentTiles[c - 1].isNew = false;
        }
      }
      let rotatedTiles = currentTiles.reverse();
      // // перезаписываем значения
      return row.map((item, index) => {
        return rotatedTiles[row.length - 1 - index]
          ? {
              ...item,
              value: rotatedTiles[row.length - 1 - index].value,
              isNew: rotatedTiles[row.length - 1 - index].isNew,
            }
          : {
              ...item,
              value: 0,
              isNew: false,
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
          currentTiles[c].isNew = true;
          currentTiles.splice(c + 1, 1);
        } else {
          currentTiles[c].isNew = false;
        }
      }
      // перезаписываем значения
      return row.map((item, index) => {
        return currentTiles[index]
          ? {
              ...item,
              value: currentTiles[index].value,
              isNew: currentTiles[index].isNew,
            }
          : { ...item, value: 0, isNew: false };
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
          currentTiles[c].isNew = true;
          currentTiles.splice(c + 1, 1);
        } else {
          currentTiles[c].isNew = false;
        }
      }
      // перезаписываем значения
      return row.map((item, index) => {
        return currentTiles[index]
          ? {
              ...item,
              value: currentTiles[index].value,
              isNew: currentTiles[index].isNew,
            }
          : { ...item, value: 0, isNew: false };
      });
    });
    return setBoardMatrix(handleRandomTile(rotateLeft(board)));
  }

  // слушатель свайпа по экрану
  const swipeHandler = (direction: string) => {
    if (direction === "SWIPE_RIGHT") moveRight(boardMatrix);
    if (direction === "SWIPE_LEFT") moveLeft(boardMatrix);
    if (direction === "SWIPE_UP") moveUp(boardMatrix);
    if (direction === "SWIPE_DOWN") moveDown(boardMatrix);
  };

  return (
    <ThemeProvider theme={currentScheme === "light" ? theme : nightTheme}>
      {/* замена View на SafeAreaView из-за челок на айфоне  */}
      <Container>
        <Header
          startNewGame={() => startNewGame()}
          currentScore={currentScore}
          bestScore={bestScore}
          currentScheme={currentScheme}
          setScheme={(currentScheme: string) =>
            setScheme(currentScheme === "light" ? "dark" : "light")
          }
        />
        {boardMatrix && (
          <Board
            boardMatrix={boardMatrix}
            swipeHandler={(i: string) => swipeHandler(i)}
            isGameOver={isGameOver}
          />
        )}
        <Footer />

        <StatusBar style="auto" />
      </Container>
    </ThemeProvider>
  );
}

export const Container = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  max-width: ${Dimensions.get("window").width}px;
  margin-horizontal: auto;
  align-items: center;
  position: relative;
  background-color: ${(props) => props.theme["background"]};
`;
