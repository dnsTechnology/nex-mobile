import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import image from "../assets/images/img.png";
import { useTestForNowQuery } from "./api/base";

export default function Index() {
  const router = useRouter();

  const { data, error, isLoading } = useTestForNowQuery();

  console.log(data, error, isLoading);

  return (
    <View style={styles.container}>
      {/* Hero Image */}
      <Image
        source={image}
        style={styles.image}
        contentFit='contain'
        transition={1000}
      />

      {/* Title */}
      <Text style={styles.header}>Welcome to Nex Courier</Text>

      {/* Sub Title / Description */}
      <Text style={styles.subHeader}>
        Fast, reliable, and easy courier management at your fingertips. Track,
        create, and manage shipments efficiently.
      </Text>

      {/* Continue Button */}
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => router.push("/continue")}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>

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
    backgroundColor: "#f7f7f7",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 30,
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
    alignItems: "center",
    width: "100%",
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
