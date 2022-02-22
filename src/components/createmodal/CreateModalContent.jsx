import { useContext } from "react";
import SidebarContext from "../../context/SidebarContext";
import ClientModalContent from "./modalcontent/ClientModalContent";
import ProductModalContent from "./modalcontent/ProductModalContent";
import ProfileModalContent from "./modalcontent/ProfileModalContent";
import SaleModalContent from "./modalcontent/SaleModalContent";
import SupplierModalContent from "./modalcontent/SupplierModalContent";

function CreateModalContent() {
  const { selected } = useContext(SidebarContext);

  return (
    <div className="p-12 absolute top-[50%] left-[57%] -translate-x-[50%] -translate-y-[50%] z-30 bg-white text-black  h-fit w-fit flex items-center justify-center">
      {selected === "Products" && <ProductModalContent />}
      {selected === "Sales" && <SaleModalContent />}
      {selected === "Clients" && <ClientModalContent />}
      {selected === "Suppliers" && <SupplierModalContent />}
      {selected === "My Profile" && <ProfileModalContent />}
    </div>
  );
}
export default CreateModalContent;
