'use client'
import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useRouter } from "next/navigation";

type AuthValues = {
  user: {
    username: string;
    password: string;
  };
  //eslint-disable-next-line
  login: (user: any) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthValues | null>(null);
export const AuthData = () => useContext(AuthContext);

//eslint-disable-next-line
const AuthWrapper: React.FC<any> = ({ children }) => {
  //eslint-disable-next-line
  const [user, setUser] = useLocalStorage("user", null);

  const router = useRouter();

  const login = async (data: string) => {
    setUser(data);
    return router.push("/");
  };

  const logout = () => {
    setUser(null);
    return router.push("/profile");
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),

    //eslint-disable-next-line
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

//eslint-disable-next-line
export const useAuth = (): AuthValues => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("AuthContext is not null");
  }
  return context;
};

export default AuthWrapper;
