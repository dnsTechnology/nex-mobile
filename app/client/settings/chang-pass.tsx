import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ChangePassword() {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>

      <TextInput
        style={styles.input}
        placeholder='Old Password'
        secureTextEntry
        value={oldPass}
        onChangeText={setOldPass}
      />

      <TextInput
        style={styles.input}
        placeholder='New Password'
        secureTextEntry
        value={newPass}
        onChangeText={setNewPass}
      />

      <TextInput
        style={styles.input}
        placeholder='Confirm New Password'
        secureTextEntry
        value={confirmPass}
        onChangeText={setConfirmPass}
      />

      <TouchableOpacity>
        <Text style={styles.forgot}>Forgot password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Update Password</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: {
    backgroundColor: "#F3F3F3",
    padding: 12,
    borderRadius: 2,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  forgot: {
    textAlign: "right",
    color: "#6200EE",
    marginBottom: 25,
    fontSize: 14,
  },
  btn: {
    backgroundColor: "#6200EE",
    paddingVertical: 14,
    borderRadius: 6,
  },
  btnText: { color: "#fff", textAlign: "center", fontSize: 16 },
});
