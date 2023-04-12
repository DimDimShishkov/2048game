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
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0;
`;
