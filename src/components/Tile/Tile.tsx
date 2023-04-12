import { TileContainer, TileValue } from "./TileStyling";
import { getTileColor } from "../../hooks/common";
import { theme } from "../../styles/default";

interface ITile {
  x: number;
  y: number;
  value: number;
  width: number;
  isNew?: boolean;
  isMerging?: boolean;
}

export default function Tile({ x, y, value, width, isNew = false }: ITile) {
  return (
    <TileContainer
      x={x}
      y={y}
      value={value}
      width={width}
      color={theme[getTileColor(value)]}
      isNew={isNew}
    >
      <TileValue>{!!value && value}</TileValue>
    </TileContainer>
  );
}
