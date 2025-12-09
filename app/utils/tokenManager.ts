import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { STORAGE_KEYS } from "../config/api.config";

/**
 * Token Manager - Handles secure storage and retrieval of authentication tokens
 */
class TokenManager {
  /**
   * Store authentication tokens securely
   */
  async setTokens(token: string): Promise<void> {
    try {
      if (Platform.OS === "web") {
        await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, token);
      } else {
        await SecureStore.setItemAsync(STORAGE_KEYS.TOKEN, token);
      }
    } catch (error) {
      console.error("Error storing tokens:", error);
      throw error;
    }
  }

  /**
   * Get access token
   */
  async getAccessToken(): Promise<string | null> {
    try {
      if (Platform.OS === "web") {
        return await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
      }
      return await SecureStore.getItemAsync(STORAGE_KEYS.TOKEN);
    } catch (error) {
      console.error("Error retrieving access token:", error);
      return null;
    }
  }

  /**
   * Get refresh token
   */
  async getRefreshToken(): Promise<string | null> {
    try {
      if (Platform.OS === "web") {
        return await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
      }
      return await SecureStore.getItemAsync(STORAGE_KEYS.TOKEN);
    } catch (error) {
      console.error("Error retrieving refresh token:", error);
      return null;
    }
  }

  /**
   * Store user data
   */
  async setUser(user: any): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
    } catch (error) {
      console.error("Error storing user data:", error);
      throw error;
    }
  }

  /**
   * Get user data
   */
  async getUser(): Promise<any | null> {
    try {
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error retrieving user data:", error);
      return null;
    }
  }

  /**
   * Clear all authentication data
   */
  async clearTokens(): Promise<void> {
    try {
      if (Platform.OS === "web") {
        await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN);
      } else {
        await SecureStore.deleteItemAsync(STORAGE_KEYS.TOKEN);
      }
      await AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA);
    } catch (error) {
      console.error("Error clearing tokens:", error);
      throw error;
    }
  }

  /**
   * Store selected shop ID
   */

  /**
   * Get selected shop ID
   */
}

export const tokenManager = new TokenManager();
