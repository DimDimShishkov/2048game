import GestureRecognizer from "react-native-swipe-gestures";
import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import Tile from "../Tile/Tile";
import { IBoardMatrix } from "../../hooks/types";
import {
  BoardContainer,
  GameOverContainer,
  GameOverText,
} from "./BoardStyling";
import { deviseWightHandler } from "../../hooks/common";

interface IProps {
  boardMatrix: IBoardMatrix[][];
  swipeHandler: (i: string) => void;
  isGameOver: boolean;
}

export default function Board({
  boardMatrix,
  swipeHandler,
  isGameOver,
}: IProps) {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const GameOver = Animated.createAnimatedComponent(GameOverContainer);

  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [isGameOver]);

  return (
    <GestureRecognizer onSwipe={(direction) => swipeHandler(direction)}>
      {boardMatrix && (
        <BoardContainer boardMatrix={boardMatrix}>
          {boardMatrix.map((row: IBoardMatrix[]) =>
            row.map((item: IBoardMatrix, index) => (
              <Tile
                value={item.value}
                x={item.x * 100}
                y={item.y * 100}
                width={deviseWightHandler(1)}
                key={item.x * 10 + item.y + item.value}
                isNew={item.isNew}
              />
            ))
          )}
          {isGameOver && (
            <GameOver style={{ opacity: scaleAnim }}>
              <GameOverText>Game over</GameOverText>
            </GameOver>
          )}
        </BoardContainer>
      )}
    </GestureRecognizer>
  );
}
