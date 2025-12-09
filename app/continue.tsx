import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import {
  Feather as Package,
  AntDesign as Shield,
  Feather as User,
} from "@expo/vector-icons";
export default function Login() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Hero Image */}
      {/* <Image
        source={image}
        style={styles.image}
        contentFit='contain'
        transition={800}
      /> */}

      {/* Title */}
      <Text style={styles.header}>Welcome to Nex Courier</Text>

      {/* Sub Description */}
      <Text style={styles.subHeader}>Please select your role to continue.</Text>

      {/* Role Blocks */}
      <View style={styles.rolesContainer}>
        <TouchableOpacity
          style={styles.roleBlock}
          // onPress={() => router.push("/(auth)/admin/login")}
        >
          <Shield size={40} color='#6200EE' />
          <Text style={styles.roleTitle}>Admin</Text>
          <Text style={styles.roleDesc}>Manage users & shipments</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.roleBlock}
          onPress={() => router.push("/client/login")}
        >
          <User size={40} color='#03A9F4' />
          <Text style={styles.roleTitle}>Store Login</Text>
          <Text style={styles.roleDesc}>Send parcels easily</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.roleBlock}
          onPress={() => router.push("/delivery/login")}
        >
          <Package size={40} color='#FF9800' />
          <Text style={styles.roleTitle}>Delivery</Text>
          <Text style={styles.roleDesc}>Deliver assigned parcels</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 Nex Courier</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: 220,
    height: 220,
    marginBottom: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#222",
    textAlign: "center",
  },
  subHeader: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    marginBottom: 25,
  },
  rolesContainer: {
    width: "100%",
    gap: 15,
  },
  roleBlock: {
    width: "100%",
    padding: 18,
    backgroundColor: "#F4F4F4",
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: "#222",
  },
  roleDesc: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
    textAlign: "center",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    alignItems: "center",
  },
  footerText: {
    color: "#999",
    fontSize: 14,
  },
});
