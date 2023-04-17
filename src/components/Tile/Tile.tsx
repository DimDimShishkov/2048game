import { TileContainer, TileText, TileValue } from "./TileStyling";
import { getTileColor } from "../../hooks/common";
import { theme } from "../../styles/default";
import { Animated } from "react-native";
import { useEffect, useRef } from "react";
import { useTheme } from "styled-components";

interface ITile {
  x: number;
  y: number;
  value: number;
  width: number;
  isNew?: boolean;
  isMerging?: boolean;
}

export default function Tile({ x, y, value, width, isNew = false }: ITile) {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const TileItem = Animated.createAnimatedComponent(TileValue);

  useEffect(() => {
    isNew
      ? Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.1,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }),
        ]).start()
      : Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 0,
          useNativeDriver: true,
        }).start();
  }, []);

  const animatedStyles = {
    transform: [{ scale: scaleAnim }],
  };

  return (
    <TileContainer
      x={x}
      y={y}
      width={width}
      color={theme[getTileColor(value)]}
      isNew={isNew}
    >
      <TileItem width={width} value={value} style={[animatedStyles]}>
        <TileText>{!!value && value} </TileText>
      </TileItem>
    </TileContainer>
  );
}
