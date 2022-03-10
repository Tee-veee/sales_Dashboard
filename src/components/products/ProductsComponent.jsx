// ASSETS
import { BsFilterRight } from "react-icons/bs";
import { MdAdd, MdTrendingUp } from "react-icons/md";
import { BiArrowToTop } from "react-icons/bi";
import { BsFillCartDashFill, BsFillCartPlusFill } from "react-icons/bs";

// COMPONENTS
import Table from "../table/Table";
import Card from "../Card";
// REACT
import { useContext, useEffect, useState } from "react";
// STATE
import CreateModalContext from "../../context/CreateModalContext";
import DarkModeContext from "../../context/DarkModeContext";
import ProductContext from "../../context/ProductContext";
import Loading from "../loading/Loading";
import ThemeContext from "../../context/ThemeContext";

function ProductsComponent() {
  const { setShowModal } = useContext(CreateModalContext);
  const { darkMode } = useContext(DarkModeContext);
  const { productsList, getProducts, setProductsList } =
    useContext(ProductContext);
  const { accentColor } = useContext(ThemeContext);
  const [showFilter, setShowFilter] = useState(false);
  const [sortConditions, setSortConditions] = useState({
    nameSort: false,
    catSort: false,
    priceSort: false,
    margSort: false,
  });

  const filterProducts = (type) => {
    const setList = (sortedList, a, b, c, d) => {
      setProductsList([]);
      setTimeout(() => {
        setProductsList(sortedList);
      }, 100);
      setSortConditions({
        nameSort: a,
        catSort: b,
        priceSort: c,
        margSort: d,
      });
    };

    if (type === "productName") {
      const compareProductName = (a, b) => {
        const nameArrA = a.productName.split(" ");
        const nameArrB = b.productName.split(" ");
        if (nameArrA[0] < nameArrB[0]) {
          return -1;
        }
        if (nameArrA[0] > nameArrB[0]) {
          return 1;
        }
        return 0;
      };

      const sortedList = productsList.sort(compareProductName);
      if (sortConditions.nameSort === true) return;
      setList(sortedList, true, false, false, false);
    } else if (type === "productCategory") {
      const compareCategory = (a, b) => {
        const nameArrA = a.productCategory.split(" ");
        const nameArrB = b.productCategory.split(" ");

        if (nameArrA[0] < nameArrB[0]) {
          return -1;
        }
        if (nameArrA[0] > nameArrB[0]) {
          return 1;
        }
        return 0;
      };
      const sortedList = productsList.sort(compareCategory);
      if (sortConditions.catSort === true) return;
      setList(sortedList, false, true, false, false);
    } else if (type === "costPrice") {
      const sortedList = productsList.sort((a, b) => {
        return b.productCostPrice - a.productCostPrice;
      });
      if (sortConditions.priceSort === true) return;
      setList(sortedList, false, false, true, false);
    } else if (type === "%Margain") {
      const sortedList = productsList.sort((a, b) => {
        return b.productProfitMargain - a.productProfitMargain;
      });
      if (sortConditions.dateSort === true) return;

      setList(sortedList, false, false, false, true);
    }
  };

  const colNames = [
    "Product Name",
    "Product Category",
    "Cost Price",
    "% Margain",
  ];

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <main className="relative w-full h-full flex-col px-6 overflow-hidden">
      <header className="w-full  pt-10 ">
        <h1
          className={`text-3xl ${darkMode ? " text-white" : "text-stone-700"}`}
        >
          View Products
        </h1>

        <section className="w-full mt-4 flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2">
          <div className="w-full flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
            <Card title={"Trending"} icon={<MdTrendingUp />} />
            <Card title={"Top Rated"} icon={<BiArrowToTop />} />
          </div>
          <div className="w-full flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
            <Card title={"Overstock"} icon={<BsFillCartDashFill />} />
            <Card title={"Reorder"} icon={<BsFillCartPlusFill />} />
          </div>
        </section>

        <div className="w-full mt-10  flex items-center justify-between">
          <button
            className={`px-4 py-2 border-2 rounded-lg flex items-center space-x-2 hover:scale-95 hover:transition-all ${
              darkMode
                ? "text-white border-white"
                : "text-stone-700 border-black"
            }`}
            onClick={() => setShowFilter(!showFilter)}
          >
            <BsFilterRight className="text-2xl" />
            <h1>Filter</h1>
          </button>
          {showFilter && (
            <div className="lg:flex hidden items-center text-white lg:space-x-8">
              <button
                className={`px-4 py-2 border-2 rounded-lg flex items-center space-x-2 hover:scale-95 hover:transition-all ${
                  darkMode
                    ? "text-white border-white"
                    : "text-stone-700 border-black"
                } ${
                  sortConditions.nameSort === true
                    ? `bg-${accentColor}-500 text-white`
                    : ""
                }`}
                onClick={() => filterProducts("productName")}
              >
                Name
              </button>
              <button
                className={`px-4 py-2 border-2 rounded-lg flex items-center space-x-2 hover:scale-95 hover:transition-all ${
                  darkMode
                    ? "text-white border-white"
                    : "text-stone-700 border-black"
                } ${
                  sortConditions.catSort === true
                    ? `bg-${accentColor}-500 text-white`
                    : ""
                }`}
                onClick={() => filterProducts("productCategory")}
              >
                Category
              </button>
              <button
                className={`px-4 py-2 border-2 rounded-lg flex items-center space-x-2 hover:scale-95 hover:transition-all ${
                  darkMode
                    ? "text-white border-white"
                    : "text-stone-700 border-black"
                } ${
                  sortConditions.priceSort === true
                    ? `bg-${accentColor}-500 text-white`
                    : ""
                }`}
                onClick={() => filterProducts("costPrice")}
              >
                Price
              </button>
              <button
                className={`px-4 py-2 border-2 rounded-lg flex items-center space-x-2 hover:scale-95 hover:transition-all ${
                  darkMode
                    ? "text-white border-white"
                    : "text-stone-700 border-black"
                } ${
                  sortConditions.margSort === true
                    ? `bg-${accentColor}-500 text-white`
                    : ""
                }`}
                onClick={() => filterProducts("%Margain")}
              >
                % Margain
              </button>
            </div>
          )}
          <button
            className="px-4 py-2  rounded-lg bg-green-400 text-stone-800 flex items-center space-x-2 hover:scale-95 hover:transition-all"
            onClick={() => setShowModal(true)}
          >
            <MdAdd className="text-2xl" />
            <h1> Create Product</h1>
          </button>
        </div>
      </header>

      {productsList ? (
        <section className="hidden w-full mt-4 lg:flex flex-col md:flex-row h-full">
          <Table tableData={productsList} colNames={colNames} />
        </section>
      ) : (
        <section className="hidden items-center justify-center w-full mt-4 lg:flex flex-col md:flex-row h-full">
          <Loading />
        </section>
      )}
    </main>
  );
}

export default ProductsComponent;
