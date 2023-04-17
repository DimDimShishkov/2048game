import styled from "styled-components/native";
import { getTileColor } from "../../hooks/common";

interface ITile {
  x: number;
  y: number;
  width: number;
  isNew: boolean;
}

interface ITileValue {
  width: number;
  value: number;
}

export const TileContainer = styled.View<ITile>`
  width: ${({ width }) => width}px;
  max-width: 100px;
  height: ${({ width }) => width}px;
  max-height: 100px;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(${({ x, y }) => `${x}px, ${y}px`})
  transition: translate 0.15s ease-in-out;
  border-width: 4px;
  border-color: ${(props) => props.theme.borderColor};
  box-sizing: border-box;
  `;

export const TileValue = styled.View<ITileValue>`
  width: 100%;
  height: 100%;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  background: ${({ theme, value }) => theme[getTileColor(value)]};
`;

export const TileText = styled.Text`
  font-size: 40px;
  text-align: center;
`;
