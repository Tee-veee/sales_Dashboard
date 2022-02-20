import { useContext } from "react";
import DarkModeContext from "../context/DarkModeContext";
// STATE
import SidebarContext from "../context/SidebarContext";
import ClientsComponent from "./clients/ClientsComponent";
// COMPONENTS
import HomeComponent from "./home/HomeComponent";
import ProductsComponent from "./products/ProductsComponent";
import SalesComponent from "./sales/SalesComponent";
import SuppliersComponent from "./suppliers/SuppliersComponent";

function Main() {
  const { selected } = useContext(SidebarContext);
  const { darkMode } = useContext(DarkModeContext);
  return (
    <main
      className={`min-h-screen pl-[60px] xl:pl-[260px] pt-[60px]  ${
        darkMode ? "bg-stone-800" : "bg-white"
      } transition-colors duration-300`}
    >
      {selected === "Home" && <HomeComponent />}
      {selected === "Products" && <ProductsComponent />}
      {selected === "Clients" && <ClientsComponent />}
      {selected === "Sales" && <SalesComponent />}
      {selected === "Suppliers" && <SuppliersComponent />}
    </main>
  );
}

export default Main;
