import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState, useContext } from "react";
import SalesContext from "../../../../context/SalesContext";
import { db } from "../../../../firebase";
import Loading from "../../../loading/Loading";
import SaleDetails from "./SaleDetails";
import SaleProductDetails from "./SaleProductDetails";
function ConfirmSaleModal({
  formData,
  saleUID,
  saleProductOne,
  saleProductTwo,
  saleProductThree,
  saleProductFour,
  saleProductFive,
}) {
  const [loading, setLoading] = useState(false);
  const [saleProductOneData, setSaleProductOneData] = useState([]);
  const [saleProductTwoData, setSaleProductTwoData] = useState([]);
  const [saleProductThreeData, setSaleProductThreeData] = useState([]);
  const [saleProductFourData, setSaleProductFourData] = useState([]);
  const [saleProductFiveData, setSaleProductFiveData] = useState([]);
  const [grandTotalArr, setGrandTotalArr] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [test, setTest] = useState(0);

  const { createSale } = useContext(SalesContext);

  useEffect(() => {
    const checkIfEmpty = async (arr, func) => {
      if (arr.productName === "") return;

      const tax = 10;

      const productRef = doc(db, "products", arr.productName);
      const productSnap = await getDoc(productRef);
      const { productCostPrice, productProfitMargain } = productSnap.data();

      arr.costPrice = Math.round(productCostPrice);
      if (Number(productProfitMargain) === 0) {
        arr.profitMargain = 100;
      } else {
        arr.profitMargain = Number(productProfitMargain);
      }

      arr.costTotal = Number(arr.costPrice) * Number(arr.quantity);
      const profitMargainTotal =
        Number(arr.costTotal / 100) * arr.profitMargain;
      const salePriceNoTaxTotal =
        Number(arr.costTotal) + Number(profitMargainTotal);
      const taxAmountTotal = Number(salePriceNoTaxTotal) / tax;
      arr.salePriceTotal = salePriceNoTaxTotal + taxAmountTotal;

      arr.finalProfitTotal =
        profitMargainTotal - (profitMargainTotal / 100) * tax;

      grandTotalArr.push(arr.salePriceTotal);
      func(arr);
    };
    checkIfEmpty(saleProductOne, setSaleProductOneData);
    checkIfEmpty(saleProductTwo, setSaleProductTwoData);
    checkIfEmpty(saleProductThree, setSaleProductThreeData);
    checkIfEmpty(saleProductFour, setSaleProductFourData);
    checkIfEmpty(saleProductFive, setSaleProductFiveData);
    sumGT();
  }, []);

  const sumGT = () => {
    const sumWithInitial = grandTotalArr.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0
    );

    return (
      <h1 value={grandTotal} onChange={(e) => setGrandTotal(e.target.value)}>
        ${Math.round(sumWithInitial)}
      </h1>
    );
  };

  const handleClick = () => {
    const grandTotal = Math.round(
      grandTotalArr.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        0
      )
    );

    createSale(
      grandTotal,
      saleUID,
      formData,
      saleProductOneData,
      saleProductTwoData,
      saleProductThreeData,
      saleProductFourData,
      saleProductFiveData
    );
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="h-full w-full flex flex-col space-y-2 ">
      <div className="w-full  flex flex-col xl:flex-row mb-4 ">
        <div className="xl:w-9/12 w-full">
          <label htmlFor="saleClient" className="text-sm  w-fit">
            Client
          </label>
          <input
            type="text"
            value={formData.salesClient}
            disabled
            className="text-xl pl-2 p-1  outline-none bg-gray-100 w-full"
          />
        </div>
        <div className="w-full xl:w-3/12">
          <div className="w-full">
            <label htmlFor="saleClientEmail" className="text-sm  w-fit px-4">
              Client Email
            </label>
            <input
              type="text"
              value={formData.salesClientEmail}
              disabled
              className="h-full pl-4 p-1 lg:py-[7px] xl:py-[9px] text-sm outline-none bg-gray-200 w-full"
            />
          </div>
        </div>
      </div>
      <div className="w-full  flex items-center justify-between ">
        <div className="w-full xl:w-9/12">
          <label htmlFor="productOne" className="text-sm  w-fit">
            Product
          </label>
        </div>
        <div className="hidden w-3/12  xl:flex items-center justify-between px-4">
          <div className="text-sm">Amount</div>
          <div className="text-sm w-7/12">Price</div>
        </div>
      </div>
      {saleProductOneData.productName && (
        <SaleProductDetails saleProductData={saleProductOneData} />
      )}
      {saleProductTwoData.productName && (
        <SaleProductDetails saleProductData={saleProductTwoData} />
      )}
      {saleProductThreeData.productName && (
        <SaleProductDetails saleProductData={saleProductThreeData} />
      )}
      {saleProductFourData.productName && (
        <SaleProductDetails saleProductData={saleProductFourData} />
      )}
      {saleProductFiveData.productName && (
        <SaleProductDetails saleProductData={saleProductFiveData} />
      )}

      <div className="flex w-full flex-col items-end justify-end pt-4 xl:px-14">
        <div className="bg-green-300 px-4 py-2 rounded-lg">
          <div className="flex space-x-4 flex-row xl:flex-col items-center justify-between ">
            <label htmlFor="productOne" className="text-sm font-bold w-fit">
              Grand Total:
            </label>
            <div>{sumGT()}</div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <button className="w-full bg-green-400 p-2 rounded-lg hover:transition-all hover:scale-[.98] mt-4">
          <h1 onClick={() => handleClick()}>Confirm Sale</h1>
        </button>
      </div>
    </div>
  );
}

export default ConfirmSaleModal;
