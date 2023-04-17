import { Switch } from "react-native";
import {
  HeaderButton,
  HeaderContainer,
  HeaderItem,
  HeaderScore,
  HeaderScoreSubtitle,
  HeaderScoreTitle,
  HeaderScores,
  HeaderSubtitle,
  HeaderTitle,
} from "./HeaderStyling";

interface IProps {
  startNewGame: () => boolean;
  currentScore: number;
  bestScore: number;
  currentScheme: string;
  setScheme: (v: string) => void;
}

export default function Header({
  startNewGame,
  currentScore,
  bestScore,
  currentScheme,
  setScheme,
}: IProps) {
  return (
    <HeaderContainer accessibilityRole="header">
      <HeaderItem>
        <HeaderTitle>2048</HeaderTitle>
        <HeaderScores>
          <HeaderScore>
            <HeaderScoreTitle> score </HeaderScoreTitle>
            <HeaderScoreSubtitle>{currentScore}</HeaderScoreSubtitle>
          </HeaderScore>
          <HeaderScore>
            <HeaderScoreTitle>best</HeaderScoreTitle>
            <HeaderScoreSubtitle>{bestScore}</HeaderScoreSubtitle>
          </HeaderScore>
        </HeaderScores>
      </HeaderItem>
      <HeaderItem>
        <HeaderScores>
          <HeaderSubtitle>Dark Mode</HeaderSubtitle>
          <Switch
            onValueChange={() => setScheme(currentScheme)}
            value={currentScheme !== "light"}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={currentScheme !== "light" ? "#f5dd4b" : "#f4f3f4"}
          />
        </HeaderScores>
        <HeaderButton
          accessibilityRole="button"
          onStartShouldSetResponderCapture={() => startNewGame()}
        >
          <HeaderScoreTitle>NEW GAME</HeaderScoreTitle>
        </HeaderButton>
      </HeaderItem>
    </HeaderContainer>
  );
}
