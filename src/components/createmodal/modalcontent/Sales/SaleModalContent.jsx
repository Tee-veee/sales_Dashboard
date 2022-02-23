import { useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
// STATE
import UserContext from "../../../../context/UserContext";
import ClientContext from "../../../../context/ClientContext";
import ProductContext from "../../../../context/ProductContext";
// ASSETS
import { MdAdd } from "react-icons/md";
import { BsTruck } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import AddSaleProduct from "./AddSaleProduct";
import ConfirmSaleModal from "./ConfirmSaleModal";
function SaleModalContent() {
  const [showTooltip, setShowTooltip] = useState(false); // 1
  const [showDeliveryTooltip, setShowDeliveryTooltip] = useState(false); // 2
  const [useStoredAddress, setUseStoredAddress] = useState(false); // 3
  const [showCreateExtra, setShowCreateExtra] = useState(false); // 4
  const [saleClientData, setSaleClientData] = useState([]); // 5
  const [saleUID, setSailUID] = useState(""); // 6
  const [showConfirm, setShowConfirm] = useState(false);

  // 9
  const [formData, setFormData] = useState({
    salesPerson: "",
    salesPersonEmail: "",
    salesClient: "",
    salesClientEmail: "",
    salesClientAddress: "",
    salesClientSuburb: "",
    salesClientPostcode: "",
  });

  // 10
  const [saleProductOne, setSaleProductOne] = useState({
    productName: "",
    quantity: "",
  });
  const [saleProductTwo, setSaleProductTwo] = useState({
    productName: "",
    quantity: "",
  });
  const [saleProductThree, setSaleProductThree] = useState({
    productName: "",
    quantity: "",
  });
  const [saleProductFour, setSaleProductFour] = useState({
    productName: "",
    quantity: "",
  });
  const [saleProductFive, setSaleProductFive] = useState({
    productName: "",
    quantity: "",
  });

  const { user } = useContext(UserContext);
  const { getClients, clientListLong } = useContext(ClientContext);
  const { getProducts, productsList } = useContext(ProductContext);

  useEffect(() => {
    setSailUID(uuidv4());
    setFormData({
      ...formData,
      salesPerson: user.name,
      salesPersonEmail: user.email,
    });
    getClients(false, true);
    getProducts();
  }, []);

  const handleAddProduct = (productNum, e) => {
    const productToAdd = e.target.value;

    switch (productNum) {
      case 1:
        setSaleProductOne({
          productName: productToAdd,
          quantity: 1,
        });

        break;
      case 2:
        setSaleProductTwo({
          productName: productToAdd,
          quantity: 1,
        });

        break;
      case 3:
        setSaleProductThree({
          productName: productToAdd,
          quantity: 1,
        });

        break;
      case 4:
        setSaleProductFour({
          productName: productToAdd,
          quantity: 1,
        });

        break;
      case 5:
        setSaleProductFive({
          productName: productToAdd,
          quantity: 1,
        });

        break;
      default:
        return;
    }
  };

  const handleChangeQuantity = (productNum, e) => {
    const productQuantity = e.target.value;
    switch (productNum) {
      case 1:
        setSaleProductOne({
          ...saleProductOne,
          quantity: productQuantity,
        });

        break;
      case 2:
        setSaleProductTwo({
          ...saleProductTwo,
          quantity: productQuantity,
        });

        break;
      case 3:
        setSaleProductThree({
          ...saleProductThree,
          quantity: productQuantity,
        });
        break;
      case 4:
        setSaleProductFour({
          ...saleProductFour,
          quantity: productQuantity,
        });

        break;
      case 5:
        setSaleProductFive({
          ...saleProductFive,
          quantity: productQuantity,
        });

        break;
      default:
        return;
    }
  };

  const handleClientChange = async (e) => {
    setFormData({
      salesPerson: "",
      salesPersonEmail: "",
      salesClient: "",
      salesClientEmail: "",
      salesClientAddress: "",
      salesClientSuburb: "",
      salesClientPostcode: "",
      salesProductOne: "",
      salesProductTwo: "",
      salesProductThree: "",
      salesProductFour: "",
      salesProductFive: "",
    });
    const saleClient = e.target.value;

    const finalSaleClient = clientListLong.filter(
      (client) => client.clientName === saleClient
    );

    setFormData({
      ...formData,
      salesClient: saleClient,
      salesClientEmail: finalSaleClient[0].clientEmail,
    });

    setSaleClientData(finalSaleClient[0]);
  };

  const handleClick = () => {
    setShowCreateExtra(!showCreateExtra);
    setShowTooltip(false);
  };

  const handleDeliveryClick = (setData, clearData) => {
    setUseStoredAddress(!useStoredAddress);
    if (clearData) {
      return setFormData({
        ...formData,
        salesClientAddress: "",
        salesClientSuburb: "",
        salesClientPostcode: "",
      });
    }

    if (setData) {
      setFormData({
        ...formData,
        salesClientAddress: saleClientData.clientAddress,
        salesClientSuburb: saleClientData.clientSuburb,
        salesClientPostcode: saleClientData.clientPostcode,
      });
    }
  };
  return (
    <main className="xl:w-[840px] w-[300px] lg:w-[560px] flex flex-col space-y-6 h-fit    rounded-lg">
      <h1 className="text-2xl lg:text-5xl">
        {showConfirm ? "Confirm Sale" : "New Sale"}{" "}
        <span className="text-lg md:text-2xl"># {saleUID}</span>
      </h1>
      {!showConfirm && (
        <>
          {!showCreateExtra && (
            <>
              {/* NOTES -- CLIENT */}
              <div className="w-full  flex flex-col space-y-4 xl:space-y-0 xl:space-x-4 xl:flex-row ">
                <div className="flex flex-col w-full xl:w-6/12">
                  <label htmlFor="clientName" className="text-sm">
                    Select Client
                  </label>
                  <select
                    type="text"
                    name="clientName"
                    value={formData.salesClient}
                    className="text-lg border-2 p-1 border-stone-500 outline-none focus:shadow-lg focus:transition-all disabled:bg-gray-200"
                    onChange={(e) => handleClientChange(e)}
                  >
                    <option></option>
                    {clientListLong?.map((client) => {
                      return (
                        <option key={client.clientName}>
                          {client.clientName}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="flex flex-col w-full xl:w-6/12">
                  <label htmlFor="clientEmail" className="text-sm">
                    Client Email
                  </label>
                  <input
                    type="text"
                    name="clientEmail"
                    value={formData.salesClientEmail}
                    disabled
                    className="text-lg border-2 p-1 border-stone-500 outline-none focus:shadow-lg focus:transition-all disabled:bg-gray-200"
                  />
                </div>
              </div>
              {/* NOTES -- DELIVERY */}
              {!useStoredAddress && (
                <>
                  <div className="flex flex-col  w-full md:flex-row space-y-6 md:space-y-0 md:space-x-6">
                    <div className="w-full  flex flex-col  ">
                      <label htmlFor="deliveryAddress" className="text-sm">
                        Address
                      </label>
                      <input
                        type="text"
                        name="deliveryAddress"
                        className="text-lg border-2 p-1 border-stone-500 outline-none focus:shadow-lg focus:transition-all xl:w-9/12"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            salesClientAddress: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="flex items-end m-2  ">
                      <div
                        className="bg-green-400 rounded-lg p-1 hover:scale-95 hover:transition-all cursor-pointer text-3xl"
                        onMouseEnter={() => setShowDeliveryTooltip(true)}
                        onMouseLeave={() => setShowDeliveryTooltip(false)}
                        onClick={() => handleDeliveryClick(true, false)}
                      >
                        <BsTruck />
                      </div>
                      {showDeliveryTooltip && (
                        <div className="relative">
                          <h1 className="bg-stone-600 text-white text-center p-2 round-lg absolute z-10 w-[180px] -bottom-0 right-12">
                            Use Stored Address
                          </h1>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col space-y-4 xl:space-y-0 xl:flex-row xl:space-x-4">
                    <div className="flex flex-col xl:w-6/12">
                      <label htmlFor="deliverySuburb" className="text-sm">
                        deliverySuburb
                      </label>
                      <input
                        type="text"
                        name="suburb"
                        className="text-lg border-2 border-stone-500 p-1 outline-none focus:shadow-lg focus:transition-all"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            salesClientSuburb: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="flex flex-col xl:w-6/12">
                      <label htmlFor="deliveryPostcode" className="text-sm">
                        Postcode
                      </label>
                      <input
                        type="text"
                        name="deliveryPostcode"
                        className="text-lg border-2 border-stone-500 p-1 outline-none focus:shadow-lg focus:transition-all"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            salesClientPostcode: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </>
              )}
              {useStoredAddress && (
                <>
                  <div className="flex flex-col  w-full md:flex-row space-y-6 md:space-y-0 md:space-x-6">
                    <div className="w-full  flex flex-col  ">
                      <label htmlFor="deliveryAddress" className="text-sm">
                        Address
                      </label>
                      <input
                        type="text"
                        name="deliveryAddress"
                        disabled
                        value={formData.salesClientAddress}
                        className="text-lg border-2 p-1 border-stone-500 outline-none focus:shadow-lg focus:transition-all xl:w-9/12 disabled:bg-gray-200"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            salesClientAddress: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="flex items-end m-2  ">
                      <div
                        className="bg-red-400 rounded-lg p-1 hover:scale-95 hover:transition-all cursor-pointer text-3xl"
                        onMouseEnter={() => setShowDeliveryTooltip(true)}
                        onMouseLeave={() => setShowDeliveryTooltip(false)}
                        onClick={() => handleDeliveryClick(false, true)}
                      >
                        <BsTruck />
                      </div>
                      {showDeliveryTooltip && (
                        <div className="relative">
                          <h1 className="bg-stone-600 text-white text-center p-2 round-lg absolute z-10 w-[180px] -bottom-0 right-12">
                            Use Custom Address
                          </h1>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col space-y-4 xl:space-y-0 xl:flex-row xl:space-x-4">
                    <div className="flex flex-col xl:w-6/12">
                      <label htmlFor="deliverySuburb" className="text-sm">
                        deliverySuburb
                      </label>
                      <input
                        type="text"
                        name="suburb"
                        disabled
                        value={formData.salesClientSuburb}
                        className="text-lg border-2 border-stone-500 p-1 outline-none focus:shadow-lg focus:transition-all disabled:bg-gray-200"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            salesClientSuburb: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="flex flex-col xl:w-6/12">
                      <label htmlFor="deliveryPostcode" className="text-sm">
                        Postcode
                      </label>
                      <input
                        type="text"
                        name="deliveryPostcode"
                        disabled
                        value={formData.salesClientPostcode}
                        className="text-lg border-2 border-stone-500 p-1 outline-none focus:shadow-lg focus:transition-all disabled:bg-gray-200"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            salesClientPostcode: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          {/* NOTES -- EXTRA PRODUCT */}
          <div className="w-full items-center flex justify-end">
            {!showCreateExtra && (
              <>
                <div
                  className="bg-green-400 rounded-lg p-1 hover:scale-95 hover:transition-all cursor-pointer"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  onClick={() => handleClick()}
                >
                  <MdAdd className="text-3xl" />
                </div>
                {showTooltip && (
                  <div className="relative w-fit">
                    <h1 className="bg-stone-600 text-white text-center p-2 round-lg absolute z-10 w-[180px] -bottom-5 right-12 ">
                      Add more Products
                    </h1>
                  </div>
                )}
              </>
            )}
            {showCreateExtra && (
              <>
                <div
                  className="bg-red-400 rounded-lg p-1 hover:scale-95 hover:transition-all cursor-pointer"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  onClick={() => handleClick()}
                >
                  <AiOutlineClose className="text-3xl" />
                </div>
                {showTooltip && (
                  <div className="relative w-fit">
                    <h1 className="bg-stone-600 text-white text-center p-2 round-lg absolute z-10 w-[180px] -bottom-5 right-12 ">
                      Back to Sale Details
                    </h1>
                  </div>
                )}
              </>
            )}
          </div>
          {/* ADD PRODUCTS */}
          <AddSaleProduct
            handleAddProduct={handleAddProduct}
            handleChangeQuantity={handleChangeQuantity}
            formValue={saleProductOne.productName}
            formValueNum={saleProductOne.quantity}
            productsList={productsList}
            productNumber={1}
          />
          {showCreateExtra && (
            <>
              <AddSaleProduct
                handleAddProduct={handleAddProduct}
                handleChangeQuantity={handleChangeQuantity}
                formValue={saleProductTwo.productName}
                formValueNum={saleProductTwo.quantity}
                productsList={productsList}
                productNumber={2}
              />
              <AddSaleProduct
                handleAddProduct={handleAddProduct}
                handleChangeQuantity={handleChangeQuantity}
                formValue={saleProductThree.productName}
                formValueNum={saleProductThree.quantity}
                productsList={productsList}
                productNumber={3}
              />
              <AddSaleProduct
                handleAddProduct={handleAddProduct}
                handleChangeQuantity={handleChangeQuantity}
                formValue={saleProductFour.productName}
                formValueNum={saleProductFour.quantity}
                productsList={productsList}
                productNumber={4}
              />
              <AddSaleProduct
                handleAddProduct={handleAddProduct}
                handleChangeQuantity={handleChangeQuantity}
                formValue={saleProductFive.productName}
                formValueNum={saleProductFive.quantity}
                productsList={productsList}
                productNumber={5}
              />
            </>
          )}
          {/* NOTES -- SALES PERSON */}
          <div className="w-full  flex flex-col space-y-4 xl:space-y-0 xl:space-x-4 xl:flex-row ">
            <div className="flex flex-col w-full xl:w-6/12">
              <label htmlFor="name" className="text-sm">
                Sales person
              </label>
              <input
                type="text"
                name="name"
                value={user.name}
                disabled
                className="text-lg border-2 p-1 border-stone-500 outline-none focus:shadow-lg focus:transition-all disabled:bg-gray-200"
              />
            </div>
            <div className="flex flex-col w-full xl:w-6/12">
              <label htmlFor="name" className="text-sm">
                Sales Email
              </label>
              <input
                type="text"
                name="name"
                value={user.email}
                disabled
                className="text-lg border-2 p-1 border-stone-500 outline-none focus:shadow-lg focus:transition-all disabled:bg-gray-200"
              />
            </div>
          </div>
          <div>
            <button
              className="px-4 py-2 border-2 rounded-lg bg-green-400 text-stone-800 flex items-center space-x-2 hover:scale-95 hover:transition-all w-full justify-center"
              onClick={() => setShowConfirm(true)}
            >
              <h1>Confirm Sale</h1>
            </button>
          </div>
        </>
      )}
      {showConfirm && (
        <ConfirmSaleModal
          formData={formData}
          saleProductOne={saleProductOne}
          saleProductTwo={saleProductTwo}
          saleProductThree={saleProductThree}
          saleProductFour={saleProductFour}
          saleProductFive={saleProductFive}
        />
      )}
    </main>
  );
}

export default SaleModalContent;
