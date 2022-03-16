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

const SalesContext = createContext();
export const SalesContextProvider = ({ children }) => {
  const { setShowModal } = useContext(CreateModalContext);
  // LISTS
  const [salesList, setSalesList] = useState();
  const [userSalesList, setUserSalesList] = useState();
  const [topSalesList, setTopSalesList] = useState();
  const [grandTotalArray, setGrandTotalArray] = useState();
  // CHARTS
  const [analyticPieChartSP, setAnalyticPieChartSP] = useState();
  const [analyticPieChartCN, setAnalyticPieChartCN] = useState();
  const [analyticBarChartPN, setAnalyticBarChartPN] = useState();

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

      const docID = doc.id.slice(0, 8);

      const salesObj = {
        salesPerson,
        salesClient,
        salesClientEmail,
        grandTotal,
        date: handleDate(doc.data()),
        id: docID,
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
        const { salesClient, salesClientEmail, grandTotal } = doc.data();

        const docID = doc.id.slice(0, 8);

        const userSalesObj = {
          salesClient,
          salesClientEmail,

          grandTotal,
          date: handleDate(doc.data()),
          id: docID,
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
      const docID = doc.id.slice(0, 8);
      const salesObj = {
        salesPerson,
        salesClient,
        grandTotal,
        date: handleDate(doc.data()),
        id: docID,
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

  const getUserSalesPercentages = async () => {
    const usersRef = collection(db, "users");
    const userSnap = await getDocs(usersRef);
    const dataArr = [];

    userSnap.forEach((doc) => {
      const userSalesObj = {
        name: doc.data().name,
        email: doc.data().email,
        sales: 0,
      };
      dataArr.push(userSalesObj);
    });

    const salesListRef = collection(db, "sales");
    const docSnap = await getDocs(salesListRef);
    dataArr.forEach((value) => {
      docSnap.forEach((doc) => {
        if (value.email === doc.data().salesPersonEmail) {
          value.sales += 1;
        }
      });
    });

    let totalSales = 0;
    docSnap.forEach((doc) => {
      totalSales += 1;
    });

    let totalSalesPercent = 100 / totalSales;

    dataArr.forEach((value) => {
      value.sales = Math.round(value.sales * totalSalesPercent);
    });

    setAnalyticPieChartSP(dataArr);
  };

  const getClientSalesPercentages = async () => {
    const clientsRef = collection(db, "clients");
    const clientSnap = await getDocs(clientsRef);
    const dataArr = [];

    clientSnap.forEach((doc) => {
      const clientSalesObj = {
        name: doc.data().clientName,
        email: doc.data().clientEmail,
        sales: 0,
      };
      dataArr.push(clientSalesObj);
    });

    const salesListRef = collection(db, "sales");
    const docSnap = await getDocs(salesListRef);

    dataArr.forEach((value) => {
      docSnap.forEach((doc) => {
        if (value.name === doc.data().salesClient) {
          value.sales += 1;
        }
      });
    });

    let totalSales = 0;
    docSnap.forEach((doc) => {
      totalSales += 1;
    });

    let totalSalesPercent = 100 / totalSales;

    dataArr.forEach((value) => {
      value.sales = Math.round(value.sales * totalSalesPercent);
    });

    setAnalyticPieChartCN(dataArr);
  };

  const getProductSalesData = async () => {
    const productsRef = collection(db, "products");
    const productsSnap = await getDocs(productsRef);

    const dataArr = [];

    productsSnap.forEach((doc) => {
      const productSaleObj = {
        name: doc.data().productName,
        sales: 0,
      };
      dataArr.push(productSaleObj);
    });

    const salesRef = collection(db, "sales");
    const salesSnap = await getDocs(salesRef);

    dataArr.forEach((graphData) => {
      return salesSnap.forEach((doc) => {
        doc.data().productData.map((data) => {
          if (graphData.name === data.productName) {
            return (graphData.sales += Number(data.quantity));
          }
        });
      });
    });

    setAnalyticBarChartPN(dataArr);
  };

  return (
    <SalesContext.Provider
      value={{
        createSale,
        getSales,
        getUserSales,
        salesList,
        setSalesList,
        userSalesList,
        setUserSalesList,
        getTopSales,
        topSalesList,
        grandTotalArray,
        getUserSalesPercentages,
        analyticPieChartSP,
        getClientSalesPercentages,
        analyticPieChartCN,
        getProductSalesData,
        analyticBarChartPN,
      }}
    >
      {children}
    </SalesContext.Provider>
  );
};

export default SalesContext;
