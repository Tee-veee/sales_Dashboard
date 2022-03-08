// COMPONENTS
import Card from "../Card";
// REACT
import { useContext, useEffect } from "react";
// ASSETS
import { AiOutlineMail } from "react-icons/ai";
import { RiVipDiamondFill } from "react-icons/ri";
import { FaUserPlus, FaTicketAlt } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
// STATE
import CreateModalContext from "../../context/CreateModalContext";
import DarkModeContext from "../../context/DarkModeContext";
import UserContext from "../../context/UserContext";
import Table from "../table/Table";
import { colNamesTwoHome, tableTwoDataHome } from "../../data/fakeTableData";
import SalesContext from "../../context/SalesContext";

function ProfileComponent() {
  const { setShowModal } = useContext(CreateModalContext);
  const { darkMode } = useContext(DarkModeContext);
  const { user } = useContext(UserContext);
  const { getUserSales } = useContext(SalesContext);

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
      <section className="w-full  md:space-x-4 lg:mt-10 flex flex-col md:flex-row">
        <div className=" w-full ">
          <h1
            className={`mb-2 text-2xl ${
              darkMode ? "text-white" : "text-stone-700"
            }`}
          >
            My Sales
          </h1>
          <Table colNames={colNamesTwoHome} tableData={tableTwoDataHome} />
        </div>
      </section>
    </main>
  );
}

export default ProfileComponent;
