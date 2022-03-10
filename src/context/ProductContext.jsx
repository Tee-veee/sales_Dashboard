import {
  doc,
  serverTimestamp,
  setDoc,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { createContext, useState, useContext } from "react";
import { db } from "../firebase";
import CreateModalContext from "./CreateModalContext";

const ProductContext = createContext();
export const ProductContextProvider = ({ children }) => {
  const [productsList, setProductsList] = useState();
  const { setShowModal } = useContext(CreateModalContext);

  const createProduct = async (productData) => {
    if (
      productData.productName === "" ||
      productData.productCostPrice === "" ||
      productData.productProfitMargain === "" ||
      productData.productCategory === ""
    )
      return toast.error("Fill out required fields");

    const productDocRef = doc(db, "products", productData.productName);
    const docSnap = await getDoc(productDocRef);
    if (!docSnap.exists()) {
      try {
        await setDoc(doc(db, "products", productData.productName), {
          ...productData,
          timestamp: serverTimestamp(),
        });
        toast.success("Product created succesfully");
        getProducts();
        setShowModal(false);
      } catch (error) {
        toast.error("Could not create product");
      }
    } else {
      toast.error("Could not access document");
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
      value={{ createProduct, productsList, getProducts, setProductsList }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
