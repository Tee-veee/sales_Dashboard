import {
  doc,
  serverTimestamp,
  setDoc,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase";
import CreateModalContext from "./CreateModalContext";

const SalesContext = createContext();
export const SalesContextProvider = ({ children }) => {
  const { setShowModal } = useContext(CreateModalContext);
  const [productData, setProductData] = useState([]);
  const [salesList, setSalesList] = useState();
  const [userSalesList, setUserSalesList] = useState();
  const [topSalesList, setTopSalesList] = useState();
  const [grandTotalArray, setGrandTotalArray] = useState();

  const handleDate = (data) => {
    const time = {
      seconds: data.timestamp.seconds,
      nanoseconds: data.timestamp.nanoseconds,
    };

    const fireBaseTime = new Date(
      time.seconds * 1000 + time.nanoseconds / 1000000
    );
    const date = fireBaseTime.toDateString().slice(4);

    return date;
  };

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
        toast.success("Sale created successfuly");
        getSales();
        setShowModal(false);
      } catch (error) {
        toast.error("Could not create sale");
      }
    } else {
      toast.error("Could not access document");
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
        date: handleDate(doc.data()),
        id: doc.id,
      };
      testArr.push(salesObj);
    });

    // SORT MOST RECENT FIRST
    testArr.sort((a, b) => {
      const date1 = new Date(a.date);
      const date2 = new Date(b.date);

      return date2 - date1;
    });

    setSalesList(testArr);
  };

  const getUserSales = async (user) => {
    const salesListRef = collection(db, "sales");
    const docSnap = await getDocs(salesListRef);

    const testArr = [];

    docSnap.forEach((doc) => {
      if (user.email === doc.data().salesPersonEmail) {
        const { salesClient, salesClientEmail, salesClientSuburb, grandTotal } =
          doc.data();

        const userSalesObj = {
          salesClient,
          salesClientEmail,
          salesClientSuburb,
          grandTotal,
          date: handleDate(doc.data()),
          id: doc.id,
        };

        testArr.push(userSalesObj);
      }
    });
    testArr.sort((a, b) => {
      const date1 = new Date(a.date);
      const date2 = new Date(b.date);

      return date2 - date1;
    });

    setUserSalesList(testArr);
  };

  const getTopSales = async () => {
    const salesListRef = collection(db, "sales");
    const docSnap = await getDocs(salesListRef);

    const topSalesArr = [];
    const grandTotalArr = [];

    docSnap.forEach((doc) => {
      const { salesPerson, salesClient, grandTotal } = doc.data();

      const salesObj = {
        salesPerson,
        salesClient,
        grandTotal,
        date: handleDate(doc.data()),
        id: doc.id,
      };

      const grandTotalObj = {
        grandTotal,
        salesPerson,
      };

      topSalesArr.push(salesObj);
      grandTotalArr.push(grandTotalObj);
    });

    topSalesArr
      .sort((a, b) => {
        return b.grandTotal - a.grandTotal;
      })
      .slice(0, 9);

    grandTotalArr
      .sort((a, b) => {
        return b.grandTotal - a.grandTotal;
      })
      .slice(0, 9);

    setGrandTotalArray(grandTotalArr);
    setTopSalesList(topSalesArr);
  };

  return (
    <SalesContext.Provider
      value={{
        createSale,
        getSales,
        getUserSales,
        salesList,
        userSalesList,
        getTopSales,
        topSalesList,
        grandTotalArray,
      }}
    >
      {children}
    </SalesContext.Provider>
  );
};

export default SalesContext;
