import { Puff } from "svg-loaders-react";
import { useContext } from "react";

import DarkModeContext from "../../context/DarkModeContext";
function Loading() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className="w-full flex items-center justify-center  h-full">
      <Puff
        width="300px"
        height="300px"
        stroke={`${darkMode ? "white" : "black"}`}
      />
      ;
    </div>
  );
}

export default Loading;
