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

const ProductContext = createContext();
export const ProductContextProvider = ({ children }) => {
  const [productsList, setProductsList] = useState();
  const { setShowModal } = useContext(CreateModalContext);

  const createProduct = async (productData) => {
    const productDocRef = doc(db, "products", productData.productName);
    const docSnap = await getDoc(productDocRef);
    if (!docSnap.exists()) {
      try {
        await setDoc(doc(db, "products", productData.productName), {
          ...productData,
          timestamp: serverTimestamp(),
        });
        getProducts();
        setShowModal(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log(docSnap);
    }
  };

  const getProducts = async () => {
    const productsListRef = collection(db, "products");
    const docSnap = await getDocs(productsListRef);

    const testArr = [];

    docSnap.forEach((doc) => {
      const {
        productName,
        productCategory,
        productCostPrice,
        productProfitMargain,
      } = doc.data();

      const productObj = {
        productName,
        productCategory,
        productCostPrice,
        productProfitMargain,
      };

      testArr.push(productObj);
    });

    setProductsList(testArr);
  };

  return (
    <ProductContext.Provider
      value={{ createProduct, productsList, getProducts }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
