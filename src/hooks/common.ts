import { Dimensions } from "react-native";
import { Color } from "../styles/types";

export const getTileColor = (v: number) => `tile${v}` as Color;

// расчет размера ячейки от ширины экрана (закладка если потом буду увеличивать количество ячеек)
export const deviseWightHandler = (i: number) =>
  (Dimensions.get("window").width * i) / 4;

export const boardGenerator = (rows: number, cols: number) =>
  Array.from({ length: cols }, (a, c) =>
    Array.from({ length: rows }, (a, r) => ({
      x: r,
      y: c,
      value: 0,
      isNew: false,
    }))
  );
