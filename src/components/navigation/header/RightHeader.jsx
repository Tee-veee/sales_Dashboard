import { useContext } from "react";
// STATE
import UserContext from "../../../context/UserContext";
import ThemeContext from "../../../context/ThemeContext";
import DarkModeContext from "../../../context/DarkModeContext";
// ASSETS
import { HiMenuAlt3 } from "react-icons/hi";
import { FaMoon } from "react-icons/fa";
import { BsFillSunFill } from "react-icons/bs";
import { MdLogin } from "react-icons/md";

function RightHeader() {
  const { user, signInWithGoogle, signOutWithGoogle } = useContext(UserContext);
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const { setShowModal } = useContext(ThemeContext);

  return (
    <div className="p-2 w-6/12">
      <div className="flex items-center justify-end">
        {!darkMode && (
          <div onClick={() => setDarkMode(true)}>
            <FaMoon className="text-3xl mr-6 cursor-pointer hover:scale-95 hover:transition-all text-blue-500" />
          </div>
        )}
        {darkMode && (
          <div onClick={() => setDarkMode(false)}>
            <BsFillSunFill className="text-3xl mr-6 cursor-pointer hover:scale-95 hover:transition-all text-yellow-400" />
          </div>
        )}
        {user === null && (
          <div
            className="hover:scale-95 hover:transition-all text-3xl"
            onClick={() => signInWithGoogle()}
          >
            <MdLogin
              className={`${darkMode ? "text-white" : "text-stone-800"}`}
            >
              Sign In
            </MdLogin>
          </div>
        )}
        {user !== null && (
          <>
            <img
              src={user?.image}
              alt=""
              className="w-10 h-10 rounded-full"
              onClick={() => signOutWithGoogle()}
            />
          </>
        )}

        <div
          onClick={() => {
            setShowModal(true);
          }}
        >
          <HiMenuAlt3
            className={`text-3xl ml-6 cursor-pointer hover:scale-95 hover:transition-all ${
              darkMode ? "text-white" : "text-stone-800"
            }`}
          />
        </div>
      </div>
    </div>
  );
}

export default RightHeader;
