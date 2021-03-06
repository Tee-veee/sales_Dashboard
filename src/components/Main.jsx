import { useContext } from "react";
// STATE
import DarkModeContext from "../context/DarkModeContext";
import SidebarContext from "../context/SidebarContext";
// COMPONENTS
import AnalyticsComponent from "./analytics/AnalyticsComponent";
import ClientsComponent from "./clients/ClientsComponent";
import HomeComponent from "./home/HomeComponent";
import ProductsComponent from "./products/ProductsComponent";
import ProfileComponent from "./profile/ProfileComponent";
import SalesComponent from "./sales/SalesComponent";
import SuppliersComponent from "./suppliers/SuppliersComponent";

function Main() {
  const { selected } = useContext(SidebarContext);
  const { darkMode } = useContext(DarkModeContext);

  return (
    <main
      className={`min-h-screen h-fit pl-[60px] xl:pl-[260px] pt-[60px]  ${
        darkMode ? "bg-stone-800" : "bg-slate-100"
      } transition-colors duration-300`}
    >
      {selected === "Home" && <HomeComponent />}
      {selected === "Products" && <ProductsComponent />}
      {selected === "Clients" && <ClientsComponent />}
      {selected === "Sales" && <SalesComponent />}
      {selected === "Suppliers" && <SuppliersComponent />}
      {selected === "Analytics" && <AnalyticsComponent />}
      {selected === "My Profile" && <ProfileComponent />}
    </main>
  );
}

export default Main;
