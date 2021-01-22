import React, {
  useContext,
  createContext,
  useState,
  useLayoutEffect,
} from "react";
import netlifyIdentity from "netlify-identity-widget";

const authContext = createContext();

export default function ProvideAuth({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useLayoutEffect(() => {
    const user = netlifyIdentity.currentUser();
    setUser(user !== null ? user.email : null);
    setIsLoading(false);
  }, []);
  const signin = (cb) => {
    netlifyIdentity.open();
    netlifyIdentity.on("login", (user) => {
      setUser(user);
      setIsLoading(true);
      cb();
      netlifyIdentity.close();
    });
  };
  const signout = (cb) => {
    netlifyIdentity.logout();
    netlifyIdentity.on("logout", () => {
      setUser(null);
      cb();
    });
  };
  return (
    <authContext.Provider value={{ signin, signout, user, isLoading }}>
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => useContext(authContext);
