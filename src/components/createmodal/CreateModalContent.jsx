import { useContext } from "react";
import SidebarContext from "../../context/SidebarContext";
import ClientModalContent from "./modalcontent/ClientModalContent";
import ProductModalContent from "./modalcontent/ProductModalContent";

function CreateModalContent() {
  const { selected } = useContext(SidebarContext);

  return (
    <div className="p-12 absolute top-[50%] left-[57%] -translate-x-[50%] -translate-y-[50%] z-30 bg-white text-black  h-fit w-fit flex items-center justify-center">
      {selected === "Products" && <ProductModalContent />}
      {selected === "Clients" && <ClientModalContent />}
    </div>
  );
}
export default CreateModalContent;
