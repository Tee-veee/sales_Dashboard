import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// CONTEXT PROVIDERS
import { DarkModeProvider } from "./context/DarkModeContext";
import { ThemeProvider } from "./context/ThemeContext";
import { CreateModalProvider } from "./context/CreateModalContext";
import { UserProvider } from "./context/UserContext";
import { SidebarProvider } from "./context/SidebarContext";
import { ClientContextProvider } from "./context/ClientContext";
import { AlertProvider } from "./context/AlertContext";
// PAGES
import Home from "./pages/Home";
import { ProductContextProvider } from "./context/ProductContext";
import { CategoryProvider } from "./context/CategoryContext";
import { SupplierContextProvider } from "./context/SupplierContext";
import { SalesContextProvider } from "./context/SalesContext";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Router>
        <CreateModalProvider>
          <CategoryProvider>
            <SalesContextProvider>
              <SupplierContextProvider>
                <ClientContextProvider>
                  <ProductContextProvider>
                    <AlertProvider>
                      <DarkModeProvider>
                        <ThemeProvider>
                          <SidebarProvider>
                            <UserProvider>
                              <Routes>
                                <Route path="/" element={<Home />} />
                              </Routes>
                            </UserProvider>
                          </SidebarProvider>
                        </ThemeProvider>
                      </DarkModeProvider>
                    </AlertProvider>
                  </ProductContextProvider>
                </ClientContextProvider>
              </SupplierContextProvider>
            </SalesContextProvider>
          </CategoryProvider>
        </CreateModalProvider>
      </Router>
      <ToastContainer
        autoClose={4000}
        position={"top-right"}
        closeOnClick
        draggable
      />
    </>
  );
}

export default App;
