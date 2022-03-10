// COMPONENTS
import Card from "../Card";
import Table from "../table/Table";
// ASSETS
import { AiOutlineDollar } from "react-icons/ai";
import { FaBriefcase } from "react-icons/fa";
import fakeGraph2 from "../../assets/graphPlaceholder2.svg";
// REACT
import { useContext, useEffect, useState } from "react";
// STATE
import UserContext from "../../context/UserContext";
import DarkModeContext from "../../context/DarkModeContext";
import { BsFilterRight } from "react-icons/bs";
import { MdAdd } from "react-icons/md";
import CreateModalContext from "../../context/CreateModalContext";
import SalesContext from "../../context/SalesContext";
import Loading from "../loading/Loading";
import ThemeContext from "../../context/ThemeContext";

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
  }, []);

  // HANDLES FILTERING
  const filterSales = (type) => {
    const setList = (sortedList, a, b, c, d) => {
      setSalesList([]);
      setTimeout(() => {
        setSalesList(sortedList);
      }, 100);
      setSortConditions({
        salesSort: a,
        clientSort: b,
        grandSort: c,
        dateSort: d,
      });
    };

    if (type === "salesPerson") {
      const compareSalesPerson = (a, b) => {
        const nameArrA = a.salesPerson.split(" ");
        const nameArrB = b.salesPerson.split(" ");

        if (nameArrA[0] < nameArrB[0]) {
          return -1;
        }
        if (nameArrA[0] > nameArrB[0]) {
          return 1;
        }
        return 0;
      };
      const sortedList = salesList.sort(compareSalesPerson);
      if (sortConditions.salesSort === true) return;
      setList(sortedList, true, false, false, false);
    } else if (type === "clientName") {
      const compareClient = (a, b) => {
        const nameArrA = a.salesClient.split(" ");
        const nameArrB = b.salesClient.split(" ");

        if (nameArrA[0] < nameArrB[0]) {
          return -1;
        }
        if (nameArrA[0] > nameArrB[0]) {
          return 1;
        }
        return 0;
      };
      const sortedList = salesList.sort(compareClient);
      if (sortConditions.clientSort === true) return;
      setList(sortedList, false, true, false, false);
    } else if (type === "grandTotal") {
      const sortedList = salesList.sort((a, b) => {
        return b.grandTotal - a.grandTotal;
      });
      if (sortConditions.grandSort === true) return;
      setList(sortedList, false, false, true, false);
    } else if (type === "saleDate") {
      const sortedList = salesList.sort((a, b) => {
        const date1 = new Date(a.date);
        const date2 = new Date(b.date);

        return date2 - date1;
      });
      if (sortConditions.dateSort === true) return;
      setList(sortedList, false, false, false, true);
    }
  };

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
              onClick={() => filterSales("salesPerson")}
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
              onClick={() => filterSales("clientName")}
            >
              Client Name
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
              onClick={() => filterSales("grandTotal")}
            >
              Grand Total
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
              onClick={() => filterSales("saleDate")}
            >
              Sale Date
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
