import { createContext, useState } from "react";

const CreateModalContext = createContext();

export const CreateModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState("");

  return (
    <CreateModalContext.Provider value={{ showModal, setShowModal }}>
      {children}
    </CreateModalContext.Provider>
  );
};

export default CreateModalContext;
