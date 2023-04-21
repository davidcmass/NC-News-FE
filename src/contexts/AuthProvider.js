import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState("");
  const [logSuccess, setLogSuccess] = useState(false);

  useEffect(() => {
    const storedLogSuccess = Cookies.get("logSuccess");
    const storedAuth = Cookies.get("auth");
    if (storedLogSuccess !== undefined) {
      setLogSuccess(JSON.parse(storedLogSuccess));
    }
    if (storedAuth !== undefined) {
      setAuth(storedAuth);
    }
  }, []);

  useEffect(() => {
    Cookies.set("logSuccess", JSON.stringify(logSuccess), { expires: 7 });
    Cookies.set("auth", auth, { expires: 7 });
  }, [logSuccess, auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, logSuccess, setLogSuccess }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
