import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function FileInput() {
  const [file, setFile] = useState<string | null>(null);

  const pickFile = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setFile(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.uploadBtn} onPress={pickFile}>
        <Text style={styles.uploadText}>Choose Pan Card (Only Image)</Text>
      </TouchableOpacity>

      {file && (
        <View style={styles.previewBox}>
          <Image source={{ uri: file }} style={styles.preview} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: "100%",
  },
  uploadBtn: {
    backgroundColor: "#6200EE",
    paddingVertical: 12,
    borderRadius: 2,
    alignItems: "center",
  },
  uploadText: {
    color: "#fff",
    fontWeight: "bold",
  },
  previewBox: {
    marginTop: 15,
  },
  preview: {
    width: 100,
    height: 100,
    borderRadius: 2,
    marginBottom: 8,
  },
  fileName: {
    color: "#555",
    fontSize: 14,
  },
});
