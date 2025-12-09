import { FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HeaderBack({ backgroundColor = "#6200EE" }) {
  const router = useRouter();

  return (
    <View>
      <StatusBar style='light' backgroundColor={backgroundColor} />
      <View style={[styles.header, { backgroundColor }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>
            <FontAwesome6 name='chevron-left' size={24} color='#fff' />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    paddingVertical: 18,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  backBtn: {
    marginTop: 20,
  },
  backText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    padding: 0,
    margin: 0,
    boxSizing: "border-box",
  },
});
