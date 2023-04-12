import { StyleSheet, Text, View } from "react-native";

export default function Footer() {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>
        HOW TO PLAY: Swipe to move the tiles. Tiles with the same number merge
        into one when they touch. Add them up to reach 2048!
      </Text>
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
});
