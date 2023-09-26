// AuthContext.js
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({
  login: () => {}, // Function for logging in
  logout: () => {}, // Function for logging out
  isLoggedIn: false, // Boolean indicating if the user is authenticated
  token: null,
  username: null,
});

const AuthProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("username");

    if (token && token.length > 0 && name && name.length > 0) {
      setIsLoggedIn(true);
      setToken(token);
      setUsername(name);
    }
  }, []);

  const login = (token, username) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    setIsLoggedIn(true);
    setToken(token);
    setUsername(username);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setToken(null);
    setUsername(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        token,
        username,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
