// AuthContext.js
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({
  login: () => {}, // Function for logging in
  logout: () => {}, // Function for logging out
  isLoggedIn: false, // Boolean indicating if the user is authenticated
  token: null,
});

const AuthProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && token.length > 0) {
      setIsLoggedIn(true);
      setToken(token);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        token,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
