import { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

interface IProps {
  startNewGame: () => boolean;
  currentScore: number;
  bestScore: number;
}

export default function Header({
  startNewGame,
  currentScore,
  bestScore,
}: IProps) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.container} accessibilityRole="header">
      <View style={styles.item}>
        <Text style={styles.title}>2048</Text>
        <View style={styles.scores}>
          <View style={styles.score}>
            <Text style={styles.scoreTitle}>score</Text>
            <Text style={styles.scoreSubtitle}>{currentScore}</Text>
          </View>
          <View style={styles.score}>
            <Text style={styles.scoreTitle}>best</Text>
            <Text style={styles.scoreSubtitle}>{bestScore}</Text>
          </View>
        </View>
      </View>
      <View style={styles.item}>
        <View style={styles.scores}>
          <Text style={styles.subtitle}>Dark Mode</Text>
          <Switch
            onValueChange={toggleSwitch}
            value={isEnabled}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          />
        </View>
        <View
          style={styles.button}
          accessibilityRole="button"
          onStartShouldSetResponderCapture={() => startNewGame()}
        >
          <Text style={styles.scoreTitle}>NEW GAME</Text>
        </View>
        {/* <Button
          title="NEW GAME"
          onPress={() => Alert.alert("Simple Button pressed")}
        /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 500,
    marginVertical: 50,
    backgroundColor: "#fff",
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
    // lineHeight: 80,
    // lineHeight: 1.02,
    fontWeight: "bold",
  },
  subtitle: {
    margin: 0,
    fontSize: 16,
    // lineHeight: 80,
    // lineHeight: 1.02,
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
    backgroundColor: "#bbada0",
    borderRadius: 4,
    color: "white",
    minWidth: 100,
    height: 80,
  },
  scoreTitle: {
    margin: 0,
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "white",
  },
  scoreSubtitle: {
    margin: 0,
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
    color: "white",
  },
  button: {
    backgroundColor: "#8f7a66",
    border: "none",
    borderRadius: 4,
    paddingHorizontal: 20,
    color: "#f9f6f2",
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
