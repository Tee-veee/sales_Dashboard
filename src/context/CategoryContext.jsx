// REACT
import { createContext, useState } from "react";
// FIREBASE
import { db } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
// TOAST
import { toast } from "react-toastify";
// STATE
const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  // SUPPLIER
  const [showSupplierTooltip, setShowSupplierTooltip] = useState(false);
  const [showSupplierInput, setShowSupplierInput] = useState(false);
  const [supplierCategoryData, setSupplierCategoryData] = useState("");
  const [supplierCatList, setSupplierCatList] = useState([]);
  // PRODUCT
  const [showProductTooltip, setShowProductTooltip] = useState(false);
  const [showProductInput, setShowProductInput] = useState(false);
  const [productCategoryData, setProductCategoryData] = useState("");
  const [productCatList, setProductCatList] = useState([]);

  const createProductCategory = async (productCat) => {
    const productCatDocRef = doc(db, "productCategories", productCat);
    const docSnap = await getDoc(productCatDocRef);
    if (!docSnap.exists()) {
      try {
        await setDoc(doc(db, "productCategories", productCat), {
          categoryName: productCat,
          timestamp: serverTimestamp(),
        });
        toast.success("Product Category Added");
        setShowProductInput(false);
        setShowProductTooltip(false);
        getProductCat();
      } catch (error) {
        toast.error("Could not add to database");
      }
    } else {
      toast.error("Could not create document");
    }
  };

  const getProductCat = async () => {
    const productCatRef = collection(db, "productCategories");
    const docSnap = await getDocs(productCatRef);

    const testArr = [];

    docSnap.forEach((doc) => {
      const { categoryName } = doc.data();

      const categoryObj = {
        categoryName,
      };

      testArr.push(categoryObj);
    });

    setProductCatList(testArr);
  };

  const createSupplierCategory = async (supplierCat) => {
    const supplierCatDocRef = doc(db, "supplierCategories", supplierCat);
    const docSnap = await getDoc(supplierCatDocRef);
    if (!docSnap.exists()) {
      try {
        await setDoc(doc(db, "supplierCategories", supplierCat), {
          categoryName: supplierCat,
          timestamp: serverTimestamp(),
        });
        toast.success("Supplier Category Added");
        setShowSupplierInput(false);
        setShowSupplierTooltip(false);
        getSupplierCat();
      } catch (error) {
        toast.error("Could not add to database");
      }
    } else {
      toast.error("Could not create document");
    }
  };

  const getSupplierCat = async () => {
    const supplierCatRef = collection(db, "supplierCategories");
    const docSnap = await getDocs(supplierCatRef);

    const testArr = [];

    docSnap.forEach((doc) => {
      const { categoryName } = doc.data();

      const categoryObj = {
        categoryName,
      };

      testArr.push(categoryObj);
    });

    setSupplierCatList(testArr);
  };

  return (
    <CategoryContext.Provider
      value={{
        showSupplierTooltip,
        setShowSupplierTooltip,
        showSupplierInput,
        setShowSupplierInput,
        supplierCategoryData,
        setSupplierCategoryData,
        createSupplierCategory,
        supplierCatList,
        getSupplierCat,
        showProductTooltip,
        setShowProductTooltip,
        showProductInput,
        setShowProductInput,
        productCategoryData,
        setProductCategoryData,
        createProductCategory,
        productCatList,
        getProductCat,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContext;
