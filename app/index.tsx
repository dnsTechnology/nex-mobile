import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import image from "../assets/images/img.png";
import { useTestForNowQuery } from "./api/base";
import { tokenManager } from "./utils/tokenManager";

export default function Index() {
  const router = useRouter();

  const { data, error, isLoading } = useTestForNowQuery();

  console.log(data, error, isLoading);

  return (
    <View style={styles.container}>
      {/* Hero Image */}
      <View
        style={{
          width: "100%",
          position: "absolute",
          top: 30,
          left: 5,

          alignItems: "center",
          marginBottom: 20,
        }}
      >
        {/* FIRST ROW */}
        <View style={{ flexDirection: "row", gap: 10 }}>
          {/* Live Tracking */}
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#727070ff",
              paddingVertical: 8,
              paddingHorizontal: 14,
              borderRadius: 20,
              alignItems: "center",
              gap: 6,
            }}
          >
            <MaterialIcons name="location-searching" size={18} color="#fff" />
            <Text style={{ color: "#fff", fontSize: 14 }}>Live Tracking</Text>
          </View>

          {/* One-Time Delivery */}
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#48a45dff",
              paddingVertical: 8,
              paddingHorizontal: 14,
              borderRadius: 20,
              alignItems: "center",
              gap: 6,
            }}
          >
            <MaterialIcons name="schedule" size={18} color="#fff" />
            <Text style={{ color: "#fff", fontSize: 14 }}>
              One-Time Delivery
            </Text>
          </View>
        </View>

        {/* SECOND ROW */}
        <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
          {/* Fast & Secure */}
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#5c71a8ff",
              paddingVertical: 8,
              paddingHorizontal: 14,
              borderRadius: 20,
              alignItems: "center",
              gap: 6,
            }}
          >
            <MaterialIcons name="security" size={18} color="#fff" />
            <Text style={{ color: "#fff", fontSize: 14 }}>Fast & Secure</Text>
          </View>
        </View>
      </View>

      {/* Your Image */}
      <Image
        source={image}
        style={styles.image}
        contentFit="contain"
        transition={1000}
      />

      {/* Title */}
      <Text style={styles.header}>Welcome to Nex Courier</Text>

      {/* Sub Title / Description */}
      <Text style={styles.subHeader}>
        Fast, reliable, and easy courier management at your fingertips. Track,
        create, and manage shipments efficiently.
      </Text>

      <View style={{ width: "100%", gap: 15 }}>
        {/* Continue Button */}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => router.push("/continue")}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
          <Ionicons name="arrow-forward-circle" size={22} color="#fff" />
        </TouchableOpacity>

        {/* Track Button */}
        <TouchableOpacity
          style={styles.trackingBtn}
          // onPress={() => router.push("/continue")}
        >
          <Text style={styles.continueButtonText}>Track Your Package</Text>
          <MaterialIcons name="location-searching" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 Next Courier</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffffde",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
    borderRadius: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
    textAlign: "center",
  },
  subHeader: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 22,
  },
  continueButton: {
    backgroundColor: "#6200EE",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 10,
  },
  trackingBtn: {
    backgroundColor: "rgba(74, 75, 73, 1)",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    alignItems: "center",
  },
  footerText: {
    color: "#888",
    fontSize: 14,
  },
});
