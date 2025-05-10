import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../middleware/firebase";

type UseAuthListenerOptions = {
  onChange?: (user: User | null) => void;
  onError?: (error: Error) => void;
};

type AuthState = {
  user: User | null;
  loading: boolean;
  error: Error | null;
};

const useAuthListener = (options?: UseAuthListenerOptions): AuthState => {
  const [state, setState] = useState<AuthState>({
    user: auth.currentUser,
    loading: !auth.currentUser,
    error: null,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        setState({ user: firebaseUser, loading: false, error: null });
        options?.onChange?.(firebaseUser);
      },
      (error) => {
        console.error("Auth listener error:", error);
        setState({ user: null, loading: false, error });
        options?.onError?.(error);
      },
    );

    return () => {
      unsubscribe();
    };
  }, [options]);

  return state;
};

export default useAuthListener;
