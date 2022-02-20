import { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import { AiFillCloseSquare } from "react-icons/ai";
function ThemeModal() {
  const { accentColor, setAccentColor, setShowModal } =
    useContext(ThemeContext);

  const colorsList = [
    { backgroundColor: "bg-red-500", value: "red", name: "Red Theme" },
    { backgroundColor: "bg-orange-500", value: "orange", name: "Orange Theme" },
    { backgroundColor: "bg-yellow-500", value: "yellow", name: "Yellow Theme" },
    { backgroundColor: "bg-blue-500", value: "blue", name: "Blue Theme" },
    { backgroundColor: "bg-purple-500", value: "purple", name: "Purple Theme" },
    { backgroundColor: "bg-pink-500", value: "pink", name: "Pink Theme" },
    { backgroundColor: "bg-green-500", value: "green", name: "Green Theme" },
  ];

  return (
    <div className="p-4 absolute w-[300px] bg-stone-700 top-0 right-0 h-screen opacity-90 z-10 flex flex-col space-y-4 text-white">
      <AiFillCloseSquare
        className="text-2xl absolute top-2 right-2 z-20 cursor-pointer"
        onClick={() => setShowModal(false)}
      />
      <h1 className="text-3xl ">Choose a Theme</h1>
      {colorsList.map((color) => {
        return (
          <div
            className={`p-2 flex items-center hover:bg-stone-500 hover:transition-all rounded-lg cursor-pointer ${
              accentColor === color.value
                ? "bg-stone-400 hover:bg-stone-400 shadow-lg"
                : ""
            }`}
            key={color.backgroundColor}
            onClick={() => setAccentColor(color.value)}
          >
            <div
              className={`h-10 w-10 rounded-lg ${color.backgroundColor} mr-2`}
            ></div>
            <h1>{color.name}</h1>
          </div>
        );
      })}
    </div>
  );
}

export default ThemeModal;
