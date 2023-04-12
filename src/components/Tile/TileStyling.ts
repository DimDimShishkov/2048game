import styled from "styled-components/native";
import { getTileColor } from "../../hooks/common";
import { theme } from "../../styles/default";
import { appear } from "../../hooks/animations";

interface ITile {
  x: number;
  y: number;
  value: number;
  width: number;
  color: string;
  isNew: boolean;
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
  transition: transform 0.15s ease-in-out;
  background: ${({ value }) => theme[getTileColor(value)]},
  border-width: 4px;
  border-color: #776e65;
  box-sizing: border-box;
  display: flex;
  text-align: center;
  justify-content: center;
  `;

export const TileValue = styled.Text`
  width: 100%;
  height: 100%;
  display: flex;
  text-align: center;
  justify-content: center;
`;
// font-size: inherit;
