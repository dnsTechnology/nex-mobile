import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function DeliveryLayout() {
  return (
    <>
      <View>
        <StatusBar style={"light"} backgroundColor='#6200EE' />
        <View style={styles.header}>
          <Text style={styles.title}>Agent</Text>
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: "#4CAF50" }]}
            //  onPress={() => setStatus("Delivered")}
          >
            <Text style={styles.text}>Switch to Rider</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#6200EE",
          tabBarInactiveTintColor: "#888",
          headerShown: false,
          tabBarStyle: { height: 80, paddingBottom: 5, paddingTop: 5 },
        }}
      >
        <Tabs.Screen
          name='home'
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name='home' color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name='queue'
          options={{
            title: "Queue",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name='inventory' color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name='scan'
          options={{
            title: "Scan",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name='qr-code-scanner' color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name='shipments'
          options={{
            title: "Shipments",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name='local-shipping' color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name='profile'
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name='person' color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name='accounting/accounting'
          options={{
            title: "Accounting",

            href: null,
          }}
        />

        <Tabs.Screen
          name='components/AgentHome'
          options={{
            title: "AgentHome",

            href: null,
          }}
        />
        <Tabs.Screen
          name='components/RiderHome'
          options={{
            title: "RiderHome",

            href: null,
          }}
        />
        <Tabs.Screen
          name='[userid]'
          options={{
            title: "Edit",

            href: null,
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 50, // space for status bar
    paddingBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: "#5d49daff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { color: "#eae3e3ff", fontSize: 20, fontWeight: "bold" },
  text: {
    color: "#eae3e3ff",
  },
  actionBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
});
