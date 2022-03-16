import { useState, useContext, useEffect } from "react";
import CategoryContext from "../../../context/CategoryContext";
import ProductContext from "../../../context/ProductContext";
import ProductCategory from "../../products/ProductCategory";

function ProductModalContent() {
  const [formData, setFormData] = useState({
    productName: "",
    productCategory: "",
    productCostPrice: "",
    productProfitMargain: "",
  });

  const { createProduct } = useContext(ProductContext);
  const { productCatList, getProductCat } = useContext(CategoryContext);

  useEffect(() => {
    getProductCat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="w-fit flex flex-col space-y-6 h-fit pb-6   rounded-lg">
      <h1 className="text-center text-2xl lg:text-5xl">Create new product.</h1>
      <div className="w-full  flex flex-col  ">
        <label htmlFor="name" className="text-sm">
          Product Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.productName}
          className={`text-lg border-2 p-1 border-stone-500 outline-none focus:shadow-lg focus:transition-all ${
            formData.productName === "" ? "border-2 border-red-500" : ""
          }`}
          onChange={(e) =>
            setFormData({ ...formData, productName: e.target.value })
          }
        />
      </div>

      <div className="w-6/12  flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        <div className="flex flex-col">
          <label htmlFor="purchasePrice" className="text-sm">
            Purchase Price
          </label>
          <input
            type="text"
            name="purchasePrice"
            value={formData.productCostPrice}
            className={`text-lg border-2 border-stone-500 p-1 outline-none focus:shadow-lg focus:transition-all ${
              formData.productCostPrice === "" ? "border-2 border-red-500" : ""
            }`}
            onChange={(e) =>
              setFormData({ ...formData, productCostPrice: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="profitMargain" className="text-sm">
            Profit Margain
          </label>
          <input
            type="text"
            name="profitMargain"
            className={`text-lg border-2 border-stone-500 p-1 outline-none focus:shadow-lg focus:transition-all ${
              formData.productProfitMargain === ""
                ? "border-2 border-red-500"
                : ""
            }`}
            onChange={(e) =>
              setFormData({ ...formData, productProfitMargain: e.target.value })
            }
          />
        </div>
      </div>

      <ProductCategory />

      <div className="w-full  flex flex-col  ">
        <label htmlFor="name" className="text-sm">
          Product Category
        </label>
        {productCatList ? (
          <select
            type="text"
            name="category"
            value={formData.productCategory}
            className={`text-lg border-2 border-stone-500 p-1 outline-none focus:shadow-lg focus:transition-all ${
              formData.productCategory === "" ? "border-2 border-red-500" : ""
            }`}
            onChange={(e) =>
              setFormData({ ...formData, productCategory: e.target.value })
            }
          >
            <option></option>
            {productCatList?.map((category, i) => {
              return <option key={i}>{category.categoryName}</option>;
            })}
          </select>
        ) : (
          ""
        )}
      </div>

      <div>
        <button
          className="px-4 py-2 border-2 rounded-lg bg-green-400 text-stone-800 flex items-center space-x-2 hover:scale-95 hover:transition-all w-full justify-center"
          onClick={() => createProduct(formData)}
        >
          <h1>Create Product</h1>
        </button>
      </div>
    </main>
  );
}

export default ProductModalContent;
