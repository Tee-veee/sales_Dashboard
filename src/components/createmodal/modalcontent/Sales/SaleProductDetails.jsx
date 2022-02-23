import React from "react";

function SaleProductDetails({ saleProductData }) {
  return (
    <div className="flex flex-col">
      <div className="w-full flex flex-col xl:flex-row xl:items-center xl:justify-between bg-gray-200">
        <div className="w-full xl:w-9/12">
          <input
            type="text"
            value={saleProductData.productName}
            disabled
            className="text-xl  pl-2 p-1  outline-none bg-gray-100 w-full"
          />
        </div>
        <div className="w-full xl:w-3/12 flex items-center justify-between px-2 py-1 xl:px-4">
          <div>
            <h1 className="flex items-center text-sm">
              <span className="block xl:hidden text-sm mr-2">Quantity: </span>
              {saleProductData.quantity}
            </h1>
          </div>
          <div className="flex items-center text-sm xl:w-7/12">
            <span className="block xl:hidden  mr-2">Total:</span>$
            {saleProductData.salePriceTotal}
          </div>
        </div>
      </div>
    </div>
  );
}
export default SaleProductDetails;
