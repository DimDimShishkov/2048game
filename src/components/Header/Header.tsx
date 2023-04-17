import { useContext, useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { ThemeContext, useTheme } from "styled-components";

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
  let palette = useTheme();
  console.log(palette);
  return (
    <View style={styles.container} accessibilityRole="header">
      {/* <View style={styles.item}>
        <Text style={{ color: palette.mainText, ...styles.title }}>2048</Text>
        <View style={styles.scores}>
          <View style={{ backgroundColor: palette.scoreBack, ...styles.score }}>
            <Text style={{ color: palette.subText, ...styles.scoreTitle }}>
              score
            </Text>
            <Text style={{ color: palette.subText, ...styles.scoreSubtitle }}>
              {currentScore}
            </Text>
          </View>
          <View style={{ backgroundColor: palette.scoreBack, ...styles.score }}>
            <Text style={{ color: palette.subText, ...styles.scoreTitle }}>
              best
            </Text>
            <Text style={{ color: palette.subText, ...styles.scoreSubtitle }}>
              {bestScore}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.item}>
        <View style={styles.scores}>
          <Text style={{ color: palette.mainText, ...styles.subtitle }}>
            Dark Mode
          </Text>
          <Switch
            onValueChange={() => setScheme(currentScheme)}
            value={currentScheme !== "light"}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={currentScheme !== "light" ? "#f5dd4b" : "#f4f3f4"}
          />
        </View>
        <View
          style={{
            backgroundColor: palette.newGameButton,
            ...styles.button,
          }}
          accessibilityRole="button"
          onStartShouldSetResponderCapture={() => startNewGame()}
        >
          <Text style={{ color: palette.subText, ...styles.scoreTitle }}>
            NEW GAME
          </Text>
        </View>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 500,
    marginVertical: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 10,
  },
  item: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  title: {
    margin: 0,
    fontSize: 60,
    fontWeight: "bold",
  },
  subtitle: {
    margin: 0,
    fontSize: 16,
    fontWeight: "bold",
  },
  scores: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "nowrap",
    gap: 8,
  },
  score: {
    boxSizing: "border-box",
    textAlign: "center",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    minWidth: 100,
    height: 80,
  },
  scoreTitle: {
    margin: 0,
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  scoreSubtitle: {
    margin: 0,
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
  },
  button: {
    border: "none",
    borderRadius: 4,
    paddingHorizontal: 20,
    height: 40,
    width: "100%",
    maxWidth: 150,
    textAlign: "center",
    flexShrink: 0,
    fontSize: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
