import React, { useContext } from "react";
import DarkModeContext from "../../../context/DarkModeContext";
import LeftHeader from "./LeftHeader";
import RightHeader from "./RightHeader";

function Header() {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div
      className={`xl:pl-[260px] pl-[60px] pr-4 absolute top-0 left-0 w-full h-[60px] flex items-center justify-between  ${
        darkMode ? "bg-stone-700" : "bg-white"
      } transition-colors duration-300`}
    >
      <LeftHeader />
      <RightHeader />
    </div>
  );
}

export default Header;
