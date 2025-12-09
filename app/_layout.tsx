import { Ionicons } from "@expo/vector-icons";
import { router, Stack, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native";
import { Provider } from "react-redux";
import { store } from "./store";

export default function RootLayout() {
  const pathname = usePathname();
  const hideHeader =
    pathname.startsWith("/delivery") || pathname.startsWith("/client");
  const iconHide = pathname === "/";
  return (
    <Provider store={store}>
      <StatusBar style={"dark"} />
      <Stack
        screenOptions={{
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#ffffffde",
          },
          headerTintColor: "#fff", // Title & back button color
          headerShadowVisible: false, // Hide shadow under header
          headerLeft: () =>
            !iconHide ? ( // Only show back icon if not home
              <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={() => router.back()}
              >
                <Ionicons name='arrow-back' size={26} color='#130b0bff' />
              </TouchableOpacity>
            ) : null,
          headerShown: !hideHeader,
        }}
      ></Stack>
    </Provider>
  );
}
