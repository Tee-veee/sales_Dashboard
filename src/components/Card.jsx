// STATE
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import DarkModeContext from "../context/DarkModeContext";

function Card({ title, icon }) {
  const { accentColor } = useContext(ThemeContext);
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div
      className={`w-full  md:w-6/12 flex items-center justify-center space-x-8 ${
        darkMode ? "bg-white text-stone-700" : "bg-stone-700 text-white"
      } transition-colors shadow-lg p-8  rounded-lg hover:transition-all hover:text-white duration-300 ${
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
    >
      <span className="text-4xl">{icon}</span>
      <h1>{title}</h1>
    </div>
  );
}

export default Card;
