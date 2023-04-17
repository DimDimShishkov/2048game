import GestureRecognizer from "react-native-swipe-gestures";
import Tile from "../Tile/Tile";
import { IBoardMatrix } from "../../hooks/types";
import { BoardContainer } from "./BoardStyling";
import { deviseWightHandler } from "../../hooks/common";

interface IProps {
  boardMatrix: IBoardMatrix[][];
  swipeHandler: (i: string) => void;
}

export default function Board({ boardMatrix, swipeHandler }: IProps) {
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
        </BoardContainer>
      )}
    </GestureRecognizer>
  );
}
