// COMPONENTS
import Card from "../Card";
// REACT
import { useContext, useEffect, useState } from "react";
// ASSETS
import { AiOutlineMail } from "react-icons/ai";
import { RiVipDiamondFill } from "react-icons/ri";
import { FaUserPlus, FaTicketAlt } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { BsFilterRight } from "react-icons/bs";
// STATE
import CreateModalContext from "../../context/CreateModalContext";
import DarkModeContext from "../../context/DarkModeContext";
import UserContext from "../../context/UserContext";
import Table from "../table/Table";

import SalesContext from "../../context/SalesContext";
import Loading from "../loading/Loading";
import ThemeContext from "../../context/ThemeContext";

// FUNCTIONS
import { filterUserSales } from "../../functions/filter/filterTables";

function ProfileComponent() {
  const { setShowModal } = useContext(CreateModalContext);
  const { darkMode } = useContext(DarkModeContext);
  const { user } = useContext(UserContext);
  const { getUserSales, userSalesList, setUserSalesList } =
    useContext(SalesContext);
  const { accentColor } = useContext(ThemeContext);
  const [showFilter, setShowFilter] = useState(false);
  const [sortConditions, setSortConditions] = useState({
    nameSort: false,
    emailSort: false,
    grandSort: false,
    dateSort: false,
  });

  const colNames = [
    "Client",
    "Client Email",
    "Grand Total",
    "Sale Date",
    "Sale ID",
  ];

  useEffect(() => {
    getUserSales(user);
  }, []);

  return (
    <main className="relative w-full h-full flex-col px-6 overflow-hidden">
      <header className="w-full  pt-10 ">
        <h1
          className={`text-3xl ${darkMode ? " text-white" : "text-stone-700"}`}
        >
          View Clients
        </h1>

        <section className="w-full mt-4 flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2">
          <div className="w-full flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
            <Card title={"Sales"} icon={<RiVipDiamondFill />} />
            <Card title={"Clients"} icon={<FaUserPlus />} />
          </div>
          <div className="w-full flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
            <Card title={"Admin"} icon={<FaTicketAlt />} />
            <Card title={"Documents"} icon={<AiOutlineMail />} />
          </div>
        </section>

        <div className="w-full  mb-4 md:mb-0 mt-10  flex  md:justify-between  flex-col md:flex-row">
          <div className="flex items-center">
            <img
              src={user?.image}
              alt="profile"
              className="xl:w-32 rounded-lg "
            />
            <div className="flex p-2 flex-col space-y-1">
              <h1
                className={`${
                  darkMode ? "text-white" : "text-stone-700"
                } text-3xl font-semibold`}
              >
                {user?.name}
              </h1>
              <h2
                className={`${
                  darkMode ? "text-white" : "text-stone-700"
                } text-lg font-thin`}
              >
                {user?.email}
              </h2>
            </div>
          </div>
          <div className={`mt-10 md:mt-0`}>
            <button
              className="px-4 py-2 rounded-lg bg-green-400 text-stone-800 flex items-center space-x-2 hover:scale-95 hover:transition-all"
              onClick={() => setShowModal(true)}
            >
              <MdAdd className="text-2xl" />
              <h1>Edit Details</h1>
            </button>
          </div>
        </div>
      </header>
      <div className="flex justify-between">
        <button
          className={`px-4 py-2 mt-6 border-2 rounded-lg flex items-center space-x-2 hover:scale-95 hover:transition-all ${
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
                sortConditions.nameSort === true
                  ? `bg-${accentColor}-500 text-white`
                  : ""
              }`}
              onClick={() =>
                filterUserSales(
                  "clientName",
                  sortConditions,
                  setSortConditions,
                  userSalesList,
                  setUserSalesList
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
                sortConditions.emailSort === true
                  ? `bg-${accentColor}-500 text-white`
                  : ""
              }`}
              onClick={() =>
                filterUserSales(
                  "clientEmail",
                  sortConditions,
                  setSortConditions,
                  userSalesList,
                  setUserSalesList
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
                sortConditions.grandSort === true
                  ? `bg-${accentColor}-500 text-white`
                  : ""
              }`}
              onClick={() =>
                filterUserSales(
                  "grandTotal",
                  sortConditions,
                  setSortConditions,
                  userSalesList,
                  setUserSalesList
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
                filterUserSales(
                  "saleDate",
                  sortConditions,
                  setSortConditions,
                  userSalesList,
                  setUserSalesList
                )
              }
            >
              Date
            </button>
          </div>
        )}
        <div></div>
      </div>
      <section className="w-full  md:space-x-4 lg:mt-4 flex flex-col md:flex-row">
        {userSalesList ? (
          <div className=" w-full hidden lg:block">
            <h1
              className={`mb-4 text-2xl ${
                darkMode ? "text-white" : "text-stone-700"
              }`}
            >
              My Sales
            </h1>
            <Table colNames={colNames} tableData={userSalesList} />
          </div>
        ) : (
          <Loading />
        )}
      </section>
    </main>
  );
}

export default ProfileComponent;
