import { auth } from "./firebase";
import { signInAnonymously, type UserCredential } from "firebase/auth";

export const signInAsGuest = async (): Promise<UserCredential | null> => {
  try {
    const result = await signInAnonymously(auth);
    console.log("✅ Anonymous user signed in:", result.user.uid);
    return result;
  } catch (error) {
    console.error("❌ Anonymous sign-in failed:", error);
    return null;
  }
};
