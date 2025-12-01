import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Settings() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      {/* PAYMENT */}
      <TouchableOpacity
        onPress={() => router.push("/client/settings/payment")}
        style={styles.card}
      >
        <View style={styles.left}>
          <MaterialIcons name='payment' size={24} color='#6200EE' />
          <Text style={styles.text}>Payment</Text>
        </View>
        <MaterialIcons name='chevron-right' size={26} color='#777' />
      </TouchableOpacity>

      {/* CHANGE PASSWORD */}
      <TouchableOpacity
        onPress={() => router.push("/client/settings/chang-pass")}
        style={styles.card}
      >
        <View style={styles.left}>
          <MaterialIcons name='lock' size={24} color='#6200EE' />
          <Text style={styles.text}>Change Password</Text>
        </View>
        <MaterialIcons name='chevron-right' size={26} color='#777' />
      </TouchableOpacity>

      {/* NOTIFICATIONS */}
      <TouchableOpacity onPress={()=>router.push("/client/settings/notifications")} style={styles.card}>
        <View style={styles.left}>
          <MaterialIcons name='notifications' size={24} color='#6200EE' />
          <Text style={styles.text}>Notifications</Text>
        </View>
        <MaterialIcons name='chevron-right' size={26} color='#777' />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#f6f6f6ff",
    padding: 15,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E4E4E4",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  text: {
    fontSize: 16,
    color: "#333",
  },
});
