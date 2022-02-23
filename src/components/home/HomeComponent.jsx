// COMPONENTS
import Card from "../Card";
import Table from "../table/Table";
// ASSETS
import { AiOutlineDollar, AiOutlineShoppingCart } from "react-icons/ai";
import { FaBriefcase } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";
import fakeGraph from "../../assets/graphPlaceholder.svg";
// DATA
import { tableTwoDataHome, colNamesTwoHome } from "../../data/fakeTableData";
// REACT
import { useContext, useEffect } from "react";
// STATE
import UserContext from "../../context/UserContext";
import DarkModeContext from "../../context/DarkModeContext";

function HomeComponent() {
  const { user, getUsers, userListShort } = useContext(UserContext);
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    getUsers(true, false);
  }, []);

  const colNamesUsers = ["name", "email"];

  return (
    <main className="w-full h-full flex-col">
      {user && (
        <>
          <header className="w-fit pt-10 px-6">
            <h1
              className={`text-3xl ${
                darkMode ? " text-white" : "text-stone-700"
              }`}
            >
              {user ? `Welcome back, ${user.name}.` : "Dashboard"}
            </h1>
          </header>
          <section className="w-full p-4  flex flex-col md:flex-row ">
            <section className="p-2 w-full md:w-6/12 xl:w-5/12  flex flex-col space-y-2 md:space-y-2  ">
              <div className="flex flex-col md:flex-row md:space-x-2 md:space-y-0 space-y-2 h-full">
                <Card title={"Sales"} icon={<AiOutlineDollar />} />
                <Card title={"Orders"} icon={<FaBriefcase />} />
              </div>
              <div className="flex flex-col md:flex-row md:space-x-2 md:space-y-0 space-y-2 h-full">
                <Card title={"Products"} icon={<AiOutlineShoppingCart />} />
                <Card title={"Invoices"} icon={<HiOutlineDocumentReport />} />
              </div>
            </section>
            <section className="w-full md:w-6/12 xl:w-7/12 p-2 max-h-[500px] ">
              <div className="w-full h-full ">
                <img
                  src={fakeGraph}
                  className="w-auto h-auto lg:w-[900px] lg:h-[400px] mx-auto"
                  alt="Fake Graph"
                />
              </div>
            </section>
          </section>
          <section className="w-full  p-4 lg:mt-10 flex flex-col md:flex-row">
            <div className="p-2 w-full ">
              <h1
                className={`mb-2 text-2xl ${
                  darkMode ? "text-white" : "text-stone-700"
                }`}
              >
                Sales People
              </h1>
              <Table colNames={colNamesUsers} tableData={userListShort} />
            </div>
            <div className="p-2 w-full hidden xl:block">
              <h1
                className={`mb-2 text-2xl ${
                  darkMode ? "text-white" : "text-stone-700"
                }`}
              >
                Top Sales
              </h1>
              <Table colNames={colNamesTwoHome} tableData={tableTwoDataHome} />
            </div>
          </section>
        </>
      )}
    </main>
  );
}

export default HomeComponent;
