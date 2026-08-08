import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

  const [user, setUser] = useState(() => {

    const storedUser = localStorage.getItem("user");

    return storedUser
      ? JSON.parse(storedUser)
      : null;
  });

  const login = (data) => {

    localStorage.setItem("token", data.token);

    const userData = {
      userId: data.userId,
      name: data.name,
      email: data.email,
      role: data.role,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    setUser(userData);
  };

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}