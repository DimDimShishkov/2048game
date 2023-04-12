import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
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
    <GestureRecognizer
      onSwipe={(direction) => swipeHandler(direction)}
      // style={styles.container}
    >
      {boardMatrix && (
        <BoardContainer boardMatrix={boardMatrix}>
          {boardMatrix.map((row: IBoardMatrix[]) =>
            row.map((item: IBoardMatrix, index) => (
              <Tile
                value={item.value}
                x={item.x * 100}
                y={item.y * 100}
                width={deviseWightHandler(1)}
                key={item.x * 10 + item.y}
                isNew={item.isNew}
              />
            ))
          )}
        </BoardContainer>
      )}
    </GestureRecognizer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: `${deviseWightHandler(4)}`,
    maxWidth: 400,
    height: `${deviseWightHandler(4)}`,
    maxHeight: 400,
    position: "relative",
    marginHorizontal: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
