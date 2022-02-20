import { useContext } from "react";
import CreateModalContext from "../../context/CreateModalContext";

function CreateModal() {
  const { setShowModal } = useContext(CreateModalContext);

  return (
    <div
      className="fixed top-0 left-0 w-full h-screen bg-black z-10 opacity-80 flex items-center justify-center"
      onClick={() => setShowModal(false)}
    ></div>
  );
}

export default CreateModal;
