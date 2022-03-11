// ASSETS
import {
  AiFillHome,
  AiOutlineShoppingCart,
  AiOutlineInbox,
  AiOutlineUser,
  AiOutlinePieChart,
} from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { SiSimpleanalytics } from "react-icons/si";

import { useContext } from "react";
import SidebarContext from "../../context/SidebarContext";
import CreateModalContext from "../../context/CreateModalContext";
import ThemeContext from "../../context/ThemeContext";
import DarkModeContext from "../../context/DarkModeContext";
import UserContext from "../../context/UserContext";
function Sidebar() {
  const { selected, setSelected } = useContext(SidebarContext);
  const { setShowModal } = useContext(CreateModalContext);
  const { accentColor } = useContext(ThemeContext);
  const { darkMode } = useContext(DarkModeContext);
  const { user } = useContext(UserContext);

  const handleClick = (optionTitle) => {
    setShowModal(false);
    setSelected(optionTitle);
  };

  const sidebarOptions = [
    {
      title: "Home",
      icon: <AiFillHome />,
    },
    {
      title: "Sales",
      icon: <AiOutlineInbox />,
    },
    {
      title: "Products",
      icon: <AiOutlineShoppingCart />,
    },
    {
      title: "Clients",
      icon: <BsFillPersonFill />,
    },
    {
      title: "Suppliers",
      icon: <SiSimpleanalytics />,
    },
    {
      title: "Analytics",
      icon: <AiOutlinePieChart />,
    },
    {
      title: "My Profile",
      icon: <AiOutlineUser />,
    },
  ];

  return (
    <div
      className={`fixed top-0 h-screen ${
        darkMode ? "bg-stone-700" : "bg-white"
      } transition-colors duration-300 w-[60px] xl:w-[260px] z-20  flex flex-col  space-y-2`}
    >
      <h1
        className={`hidden xl:block p-4 text-2xl ${
          darkMode ? "text-white" : "text-stone-700"
        }`}
      >
        Admin Dashboard
      </h1>
      {user &&
        sidebarOptions?.map((option, i) => {
          return (
            <div
              className={`flex items-center space-x-4  p-2 xl:p-3 xl:mx-4 ${
                selected === option.title
                  ? `bg-${accentColor}-500 shadow-lg  rounded-lg border-black`
                  : ""
              } ${
                darkMode || selected === option.title
                  ? "text-white"
                  : "text-stone-700"
              } hover:rounded-lg hover:text-white hover:transition-all hover:shadow-lg  cursor-pointer mx-auto  ${
                accentColor === "red"
                  ? "hover:bg-red-500"
                  : accentColor === "pink"
                  ? "hover:bg-pink-500"
                  : accentColor === "yellow"
                  ? "hover:bg-yellow-500"
                  : accentColor === "green"
                  ? "hover:bg-green-500"
                  : accentColor === "purple"
                  ? "hover:bg-purple-500"
                  : accentColor === "orange"
                  ? "hover:bg-orange-500"
                  : accentColor === "blue"
                  ? "hover:bg-blue-500"
                  : ""
              }`}
              key={i}
              id={option.title}
              onClick={() => handleClick(option.title)}
            >
              <span className="text-3xl">{option.icon}</span>
              <h1 className="hidden xl:block">{option.title}</h1>
            </div>
          );
        })}
      {!user && (
        <h1 className={`p-4 ${darkMode ? "text-white" : "text-stone-600"}`}>
          Sign in to access company dashboard.
        </h1>
      )}
    </div>
  );
}

export default Sidebar;
