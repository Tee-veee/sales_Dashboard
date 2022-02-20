import { createContext, useState } from "react";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [showAlert, setShowAlert] = useState("Home");

  return (
    <AlertContext.Provider value={{ showAlert, setShowAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
