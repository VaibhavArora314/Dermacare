// AuthContext.js
import { createContext, useState } from "react";

const AuthContext = createContext({
  login: () => {}, // Function for logging in
  logout: () => {}, // Function for logging out
  isLoggedIn: false, // Boolean indicating if the user is authenticated
  getToken: () => {},
});

const AuthProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") && localStorage.getItem("token").length > 0
  );

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const getToken = () => {
    return localStorage.getItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        getToken,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
