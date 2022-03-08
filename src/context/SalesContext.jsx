import {
  doc,
  serverTimestamp,
  setDoc,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { createContext, useState, useContext, useEffect } from "react";
import { db } from "../firebase";
import CreateModalContext from "./CreateModalContext";

const SalesContext = createContext();
export const SalesContextProvider = ({ children }) => {
  const { setShowModal } = useContext(CreateModalContext);
  const [productData, setProductData] = useState([]);
  const [salesList, setSalesList] = useState();
  const [userSalesList, setUserSalesList] = useState();

  const createSale = async (
    grandTotal,
    saleUID,
    saleData,
    productOne,
    productTwo,
    productThree,
    productFour,
    productFive
  ) => {
    const allProductData = [];
    if (productOne.productName) {
      allProductData.push(productOne);
    }
    if (productTwo.productName) {
      allProductData.push(productTwo);
    }
    if (productThree.productName) {
      allProductData.push(productThree);
    }
    if (productFour.productName) {
      allProductData.push(productFour);
    }
    if (productFive.productName) {
      allProductData.push(productFive);
    }

    const salesDocRef = doc(db, "sales", saleUID);
    const docSnap = await getDoc(salesDocRef);
    if (!docSnap.exists()) {
      try {
        await setDoc(doc(db, "sales", saleUID), {
          ...saleData,
          grandTotal,
          productData: allProductData,
          timestamp: serverTimestamp(),
        });
        getSales();
        setShowModal(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log(docSnap);
    }
  };

  const getSales = async () => {
    const salesListRef = collection(db, "sales");
    const docSnap = await getDocs(salesListRef);

    const testArr = [];

    docSnap.forEach((doc) => {
      const { salesPerson, salesClient, salesClientEmail, grandTotal } =
        doc.data();

      const salesObj = {
        salesPerson,
        salesClient,
        salesClientEmail,
        grandTotal,
      };

      testArr.push(salesObj);
    });

    setSalesList(testArr);
  };

  const getUserSales = async (user) => {
    const salesListRef = collection(db, "sales");
    const docSnap = await getDocs(salesListRef);

    const testArr = [];

    docSnap.forEach((doc) => {
      if (user.email === doc.data().salesPersonEmail)
        return testArr.push(doc.data());
    });
  };

  return (
    <SalesContext.Provider
      value={{ createSale, getSales, getUserSales, salesList }}
    >
      {children}
    </SalesContext.Provider>
  );
};

export default SalesContext;
