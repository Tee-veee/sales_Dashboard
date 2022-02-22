// REACT
import { useState, useContext, useEffect } from "react";
// STATE
import CategoryContext from "../../../context/CategoryContext";
import SupplierContext from "../../../context/SupplierContext";
import SupplierCategory from "../../suppliers/SupplierCategory";
function SupplierModalContent() {
  const [formData, setFormData] = useState({
    supplierName: "",
    supplierAddress: "",
    supplierSuburb: "",
    supplierPostcode: "",
    supplierEmail: "",
    supplierPhone: "",
    supplierCategory: "",
  });

  const { supplierCatList, getSupplierCat } = useContext(CategoryContext);
  const { createSupplier } = useContext(SupplierContext);

  useEffect(() => {
    getSupplierCat();
  }, []);

  return (
    <main className="w-fit flex flex-col space-y-6 h-fit pb-6   rounded-lg">
      <h1 className="text-center text-2xl lg:text-5xl">Create new supplier.</h1>
      <div className="w-full  flex flex-col  ">
        <label htmlFor="name" className="text-sm">
          Supplier Name
        </label>
        <input
          type="text"
          name="name"
          className="text-lg border-2 p-1 border-stone-500 outline-none focus:shadow-lg focus:transition-all"
          onChange={(e) =>
            setFormData({ ...formData, supplierName: e.target.value })
          }
        />
      </div>
      <div className="w-full  flex flex-col  ">
        <label htmlFor="address" className="text-sm">
          Supplier Address
        </label>
        <input
          type="text"
          name="address"
          className="text-lg border-2 border-stone-500 p-1 outline-none focus:shadow-lg focus:transition-all"
          onChange={(e) =>
            setFormData({ ...formData, supplierAddress: e.target.value })
          }
        />
      </div>
      <div className="w-6/12  flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        <div className="flex flex-col">
          <label htmlFor="suburb" className="text-sm">
            Suburb
          </label>
          <input
            type="text"
            name="suburb"
            className="text-lg border-2 border-stone-500 p-1 outline-none focus:shadow-lg focus:transition-all"
            onChange={(e) =>
              setFormData({ ...formData, supplierSuburb: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="postcode" className="text-sm">
            Postcode
          </label>
          <input
            type="text"
            name="postcode"
            className="text-lg border-2 border-stone-500 p-1 outline-none focus:shadow-lg focus:transition-all"
            onChange={(e) =>
              setFormData({ ...formData, supplierPostcode: e.target.value })
            }
          />
        </div>
      </div>
      <div className="w-6/12  flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm">
            Supplier Email
          </label>
          <input
            type="text"
            name="email"
            className="text-lg border-2 border-stone-500 p-1 outline-none focus:shadow-lg focus:transition-all"
            onChange={(e) =>
              setFormData({ ...formData, supplierEmail: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="phone" className="text-sm">
            Supplier Phone
          </label>
          <input
            type="text"
            name="phone"
            className="text-lg border-2 border-stone-500 p-1 outline-none focus:shadow-lg focus:transition-all"
            onChange={(e) =>
              setFormData({ ...formData, supplierPhone: e.target.value })
            }
          />
        </div>
      </div>

      <SupplierCategory />

      <div className="w-full  flex flex-col  ">
        <label htmlFor="category" className="text-sm">
          Supplier Category
        </label>
        {supplierCatList ? (
          <select
            type="text"
            name="category"
            className="text-lg border-2 border-stone-500 p-1 outline-none focus:shadow-lg focus:transition-all"
            onChange={(e) =>
              setFormData({
                ...formData,
                supplierCategory: e.target.value,
              })
            }
          >
            <option></option>
            {supplierCatList?.map((category, i) => {
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
          onClick={() => createSupplier(formData)}
        >
          <h1>Create Supplier</h1>
        </button>
      </div>
    </main>
  );
}

export default SupplierModalContent;
