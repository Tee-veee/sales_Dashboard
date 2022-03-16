// COMPONENTS
import Header from "../components/navigation/header/Header";
import Sidebar from "../components/navigation/Sidebar";
import Main from "../components/Main";
import CreateModal from "../components/createmodal/CreateModal";
import CreateModalContent from "../components/createmodal/CreateModalContent";
// STATE
import { useContext } from "react";
import CreateModalContext from "../context/CreateModalContext";
import ThemeContext from "../context/ThemeContext";
import ThemeModal from "../components/theme/ThemeModal";

function Home() {
  const { showModal } = useContext(CreateModalContext);
  const { showModal: showThemeModal } = useContext(ThemeContext);

  return (
    <div className="min-h-screen relative">
      {showModal && <CreateModal />}
      {showModal && <CreateModalContent />}
      {showThemeModal && <ThemeModal />}
      <Header />
      <Sidebar />
      <Main />
    </div>
  );
}

export default Home;
