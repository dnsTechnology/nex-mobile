import { Platform } from "react-native";
import Constants from "expo-constants";

const getApiUrl = () => {
  const envUrl =
    Constants.expoConfig?.extra?.getApiUrl || process.env.EXPO_PUBLIC_API_URL;
  if (envUrl) {
    return envUrl;
  }

  // Default to localhost with correct port (backend runs on 3000)
  if (__DEV__) {
    if (Platform.OS === "android") {
      // Android emulator uses 10.0.2.2 to access host machine
      // return "http://192.168.1.91:3001/api";  //house
      return "http://192.168.200.178:3000/api"; // office
    } else if (Platform.OS === "ios") {
      // iOS simulator uses localhost
      // return "http://192.168.1.91:3001/api"; // house
      return "http://192.168.200.178:3000/api"; // office
    } else {
      // Web
      // return "http://192.168.1.91:3001/api"; // house
      return "http://192.168.200.178:3000/api"; // office
    }
  }

  // Production URL - update this with your actual production URL
  return "https://your-production-api.com/api";
};

// API Configuration
export const API_CONFIG = {
  BASE_URL: getApiUrl(),
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
};

// Token expiration times (in milliseconds)
export const TOKEN_CONFIG = {
  TOKEN_EXPIRY: 15 * 60 * 1000, // 15 minutes
};

// Storage keys
export const STORAGE_KEYS = {
  TOKEN: "nex_token",
  USER_DATA: "nex_user_data",
};
