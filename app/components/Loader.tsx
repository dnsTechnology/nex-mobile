import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";

export const Loader = () => {
  const dot1 = useRef(new Animated.Value(1)).current;
  const dot2 = useRef(new Animated.Value(1)).current;
  const dot3 = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animateDot = (dot: any, delay: any) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot, {
            toValue: 1.6,
            duration: 400,
            delay,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    };

    animateDot(dot1, 0);
    animateDot(dot2, 150);
    animateDot(dot3, 300);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.dot, { transform: [{ scale: dot1 }] }]} />
      <Animated.View style={[styles.dot, { transform: [{ scale: dot2 }] }]} />
      <Animated.View style={[styles.dot, { transform: [{ scale: dot3 }] }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 100,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#000",
  },
});
