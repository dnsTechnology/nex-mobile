import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Payment() {
  const [qrImage, setQrImage] = useState<string | null>(null);

  const pickQR = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setQrImage(result.assets[0].uri);
    }
  };

  const removeQR = () => setQrImage(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Settings</Text>

      {/* QR Preview */}
      {qrImage ? (
        <View style={styles.previewBox}>
          <Image source={{ uri: qrImage }} style={styles.image} />
          <TouchableOpacity style={styles.deleteBtn} onPress={removeQR}>
            <MaterialIcons name='delete' size={24} color='#fff' />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.noQR}>
          <Text style={{ color: "#777" }}>No QR uploaded</Text>
        </View>
      )}

      {/* Upload Button */}
      <TouchableOpacity style={styles.btn} onPress={pickQR}>
        <Text style={styles.btnText}>
          {qrImage ? "Change QR" : "Upload QR"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },

  noQR: {
    height: 200,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    marginBottom: 20,
  },

  previewBox: {
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
    overflow: "hidden",
  },

  image: { width: "100%", height: "100%" },

  deleteBtn: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 50,
  },

  btn: {
    backgroundColor: "#6200EE",
    paddingVertical: 14,
    borderRadius: 10,
  },

  btnText: { color: "#fff", textAlign: "center", fontSize: 16 },
});
