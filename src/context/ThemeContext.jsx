import { createContext, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [showModal, setShowModal] = useState("");
  const [accentColor, setAccentColor] = useState("red");

  return (
    <ThemeContext.Provider
      value={{ showModal, setShowModal, accentColor, setAccentColor }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
