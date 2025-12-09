import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as LocalAuthentication from "expo-local-authentication";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function DeliveryLogin() {
  const [tab, setTab] = useState<"login" | "register">("login");

  const handleFingerprintAuth = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const savedBiometrics = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware || !savedBiometrics) {
        Alert.alert(
          "Fingerprint not available",
          "Your device does not support fingerprint authentication or no fingerprints are enrolled."
        );
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Login with Fingerprint",
        fallbackLabel: "Enter Password",
      });

      if (result.success) {
        Alert.alert("Success", "Logged in successfully!");
        // Navigate to Home or Dashboard here
      } else {
        Alert.alert("Failed", "Authentication failed!");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong with authentication");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 20,
            textAlign: "center",
            color: "#6200EE",
          }}
        >
          <Text style={{ color: "#9f0000ff" }}>Delivery</Text>{" "}
          <Text>{tab === "login" ? "Login" : "Register"}</Text>
        </Text>
        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, tab === "login" && styles.activeTab]}
            onPress={() => setTab("login")}
          >
            <Text
              style={[styles.tabText, tab === "login" && styles.activeTabText]}
            >
              Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, tab === "register" && styles.activeTab]}
            onPress={() => setTab("register")}
          >
            <Text
              style={[
                styles.tabText,
                tab === "register" && styles.activeTabText,
              ]}
            >
              Register
            </Text>
          </TouchableOpacity>
        </View>

        {/* LOGIN FORM */}
        {tab === "login" && (
          <View style={styles.form}>
            <TextInput
              placeholder='Email'
              style={styles.input}
              keyboardType='email-address'
            />
            <TextInput
              placeholder='Password'
              style={styles.input}
              secureTextEntry
            />

            <TouchableOpacity
              onPress={() => {
                router.push(`/delivery/home`);
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            {/* Fingerprint Button */}
            <TouchableOpacity
              style={styles.fingerprintButton}
              onPress={handleFingerprintAuth}
            >
              <MaterialCommunityIcons
                name='fingerprint'
                size={28}
                color='#6200EE'
              />

              <Text style={styles.fingerprintText}>Login with Fingerprint</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* REGISTER FORM */}
        {tab === "register" && (
          <View style={styles.form}>
            <TextInput placeholder='Full Name' style={styles.input} />
            <TextInput
              placeholder='Email'
              style={styles.input}
              keyboardType='email-address'
            />
            <TextInput
              placeholder='Mobile Number'
              style={styles.input}
              keyboardType='phone-pad'
            />
            <TextInput
              placeholder='Password'
              style={styles.input}
              secureTextEntry
            />
            <TextInput
              placeholder='Confirm Password'
              style={styles.input}
              secureTextEntry
            />

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 80,
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    minHeight: "100%",
  },

  tabContainer: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 30,
    backgroundColor: "#ddd",
    borderRadius: 30,
    padding: 5,
  },

  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
  },

  activeTab: {
    backgroundColor: "#6200EE",
  },

  tabText: {
    color: "#555",
    fontWeight: "600",
    fontSize: 16,
  },

  activeTabText: {
    color: "#fff",
  },

  form: {
    width: "100%",
    gap: 15,
    alignItems: "center",
  },

  input: {
    backgroundColor: "#fff",
    padding: 14,
    fontSize: 15,
    borderColor: "#ddd",
    borderWidth: 1,
    width: "100%",
  },

  button: {
    backgroundColor: "#6200EE",
    paddingVertical: 15,
    borderRadius: 6,
    marginTop: 10,
    alignItems: "center",
    width: "100%",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  fingerprintButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },

  fingerprintText: {
    color: "#6200EE",
    fontWeight: "600",
    fontSize: 16,
  },
});
