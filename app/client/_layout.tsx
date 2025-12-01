import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function StoreOwnerLayout() {
  return (
    <>
      {/* Status Bar */}
      <View>
        <StatusBar style={"light"} backgroundColor='#6200EE' />
        <View style={styles.header}>
          <Text style={styles.title}>Store</Text>
        </View>
      </View>

      {/* Bottom Tabs */}
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
            title: "Dashboard",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name='dashboard' color={color} size={size} />
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
          name='queue'
          options={{
            title: "Queue",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name='inventory' color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name='create'
          options={{
            title: "Create",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name='add-box' color={color} size={size} />
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
          name='settings'
          options={{
            title: "Settings",

            href: null,
          }}
        />

        {/* change pass */}
        <Tabs.Screen
          name='settings/chang-pass'
          options={{
            title: "Change password",

            href: null,
          }}
        />

        {/* change payment mathod */}
        <Tabs.Screen
          name='settings/payment'
          options={{
            title: "Change Payment",

            href: null,
          }}
        />

        {/* change notifications setting */}
        <Tabs.Screen
          name='settings/notifications'
          options={{
            title: "Change Notifications",

            href: null,
          }}
        />
        {/* active shipments */}
        <Tabs.Screen
          name='active-shipments'
          options={{
            title: "Active Shipments",

            href: null,
          }}
        />
        {/* active shipments */}
        <Tabs.Screen
          name='accounting/accounting'
          options={{
            title: "Accounting",

            href: null,
          }}
        />
        {/* accounting with each indivisual date */}
        <Tabs.Screen
          name='accounting/[id]'
          options={{
            title: "AccountingIndivisual",

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
  text: { color: "#eae3e3ff", fontWeight: "bold" },
  actionBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
});
