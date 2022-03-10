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

  const filterSuppliers = (type) => {
    const setList = (sortedList, a, b, c, d, e) => {
      setSupplierList([]);
      setTimeout(() => {
        setSupplierList(sortedList);
      }, 100);
      setSortConditions({
        nameSort: a,
        emailSort: b,
        phoneSort: c,
        postSort: d,
        catSort: e,
      });
    };

    if (type === "supplierName") {
      const compareSupplierName = (a, b) => {
        const nameArrA = a.supplierName.split(" ");
        const nameArrB = b.supplierName.split(" ");
        if (nameArrA[0] < nameArrB[0]) {
          return -1;
        }
        if (nameArrA[0] > nameArrB[0]) {
          return 1;
        }
        return 0;
      };

      const sortedList = supplierList.sort(compareSupplierName);
      if (sortConditions.nameSort === true) return;
      setList(sortedList, true, false, false, false, false);
    } else if (type === "supplierEmail") {
      const compareEmail = (a, b) => {
        const nameArrA = a.supplierEmail.split(" ");
        const nameArrB = b.supplierEmail.split(" ");

        if (nameArrA[0] < nameArrB[0]) {
          return -1;
        }
        if (nameArrA[0] > nameArrB[0]) {
          return 1;
        }
        return 0;
      };
      const sortedList = supplierList.sort(compareEmail);
      if (sortConditions.emailSort === true) return;
      setList(sortedList, false, true, false, false, false);
    } else if (type === "supplierPhone") {
      const comparePhone = (a, b) => {
        const nameArrA = a.supplierPhone.split("");
        const nameArrB = b.supplierPhone.split("");

        if (nameArrA[2] < nameArrB[2]) {
          return -1;
        }
        if (nameArrA[2] > nameArrB[2]) {
          return 1;
        }
        if (nameArrA[3] < nameArrB[3]) {
          return -1;
        }
        if (nameArrA[3] > nameArrB[3]) {
          return 1;
        }
        if (nameArrA[4] < nameArrB[4]) {
          return -1;
        }
        if (nameArrA[4] > nameArrB[4]) {
          return 1;
        }
        if (nameArrA[5] < nameArrB[5]) {
          return -1;
        }
        if (nameArrA[5] > nameArrB[5]) {
          return 1;
        }
        if (nameArrA[6] < nameArrB[6]) {
          return -1;
        }
        if (nameArrA[6] > nameArrB[6]) {
          return 1;
        }
        if (nameArrA[7] < nameArrB[7]) {
          return -1;
        }
        if (nameArrA[7] > nameArrB[7]) {
          return 1;
        }
        if (nameArrA[8] < nameArrB[8]) {
          return -1;
        }
        if (nameArrA[8] > nameArrB[8]) {
          return 1;
        }
      };
      const sortedList = supplierList.sort(comparePhone);
      if (sortConditions.phoneSort === true) return;
      setList(sortedList, false, false, true, false, false);
    } else if (type === "Postcode") {
      const sortedList = supplierList.sort((a, b) => {
        return b.supplierPostcode - a.supplierPostcode;
      });
      if (sortConditions.postSort === true) return;

      setList(sortedList, false, false, false, true, false);
    } else if (type === "Category") {
      const compareCategory = (a, b) => {
        const nameArrA = a.supplierCategory.split(" ");
        const nameArrB = b.supplierCategory.split(" ");

        if (nameArrA[0] < nameArrB[0]) {
          return -1;
        }
        if (nameArrA[0] > nameArrB[0]) {
          return 1;
        }
        return 0;
      };
      const sortedList = supplierList.sort(compareCategory);
      if (sortConditions.catSort === true) return;
      setList(sortedList, false, false, false, false, true);
    }
  };

  useEffect(() => {
    getSuppliers();
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
                    ? `bg-${accentColor}-500`
                    : ""
                }`}
                onClick={() => filterSuppliers("supplierName")}
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
                    ? `bg-${accentColor}-500`
                    : ""
                }`}
                onClick={() => filterSuppliers("supplierEmail")}
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
                    ? `bg-${accentColor}-500`
                    : ""
                }`}
                onClick={() => filterSuppliers("supplierPhone")}
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
                    ? `bg-${accentColor}-500`
                    : ""
                }`}
                onClick={() => filterSuppliers("Postcode")}
              >
                Postcode
              </button>
              <button
                className={`px-4 py-2 border-2 rounded-lg flex items-center space-x-2 hover:scale-95 hover:transition-all ${
                  darkMode
                    ? "text-white border-white"
                    : "text-stone-700 border-black"
                } ${
                  sortConditions.catSort === true ? `bg-${accentColor}-500` : ""
                }`}
                onClick={() => filterSuppliers("Category")}
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
