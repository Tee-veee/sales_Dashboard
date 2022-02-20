// COMPONENTS
import Card from "../Card";
import Table from "../table/Table";
// ASSETS
import { AiOutlineDollar } from "react-icons/ai";
import { FaBriefcase } from "react-icons/fa";
import fakeGraph from "../../assets/graphPlaceholder.svg";
import fakeGraph2 from "../../assets/graphPlaceholder2.svg";
// DATA
import {
  salesDataOne,
  colNamesOneSales,
  salesDataTwo,
  colNamesTwoSales,
} from "../../data/fakeTableData";
// REACT
import { useContext } from "react";
// STATE
import UserContext from "../../context/UserContext";
import DarkModeContext from "../../context/DarkModeContext";
import { BsFilterRight } from "react-icons/bs";
import { MdAdd } from "react-icons/md";
import CreateModalContext from "../../context/CreateModalContext";

function SalesComponent() {
  const { user } = useContext(UserContext);
  const { darkMode } = useContext(DarkModeContext);
  const { setShowModal } = useContext(CreateModalContext);

  return (
    <main className="w-full h-full flex-col pb-10">
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
      <div className="w-full px-6 mt-10 mb-4 flex items-center justify-between">
        <button
          className={`px-4 py-2 border-2 rounded-lg flex items-center space-x-2 hover:scale-95 hover:transition-all ${
            darkMode ? "text-white border-white" : "text-stone-700 border-black"
          }`}
        >
          <BsFilterRight className="text-2xl" />
          <h1>Filter</h1>
        </button>
        <button
          className="px-4 py-2 rounded-lg bg-green-400 text-stone-800 flex items-center space-x-2 hover:scale-95 hover:transition-all"
          onClick={() => setShowModal(true)}
        >
          <MdAdd className="text-2xl" />
          <h1>New Sale</h1>
        </button>
      </div>
      <div className="w-full flex px-4">
        <div className="w-full flex flex-col h-fit lg:w-6/12">
          <img src={fakeGraph2} alt="Fake Graph" className="px-2 w-full " />
          <div className="px-2 pt-4 w-full mt-4">
            <Table colNames={colNamesOneSales} tableData={salesDataOne} />
          </div>
        </div>
        <div className="w-full lg:w-6/12">
          <div className="px-2 w-full hidden xl:block">
            <Table colNames={colNamesTwoSales} tableData={salesDataTwo} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default SalesComponent;
