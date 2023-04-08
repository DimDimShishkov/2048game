import { Dimensions } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";

interface IProps {
  boardMatrix: number[][];
  swipeHandler: (i: string) => void;
}

export default function Board({ boardMatrix, swipeHandler }: IProps) {
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  const onSwipe = (gestureName: string) => {
    swipeHandler(gestureName);
  };

  const valueToColorHandler = (value: number) => {
    switch (value) {
      case 4:
        return styles.tile2;
      case 8:
        return styles.tile8;
      case 16:
        return styles.tile16;
      case 32:
        return styles.tile32;
      case 64:
        return styles.tile64;
      case 128:
        return styles.tile128;
      case 256:
        return styles.tile256;
      case 512:
        return styles.tile512;
      case 1024:
        return styles.tile1024;
      case 2048:
        return styles.tile2048;
      default:
        return styles.tile2;
    }
  };

  return (
    <GestureRecognizer
      onSwipe={(direction) => onSwipe(direction)}
      config={config}
      style={{
        height: "60%",
      }}
    >
      <View style={styles.container}>
        {boardMatrix.map((item: number[]) => {
          return item.map((i, index) => {
            return i ? (
              <View style={[styles.tile, valueToColorHandler(i)]} key={index}>
                <Text style={styles.title}>{i}</Text>
              </View>
            ) : (
              <View style={styles.item} key={index}></View>
            );
          });
        })}
      </View>
    </GestureRecognizer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "relative",
    gap: 0,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyItems: "center",
    alignContent: "center",
  },
  item: {
    width: Dimensions.get("window").width / 4 - 10,
    maxWidth: 100,
    height: Dimensions.get("window").width / 4 - 10,
    maxHeight: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#625f5b",
    borderRadius: 0,
    borderWidth: 4,
    borderColor: "#776e65",
    // margin: 2,
  },
  title: {
    margin: 0,
    fontSize: 16,
    fontWeight: "bold",
  },
  tile: {
    width: Dimensions.get("window").width / 4 - 10,
    maxWidth: 100,
    height: Dimensions.get("window").width / 4 - 10,
    maxHeight: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    // margin: 1,
    // borderColor: "none",
    // shadowColor: "#fff",
    // shadowOpacity: 1,
    // shadowRadius: 5,
  },

  tile2: {
    backgroundColor: "#eee1c9",
  },
  tile4: {
    backgroundColor: "#eee1c9",
  },
  tile8: {
    backgroundColor: "#f3b27a",
    color: "#f9f6f2",
  },
  tile16: {
    backgroundColor: "#f69664",
  },
  tile32: {
    backgroundColor: "#f77c5f",
  },
  tile64: {
    backgroundColor: "#f75f3b",
  },
  tile128: {
    backgroundColor: "#edd073",
  },
  tile256: {
    backgroundColor: "#edcc62",
  },
  tile512: {
    backgroundColor: "#edc950",
  },
  tile1024: {
    backgroundColor: "#edc53f",
  },
  tile2048: {
    backgroundColor: "#f9c000",
  },
});
