// COMPONENTS
import Card from "../Card";
import Table from "../table/Table";
import Loading from "../loading/Loading";
// ASSETS
import { AiOutlineDollar } from "react-icons/ai";
import { FaBriefcase } from "react-icons/fa";
import { BsFilterRight } from "react-icons/bs";
import { MdAdd } from "react-icons/md";
// REACT
import { useContext, useEffect, useState } from "react";
// STATE
import DarkModeContext from "../../context/DarkModeContext";
import CreateModalContext from "../../context/CreateModalContext";
import SalesContext from "../../context/SalesContext";
import ThemeContext from "../../context/ThemeContext";
// FUNCTIONS
import { filterSales } from "../../functions/filter/filterTables";

function SalesComponent() {
  const { darkMode } = useContext(DarkModeContext);
  const { setShowModal } = useContext(CreateModalContext);
  const { salesList, getSales, setSalesList } = useContext(SalesContext);
  const { accentColor } = useContext(ThemeContext);
  const [showFilter, setShowFilter] = useState(false);
  const [sortConditions, setSortConditions] = useState({
    salesSort: false,
    clientSort: false,
    grandSort: false,
    dateSort: false,
  });

  useEffect(() => {
    getSales();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const colNames = [
    "Sales Person",
    "Client",
    "Client E-Mail",
    "Grand Total",
    "Sale Date",
    "Sale ID",
  ];

  return (
    <main className="w-full h-full flex-col ">
      <header className="w-fit pt-10 px-6">
        <h1
          className={`text-3xl ${darkMode ? " text-white" : "text-stone-700"}`}
        >
          Sales
        </h1>
      </header>
      <section className="w-full px-4  flex flex-col md:flex-row ">
        <section className="p-2 mt-2 w-full   flex flex-col space-y-2 md:space-y-2  ">
          <div className="flex flex-col md:flex-row md:space-x-2 md:space-y-0 space-y-2 h-full">
            <Card title={"Top Products"} icon={<AiOutlineDollar />} />
            <Card title={"Promotions"} icon={<FaBriefcase />} />
            <Card title={"Sales People"} icon={<AiOutlineDollar />} />
            <Card title={"Invoices"} icon={<FaBriefcase />} />
          </div>
        </section>
      </section>
      <div className="w-full px-6 mt-8 mb-4 flex items-center justify-between">
        <button
          className={`px-4 py-2 border-2 rounded-lg flex items-center space-x-2 hover:scale-95 hover:transition-all ${
            darkMode ? "text-white border-white" : "text-stone-700 border-black"
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
                sortConditions.salesSort === true
                  ? `bg-${accentColor}-500 text-white`
                  : ""
              }`}
              onClick={() =>
                filterSales(
                  "salesPerson",
                  sortConditions,
                  setSortConditions,
                  salesList,
                  setSalesList
                )
              }
            >
              Sales Person
            </button>
            <button
              className={`px-4 py-2 border-2 rounded-lg flex items-center space-x-2 hover:scale-95 hover:transition-all ${
                darkMode
                  ? "text-white border-white"
                  : "text-stone-700 border-black"
              } ${
                sortConditions.clientSort === true
                  ? `bg-${accentColor}-500 text-white`
                  : ""
              }`}
              onClick={() =>
                filterSales(
                  "clientName",
                  sortConditions,
                  setSortConditions,
                  salesList,
                  setSalesList
                )
              }
            >
              Client
            </button>
            <button
              className={`px-4 py-2 border-2 rounded-lg flex items-center space-x-2 hover:scale-95 hover:transition-all ${
                darkMode
                  ? "text-white border-white"
                  : "text-stone-700 border-black"
              } ${
                sortConditions.grandSort === true
                  ? `bg-${accentColor}-500 text-white`
                  : ""
              }`}
              onClick={() =>
                filterSales(
                  "grandTotal",
                  sortConditions,
                  setSortConditions,
                  salesList,
                  setSalesList
                )
              }
            >
              Total
            </button>
            <button
              className={`px-4 py-2 border-2 rounded-lg flex items-center space-x-2 hover:scale-95 hover:transition-all ${
                darkMode
                  ? "text-white border-white"
                  : "text-stone-700 border-black"
              } ${
                sortConditions.dateSort === true
                  ? `bg-${accentColor}-500 text-white`
                  : ""
              }`}
              onClick={() =>
                filterSales(
                  "saleDate",
                  sortConditions,
                  setSortConditions,
                  salesList,
                  setSalesList
                )
              }
            >
              Date
            </button>
          </div>
        )}

        <button
          className="px-4 py-2 rounded-lg bg-green-400 text-stone-800 flex items-center space-x-2 hover:scale-95 hover:transition-all"
          onClick={() => setShowModal(true)}
        >
          <MdAdd className="text-2xl" />
          <h1>New Sale</h1>
        </button>
      </div>

      <div className="w-full flex px-4">
        <div className="w-full ">
          {salesList ? (
            <div className="px-2 w-full hidden xl:block">
              <Table colNames={colNames} tableData={salesList} />
            </div>
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </main>
  );
}

export default SalesComponent;
