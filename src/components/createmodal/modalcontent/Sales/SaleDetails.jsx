import React from "react";

function SaleDetails({ saleProducts, formData }) {
  return saleProducts.map((product) => {
    return <h1>{product.productName}</h1>;
  });
}

export default SaleDetails;
