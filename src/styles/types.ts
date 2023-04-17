export type Color =
  | "black"
  | "white"
  | "mainText"
  | "subText"
  | "scoreBack"
  | "newGameButton"
  | "background"
  | "backdrop"
  | "tile0"
  | "tile2"
  | "tile4"
  | "tile8"
  | "tile16"
  | "tile32"
  | "tile64"
  | "tile128"
  | "tile256"
  | "tile512"
  | "tile1024"
  | "tile2048";

export type ITheme = Record<Color, string>;

export type ThemeName = "light" | "dark";

declare module "styled-components" {
  export interface DefaultTheme {
    black: string;
    white: string;
    mainText: string;
    subText: string;
    scoreBack: string;
    newGameButton: string;
    background: string;
    backdrop: string;
    tile0: string;
    tile2: string;
    tile4: string;
    tile8: string;
    tile16: string;
    tile32: string;
    tile64: string;
    tile128: string;
    tile256: string;
    tile512: string;
    tile1024: string;
    tile2048: string;
  }
}
