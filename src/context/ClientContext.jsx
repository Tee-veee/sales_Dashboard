import {
  doc,
  serverTimestamp,
  setDoc,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { createContext, useState, useContext } from "react";
import { db } from "../firebase";
import CreateModalContext from "./CreateModalContext";
import { toast } from "react-toastify";
const ClientContext = createContext();

export const ClientContextProvider = ({ children }) => {
  const [clientListShort, setClientListShort] = useState();
  const [clientListLong, setClientListLong] = useState();
  const { setShowModal } = useContext(CreateModalContext);

  const createClient = async (clientData) => {
    if (
      clientData.clientName === "" ||
      clientData.clientAddress === "" ||
      clientData.clientSuburb === "" ||
      clientData.clientPostcode === "" ||
      clientData.clientEmail === "" ||
      clientData.clientPhone === "" ||
      clientData.clientType === ""
    )
      return toast.error("Fill out required fields");

    const clientDocRef = doc(db, "clients", clientData.clientEmail);
    const docSnap = await getDoc(clientDocRef);
    if (!docSnap.exists()) {
      try {
        await setDoc(doc(db, "clients", clientData.clientEmail), {
          ...clientData,
          timestamp: serverTimestamp(),
        });
        toast.success("Client added succesfully");
        getClients(true, false);
        setShowModal(false);
      } catch (error) {
        toast.error("Could not add client");
      }
    } else {
      toast.error("Could not access document");
    }
  };

  const getClients = async (shortList, longList) => {
    const clientListRef = collection(db, "clients");
    const docSnap = await getDocs(clientListRef);

    const testArr = [];

    if (shortList === true) {
      docSnap.forEach((doc) => {
        const { clientName, clientEmail, clientPostcode, clientType } =
          doc.data();

        const clientObj = {
          clientName,
          clientEmail,
          clientPostcode,
          clientType,
        };

        testArr.push(clientObj);
      });

      setClientListShort(testArr);
    }

    if (longList === true) {
      docSnap.forEach((doc) => {
        const {
          clientName,
          clientEmail,
          clientAddress,
          clientSuburb,
          clientPostcode,
          clientPhone,
          clientType,
        } = doc.data();

        const clientObj = {
          clientName,
          clientEmail,
          clientAddress,
          clientSuburb,
          clientPostcode,
          clientPhone,
          clientType,
        };

        testArr.push(clientObj);
      });

      setClientListLong(testArr);
    }
  };

  return (
    <ClientContext.Provider
      value={{ createClient, getClients, clientListShort, clientListLong }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export default ClientContext;
