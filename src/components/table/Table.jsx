import { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";

function Table({ colNames, tableData, paddingX }) {
  const { accentColor } = useContext(ThemeContext);
  return (
    <table
      cellPadding={6}
      className=" h-auto w-full hover:shadow-xl hover:transition-all rounded-xl bg-stone-200 "
    >
      <thead>
        <tr>
          {colNames.map((colName, i) => {
            return (
              <th
                key={i}
                className={`px-4 ${paddingX} text-lg bg-stone-700 text-white `}
              >
                {colName.toUpperCase()}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className="pb-4 pt-4 ">
        {Object?.values(tableData)?.map((obj, i) => {
          return (
            <tr
              key={i}
              className={`mb-4 mt-4 ${
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
              } hover:text-white cursor-pointer`}
            >
              {Object?.values(obj)?.map((value, ind) => {
                return (
                  <td key={ind} className="text-center ">
                    {value}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
