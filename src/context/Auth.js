import { createContext, useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { UnauthorizedPage } from "../pages";
import Menu from '../layout/Menu'
const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  debugger
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const RequireAuth = () => {
  debugger
  const ctx = useAuth();

  if (!ctx?.user?.email) {
    return (
      <UnauthorizedPage />
    );
  }

  return (
    <div className="h-screen w-screen flex flex-row">
      <Menu />
      <div className="h-screen w-full flex flex-row justify-center mt-16">
       <Outlet />
      </div>
    </div>
  );;
};