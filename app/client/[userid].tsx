import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuthClient } from "../contexts/AuthContextClient";

export default function EditUserDetails() {
  const { user } = useAuthClient();
  const params = useLocalSearchParams();
  const id = params.id;

  // Dummy state for all fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [telephone, setTelephone] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [landmark, setLandmark] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [profilePic, setProfilePic] = useState<string | null>(
    "https://placehold.co/400",
  );

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setMobile(user.mobile || "");
      setTelephone(user.telephone || "");
      setAddress(user.address || "");
      setCountry(user.country || "");
      setProvince(user.province || "");
      setDistrict(user.district || "");
      setLandmark(user.landmark || "");
      setPostalCode(user.postalCode || "");
      setPanNumber(user.panNumber || "");
      setProfilePic(user.profile || "https://placehold.co/400");
    }
  }, [user]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    alert("Profile updated!");
  };

  const renderInput = (
    label: string,
    value: string,
    setter: (text: string) => void,
    placeholder?: string,
    keyboardType?: "default" | "email-address" | "phone-pad",
    multiline?: boolean,
    height?: number,
  ) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && { height }]}
        value={value}
        onChangeText={setter}
        placeholder={placeholder || label}
        keyboardType={keyboardType || "default"}
        multiline={multiline || false}
      />
    </View>
  );

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <Text style={styles.h1}>Edit Profile</Text>

      {/* Profile Picture */}
      <TouchableOpacity style={styles.profilePicContainer} onPress={pickImage}>
        {profilePic ? (
          <Image source={{ uri: profilePic }} style={styles.profilePic} />
        ) : (
          <MaterialIcons name="person" size={50} color="#888" />
        )}
        <Text style={styles.changeText}>Change Photo</Text>
      </TouchableOpacity>

      {/* Input Fields */}
      {renderInput("Name", name, setName)}
      {renderInput(
        "Email",
        email,
        setEmail,
        "Enter your email",
        "email-address",
      )}
      {renderInput("Mobile", mobile, setMobile, "Enter mobile", "phone-pad")}
      {renderInput("Telephone", telephone, setTelephone)}
      {renderInput(
        "Address",
        address,
        setAddress,
        "Enter address",
        "default",
        true,
      )}
      {renderInput("Country", country, setCountry)}
      {renderInput("Province", province, setProvince)}
      {renderInput("District", district, setDistrict)}
      {renderInput("Landmark", landmark, setLandmark)}
      {renderInput(
        "Postal Code",
        postalCode,
        setPostalCode,
        "Enter postal code",
        "default",
      )}
      {renderInput("PAN Number", panNumber, setPanNumber)}

      {/* Save Button */}
      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveBtnText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
  h1: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  profilePicContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  changeText: {
    color: "#6200EE",
    marginTop: 8,
    fontWeight: "500",
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#FAFAFA",
  },
  saveBtn: {
    backgroundColor: "#6200EE",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  saveBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
