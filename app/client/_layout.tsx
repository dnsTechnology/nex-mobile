import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import HeaderBack from "../components/HeaderBack";
import { AuthProvider } from "../contexts/AuthContextClient";

export default function StoreOwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <HeaderBack />
      {children}

      {/* Bottom Tabs */}
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#6200EE",
          tabBarInactiveTintColor: "#888",
          headerShown: false,
          tabBarStyle: { height: 80, paddingBottom: 5, paddingTop: 5 },
          headerLeft: () => (
            <MaterialIcons name='menu' size={24} color='#ffffffff' />
          ),
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
        <Tabs.Screen
          name='accounting/expand/[dateid]'
          options={{
            title: "Accounting Expand",
            href: null,
          }}
        />

        <Tabs.Screen
          name='payments'
          options={{
            title: "Payments",

            href: null,
          }}
        />
        {/* paymentdetails page */}
        <Tabs.Screen
          name='paymentdetails/[id]'
          options={{
            title: "PaymentDetails",

            href: null,
          }}
        />

        {/* edit page */}
        <Tabs.Screen
          name='[userid]'
          options={{
            title: "EditProfile",

            href: null,
          }}
        />

        {/* shipment details page */}
        <Tabs.Screen
          name='shipmentdetails/[id]'
          options={{
            title: "EditProfile",

            href: null,
          }}
        />

        {/* shipment comment */}
        <Tabs.Screen
          name='comment/[id]'
          options={{
            title: "Comment",

            href: null,
          }}
        />

        {/* login */}
        <Tabs.Screen
          name='login'
          options={{
            title: "login",

            href: null,
          }}
        />
      </Tabs>
    </AuthProvider>
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
  backText: { color: "#eae3e3ff", fontWeight: "bold" },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
