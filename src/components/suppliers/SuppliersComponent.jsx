// COMPONENTS
import Card from "../Card";
import Table from "../table/Table";
// REACT
import { useContext, useEffect, useState } from "react";
// ASSETS
import { AiOutlineMail } from "react-icons/ai";
import { RiVipDiamondFill } from "react-icons/ri";
import { BsFilterRight } from "react-icons/bs";
import { FaUserPlus, FaTicketAlt } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
// STATE
import CreateModalContext from "../../context/CreateModalContext";
import DarkModeContext from "../../context/DarkModeContext";
import SupplierContext from "../../context/SupplierContext";
import Loading from "../loading/Loading";
import ThemeContext from "../../context/ThemeContext";
import { filterSuppliers } from "../../functions/filter/filterTables";

function SuppliersComponent() {
  const { setShowModal } = useContext(CreateModalContext);
  const { darkMode } = useContext(DarkModeContext);
  const { getSuppliers, supplierList, setSupplierList } =
    useContext(SupplierContext);
  const { accentColor } = useContext(ThemeContext);
  const [showFilter, setShowFilter] = useState(false);
  const [sortConditions, setSortConditions] = useState({
    nameSort: false,
    emailSort: false,
    phoneSort: false,
    postSort: false,
    catSort: false,
  });

  const colNames = ["Name", "Email", "Phone", "Postcode", "Category"];

  useEffect(() => {
    getSuppliers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="relative w-full h-full flex-col px-6 overflow-hidden ">
      <header className="w-full  pt-10 ">
        <h1
          className={`text-3xl ${darkMode ? " text-white" : "text-stone-700"}`}
        >
          View Suppliers
        </h1>

        <section className="w-full mt-4 flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2">
          <div className="w-full flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
            <Card title={"Top Suppliers"} icon={<RiVipDiamondFill />} />
            <Card title={"Local"} icon={<FaUserPlus />} />
          </div>
          <div className="w-full flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
            <Card title={"International"} icon={<FaTicketAlt />} />
            <Card title={"Contact"} icon={<AiOutlineMail />} />
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
                onClick={() =>
                  filterSuppliers(
                    "supplierName",
                    sortConditions,
                    setSortConditions,
                    supplierList,
                    setSupplierList
                  )
                }
              >
                Name
              </button>
              <button
                className={`px-4 py-2 border-2 rounded-lg flex items-center space-x-2 hover:scale-95 hover:transition-all ${
                  darkMode
                    ? "text-white border-white"
                    : "text-stone-700 border-black"
                } ${
                  sortConditions.emailSort === true
                    ? `bg-${accentColor}-500 text-white`
                    : ""
                }`}
                onClick={() =>
                  filterSuppliers(
                    "supplierEmail",
                    sortConditions,
                    setSortConditions,
                    supplierList,
                    setSupplierList
                  )
                }
              >
                Email
              </button>
              <button
                className={`px-4 py-2 border-2 rounded-lg flex items-center space-x-2 hover:scale-95 hover:transition-all ${
                  darkMode
                    ? "text-white border-white"
                    : "text-stone-700 border-black"
                } ${
                  sortConditions.phoneSort === true
                    ? `bg-${accentColor}-500 text-white`
                    : ""
                }`}
                onClick={() =>
                  filterSuppliers(
                    "supplierPhone",
                    sortConditions,
                    setSortConditions,
                    supplierList,
                    setSupplierList
                  )
                }
              >
                Phone
              </button>
              <button
                className={`px-4 py-2 border-2 rounded-lg flex items-center space-x-2 hover:scale-95 hover:transition-all ${
                  darkMode
                    ? "text-white border-white"
                    : "text-stone-700 border-black"
                } ${
                  sortConditions.postSort === true
                    ? `bg-${accentColor}-500 text-white`
                    : ""
                }`}
                onClick={() =>
                  filterSuppliers(
                    "Postcode",
                    sortConditions,
                    setSortConditions,
                    supplierList,
                    setSupplierList
                  )
                }
              >
                Postcode
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
                onClick={() =>
                  filterSuppliers(
                    "Category",
                    sortConditions,
                    setSortConditions,
                    supplierList,
                    setSupplierList
                  )
                }
              >
                Category
              </button>
            </div>
          )}
          <button
            className="px-4 py-2 rounded-lg bg-green-400 text-stone-800 flex items-center space-x-2 hover:scale-95 hover:transition-all"
            onClick={() => setShowModal(true)}
          >
            <MdAdd className="text-2xl" />
            <h1>Create New Supplier</h1>
          </button>
        </div>
      </header>

      {supplierList ? (
        <section className="hidden w-full mt-4 lg:flex flex-col md:flex-row h-full">
          <Table tableData={supplierList} colNames={colNames} />
        </section>
      ) : (
        <section className="hidden items-center justify-center w-full mt-4 lg:flex flex-col md:flex-row h-full">
          <Loading />
        </section>
      )}
    </main>
  );
}

export default SuppliersComponent;
