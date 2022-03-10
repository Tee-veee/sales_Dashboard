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
import ClientContext from "../../context/ClientContext";
import Loading from "../loading/Loading";
import ThemeContext from "../../context/ThemeContext";

function ClientsComponent() {
  const { setShowModal } = useContext(CreateModalContext);
  const { darkMode } = useContext(DarkModeContext);
  const { accentColor } = useContext(ThemeContext);
  const { getClients, clientListShort, setClientListShort } =
    useContext(ClientContext);
  const [showFilter, setShowFilter] = useState(false);
  const [sortConditions, setSortConditions] = useState({
    nameSort: false,
    emailSort: false,
    postSort: false,
    typeSort: false,
  });

  const colNames = ["Name", "Email", "Postcode", "Type"];

  const filterClients = (type) => {
    const setList = (sortedList, a, b, c, d) => {
      setClientListShort([]);
      setTimeout(() => {
        setClientListShort(sortedList);
      }, 100);
      setSortConditions({
        nameSort: a,
        emailSort: b,
        postSort: c,
        typeSort: d,
      });
    };

    if (type === "clientName") {
      const compareClientName = (a, b) => {
        const nameArrA = a.clientName.split(" ");
        const nameArrB = b.clientName.split(" ");
        if (nameArrA[0] < nameArrB[0]) {
          return -1;
        }
        if (nameArrA[0] > nameArrB[0]) {
          return 1;
        }
        return 0;
      };

      const sortedList = clientListShort.sort(compareClientName);
      if (sortConditions.nameSort === true) return;
      setList(sortedList, true, false, false, false);
    } else if (type === "clientEmail") {
      const compareEmail = (a, b) => {
        const nameArrA = a.clientEmail.split(" ");
        const nameArrB = b.clientEmail.split(" ");

        if (nameArrA[0] < nameArrB[0]) {
          return -1;
        }
        if (nameArrA[0] > nameArrB[0]) {
          return 1;
        }
        return 0;
      };
      const sortedList = clientListShort.sort(compareEmail);
      if (sortConditions.emailSort === true) return;
      setList(sortedList, false, true, false, false);
    } else if (type === "Postcode") {
      const sortedList = clientListShort.sort((a, b) => {
        return b.clientPostcode - a.clientPostcode;
      });
      if (sortConditions.postSort === true) return;
      setList(sortedList, false, false, true, false);
    } else if (type === "clientType") {
      const sortedList = clientListShort.sort((a, b) => {
        if (a.clientType < b.clientType) {
          return -1;
        }
        if (a.clientType > b.clientType) {
          return 1;
        }
        return 0;
      });
      if (sortConditions.typeSort === true) return;

      setList(sortedList, false, false, false, true);
    }
  };

  useEffect(() => {
    getClients(true, false);
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
            <Card title={"Top Clients"} icon={<RiVipDiamondFill />} />
            <Card title={"Recent Clients"} icon={<FaUserPlus />} />
          </div>
          <div className="w-full flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
            <Card title={"Support Tickets"} icon={<FaTicketAlt />} />
            <Card title={"Mailing List"} icon={<AiOutlineMail />} />
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
                onClick={() => filterClients("clientName")}
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
                onClick={() => filterClients("clientEmail")}
              >
                Email
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
                onClick={() => filterClients("Postcode")}
              >
                Postcode
              </button>
              <button
                className={`px-4 py-2 border-2 rounded-lg flex items-center space-x-2 hover:scale-95 hover:transition-all ${
                  darkMode
                    ? "text-white border-white"
                    : "text-stone-700 border-black"
                } ${
                  sortConditions.typeSort === true
                    ? `bg-${accentColor}-500 text-white`
                    : ""
                }`}
                onClick={() => filterClients("clientType")}
              >
                Type
              </button>
            </div>
          )}
          <button
            className="px-4 py-2 rounded-lg bg-green-400 text-stone-800 flex items-center space-x-2 hover:scale-95 hover:transition-all"
            onClick={() => setShowModal(true)}
          >
            <MdAdd className="text-2xl" />
            <h1> Create New Client</h1>
          </button>
        </div>
      </header>

      {clientListShort ? (
        <section className="hidden w-full mt-4 lg:flex flex-col md:flex-row h-full">
          <Table tableData={clientListShort} colNames={colNames} />
        </section>
      ) : (
        <section className="hidden items-center justify-center w-full mt-4 lg:flex flex-col md:flex-row h-full">
          <Loading />
        </section>
      )}
    </main>
  );
}

export default ClientsComponent;
