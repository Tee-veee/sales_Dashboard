import {
  doc,
  serverTimestamp,
  setDoc,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { createContext, useState, useContext } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase";
import CreateModalContext from "./CreateModalContext";

const SupplierContext = createContext();

export const SupplierContextProvider = ({ children }) => {
  const [supplierList, setSupplierList] = useState();
  const { setShowModal } = useContext(CreateModalContext);

  const createSupplier = async (supplierData) => {
    if (
      supplierData.supplierName === "" ||
      supplierData.supplierAddress === "" ||
      supplierData.supplierSuburb === "" ||
      supplierData.supplierPostcode === "" ||
      supplierData.supplierEmail === "" ||
      supplierData.supplierPhone === "" ||
      supplierData.supplierType === ""
    )
      return toast.error("Fill out required fields");

    const supplierDocRef = doc(db, "suppliers", supplierData.supplierName);
    const docSnap = await getDoc(supplierDocRef);
    if (!docSnap.exists()) {
      try {
        await setDoc(doc(db, "suppliers", supplierData.supplierName), {
          ...supplierData,
          timestamp: serverTimestamp(),
        });
        toast.success("Supplier created succesfully");
        getSuppliers();
        setShowModal(false);
      } catch (error) {
        toast.error("Could not create supplier");
      }
    } else {
      toast.error("Could not access document");
    }
  };

  const getSuppliers = async () => {
    const supplierListRef = collection(db, "suppliers");
    const docSnap = await getDocs(supplierListRef);

    const testArr = [];

    docSnap.forEach((doc) => {
      const {
        supplierName,
        supplierEmail,
        supplierPhone,
        supplierPostcode,
        supplierCategory,
      } = doc.data();

      const supplierObj = {
        supplierName,
        supplierEmail,
        supplierPhone,
        supplierPostcode,
        supplierCategory,
      };

      testArr.push(supplierObj);
    });

    setSupplierList(testArr);
  };

  return (
    <SupplierContext.Provider
      value={{ createSupplier, getSuppliers, supplierList }}
    >
      {children}
    </SupplierContext.Provider>
  );
};

export default SupplierContext;
