import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const userid = "390239092";

export default function Profile() {
  const [profileImage, setProfileImage] = useState(
    "https://via.placeholder.com/150"
  );

  const handleEditProfile = () => {
    router.push(`/delivery/${userid}`);
  };

  const handleLogout = () => {
    router.push("/(auth)/delivery/login");
  };

  const menuItems = [
    {
      title: "Active Shipments",
      icon: "truck",
      href: "/client/active-shipments",
    },
    {
      title: "Accounting",
      icon: "money-bill",
      href: "/client/accounting/accounting",
    },

    { title: "Settings", icon: "cog", href: "/client/settings" },
    { title: "Help & Support", icon: "question-circle", href: "support" },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Image source={{ uri: profileImage }} style={styles.avatar} />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>johndoe@example.com</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.editBtn} onPress={handleEditProfile}>
            <MaterialIcons name='edit' size={20} color='#fff' />
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <MaterialIcons name='logout' size={20} color='#fff' />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menu}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              router.push(item?.href);
            }}
            style={styles.menuItem}
          >
            <FontAwesome5 name={item.icon as any} size={20} color='#6200EE' />
            <Text style={styles.menuText}>{item.title}</Text>
            <MaterialIcons name='keyboard-arrow-right' size={24} color='#888' />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f7f7" },
  header: {
    backgroundColor: "#6200EE",
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#fff",
    marginBottom: 15,
  },
  name: { color: "#fff", fontSize: 22, fontWeight: "bold" },
  email: { color: "#fff", fontSize: 14, marginBottom: 15 },
  actions: { flexDirection: "row", gap: 10 },
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#03DAC6",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 25,
  },
  editText: { color: "#fff", fontWeight: "bold", marginLeft: 5 },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#B00020",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 25,
  },
  logoutText: { color: "#fff", fontWeight: "bold", marginLeft: 5 },
  menu: { padding: 20 },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  menuText: { flex: 1, fontSize: 16, marginLeft: 15 },
});
