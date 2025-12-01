import { Stack, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "./store";

export default function RootLayout() {
  const pathname = usePathname();
  const hideHeader =
    pathname.startsWith("/delivery") || pathname.startsWith("/client");
  return (
    <Provider store={store}>
      <StatusBar style={"light"} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#4d4de3ff" }, // Header background
          headerTintColor: "#fff", // Title & back button color
          headerShadowVisible: false, // Hide shadow under header
          headerShown: !hideHeader,
        }}
      ></Stack>
    </Provider>
  );
}
