import styled, { ThemeContext } from "styled-components/native";
import { getTileColor } from "../../hooks/common";
import { theme } from "../../styles/default";
import { useContext } from "react";

interface ITile {
  x: number;
  y: number;
  width: number;
  color: string;
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
  border-color: #776e65;
  box-sizing: border-box;
  `;

export const TileValue = styled.View<ITileValue>`
  width: 100%;
  height: 100%;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  background: ${({ value }) => theme[getTileColor(value)]};
`;
// background: ${(props) => console.log(props.theme)};

export const TileText = styled.Text`
  font-size: 20px;
`;
