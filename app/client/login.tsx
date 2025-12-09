import { useRegisterClientMutation } from "@/app/api/authApi";
import FileInput from "@/app/components/FileInput";
import { useAuthClient } from "@/app/contexts/AuthContextClient";
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
import { tokenManager } from "../utils/tokenManager";

export default function ClientLogin() {
  const { setUser } = useAuthClient();
  const [tab, setTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // For login
  const [name, setName] = useState(""); // For register
  const [mobile, setMobile] = useState(""); // For register
  const [address, setAddress] = useState(""); // For register
  const [organization, setOrganization] = useState(""); // For register
  const [confirmPassword, setConfirmPassword] = useState(""); // For register

  const [register, { isLoading: isRegistering, error: registerError }] =
    useRegisterClientMutation();
  const { login, isLoading } = useAuthClient();

  const handleFingerprintAuth = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const savedBiometrics = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware || !savedBiometrics) {
        Alert.alert(
          "Fingerprint not available",
          "Your device does not support fingerprint authentication or no fingerprints are enrolled.",
        );
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Login with Fingerprint",
        fallbackLabel: "Enter Password",
      });

      if (result.success) {
        // ⬇ Load saved session
        const user = await tokenManager.getClientUser();
        const token = await tokenManager.getClientAccessToken();

        if (user && token) {
          setUser(user); // Restore session in your Auth context
          router.replace("/client/home");
        } else {
          Alert.alert("Error", "No active session found. Please login first.");
        }
      } else {
        Alert.alert("Failed", "Authentication failed!");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong with authentication");
    }
  };

  const handleLogin = async () => {
    try {
      if (tab === "login") {
        await login(email, password);
      } else if (tab === "register") {
        const response = await register({
          name,
          mobile,
          address,
          organization,
          email,
          password,
          confirmPassword,
        });
        if (response?.data?.error) {
          Alert.alert("Error", "Faild to register. Try again later.");
        } else if (response?.data?.success) {
          Alert.alert(
            "Success",
            response.data.message || "Registration successful!",
          );
          setTab("login");
          setEmail("");
          setPassword("");
          setName("");
          setMobile("");
          setAddress("");
          setOrganization("");
          setConfirmPassword("");
          router.push("/client/home");
        } else {
          Alert.alert(
            "Error",
            response?.data?.message || "Failed to register. Try again later.",
          );
        }
      } else {
        Alert.alert("Error", "Invalid tab");
        return;
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong with authentication");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        height: 100,
      }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Tabs */}

        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 20,
            textAlign: "center",
            color: "#6200EE",
          }}
        >
          <Text style={{ color: "#9f0000ff" }}>Client</Text>{" "}
          <Text>{tab === "login" ? "Login" : "Register"}</Text>
        </Text>
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

        {/* ------------------------- LOGIN FORM ------------------------- */}
        {tab === "login" && (
          <View style={styles.form}>
            <TextInput
              placeholder="Email"
              style={styles.input}
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              placeholder="Password"
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={(text) => setPassword(text)}
            />

            <TouchableOpacity
              disabled={isLoading}
              style={styles.button}
              onPress={handleLogin}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            {/* Fingerprint Button */}
            <TouchableOpacity
              style={styles.fingerprintButton}
              onPress={handleFingerprintAuth}
            >
              <MaterialCommunityIcons
                name="fingerprint"
                size={28}
                color="#6200EE"
              />
              <Text style={styles.fingerprintText}>Login with Fingerprint</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ------------------------- REGISTER FORM ------------------------- */}
        {tab === "register" && (
          <View style={styles.form}>
            <View style={{ marginTop: 20 }}>
              <FileInput />
            </View>
            <TextInput placeholder="Organization`s Name" style={styles.input} />
            <TextInput
              placeholder="Mobile Number"
              style={styles.input}
              keyboardType="phone-pad"
              value={mobile}
              onChangeText={(text) => setMobile(text)}
            />
            <TextInput
              placeholder="Email"
              style={styles.input}
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />

            <TextInput
              placeholder="Address"
              style={styles.input}
              value={address}
              onChangeText={(text) => setAddress(text)}
            />

            <TextInput
              placeholder="Password"
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={(text) => setPassword(text)}
            />

            <TextInput
              placeholder="Confirm Password"
              style={styles.input}
              secureTextEntry
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
            />

            <TouchableOpacity
              disabled={isRegistering}
              style={styles.button}
              onPress={handleLogin}
            >
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
  },

  input: {
    backgroundColor: "#fff",
    padding: 14,
    fontSize: 15,
    borderColor: "#ddd",
    borderWidth: 1,
  },

  button: {
    backgroundColor: "#6200EE",
    paddingVertical: 15,
    borderRadius: 6,
    marginTop: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  fingerprintButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
    margin: "auto",
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    gap: 10,
  },

  fingerprintText: {
    color: "#6200EE",
    fontWeight: "600",
    fontSize: 16,
  },
});
