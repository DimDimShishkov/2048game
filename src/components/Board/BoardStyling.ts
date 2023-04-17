import styled from "styled-components/native";
import { deviseWightHandler } from "../../hooks/common";
import { IBoardMatrix } from "../../hooks/types";

interface IBoard {
  boardMatrix: IBoardMatrix[][];
}

export const BoardContainer = styled.View<IBoard>`
  width: ${({ boardMatrix }) => deviseWightHandler(boardMatrix?.length)}px;
  max-width: 400px;
  height: ${({ boardMatrix }) => deviseWightHandler(boardMatrix[0]?.length)}px;
  max-height: 400px;
  position: relative;
`;

export const GameOverContainer = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 5;
  background-color: ${(props) => props.theme["background"]};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const GameOverText = styled.Text`
  font-size: 40px;
  text-align: center;
`;
