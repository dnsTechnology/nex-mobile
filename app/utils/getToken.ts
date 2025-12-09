import { tokenManager } from "./tokenManager";
export const getTokenFromSecureStore = async () => {
  try {
    const token = await tokenManager.getClientAccessToken();
    return token;
  } catch (error) {
    console.error("Error fetching token:", error);
    return null;
  }
};
