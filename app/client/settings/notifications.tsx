import { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

export default function Notifications() {
  const [enabled, setEnabled] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Enable Notifications</Text>
        <Switch
          value={enabled}
          onValueChange={setEnabled}
          trackColor={{ false: "#ccc", true: "#6200EE" }}
          thumbColor='#fff'
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 25 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    alignItems: "center",
  },
  label: { fontSize: 16, color: "#333" },
});
