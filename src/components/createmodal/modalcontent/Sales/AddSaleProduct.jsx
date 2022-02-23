import React from "react";

function AddSaleProduct({
  handleAddProduct,
  handleChangeQuantity,
  productsList,
  productNumber,
  formValue,
  formValueNum,
}) {
  return (
    <div className="w-full  flex flex-col  ">
      <div className="w-full flex items-center justify-between">
        <label
          htmlFor={`salesProduct${productNumber}`}
          className="text-sm  w-fit"
        >
          Select Product #{productNumber}
        </label>

        <label
          htmlFor={`quantity${productNumber}`}
          className="text-sm  w-fit mr-4 xl:mr-[142px]"
        >
          Quantity
        </label>
      </div>
      <div className="flex items-center justify-between xl:space-x-8">
        <select
          type="text"
          name="salesProduct1"
          value={formValue}
          className="text-lg border-2 border-stone-500 p-1 outline-none focus:shadow-lg focus:transition-all w-9/12 mr-6"
          onChange={(e) => handleAddProduct(productNumber, e)}
        >
          <option></option>
          {productsList?.map((product) => {
            return (
              <option key={product.productName}>{product.productName}</option>
            );
          })}
        </select>

        <input
          type="number"
          min="0"
          value={formValueNum}
          className="text-lg border-2 border-stone-500 p-1 outline-none focus:shadow-lg focus:transition-all w-3/12"
          onChange={(e) => handleChangeQuantity(productNumber, e)}
        />
      </div>
    </div>
  );
}

export default AddSaleProduct;
