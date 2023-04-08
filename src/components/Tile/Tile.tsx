import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Alert, Button, StyleSheet, Switch, Text, View } from "react-native";

interface ITile {
  value: number;
}

export default function Tile({ value }: ITile) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "18%",
    height: "22%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eee1c9",
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#00966C",
  },
  title: {
    margin: 0,
    fontSize: 16,
    fontWeight: "bold",
  },
});
