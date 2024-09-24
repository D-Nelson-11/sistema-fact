import { Routes, Route } from "react-router-dom";
import "./public/App.css";
import Inventario from "./pages/Inventario/Inventario";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./components/Sidebar/SidebarData";
import SubMenu from "./components/Sidebar/SubMenu";
import { IconContext } from "react-icons/lib";
import { colors } from "./helpers/themes";
import Factura from "./pages/Factura/Factura";
import { Toaster } from "sonner";
import Parametros from "./pages/Parametros/Parametros";
import Index from "./Index";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { useAppContext } from "./context/AppContext";
import Rol from "./pages/Rol/Rol";
import Permisos from "./pages/Permisos/Permisos";
const Nav = styled.div`
  background: ${colors.themeColor};
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: ${colors.themeColor};
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  transition: 0.6s;
  z-index: 10;
  transform: ${({ sidebar }) =>
    sidebar ? "translateX(0)" : "translateX(-100%)"};
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const MainContent = styled.div`
  margin-left: ${({ sidebar }) => (sidebar ? "250px" : "0")};
  transition: margin-left 0.6s;
  padding: 20px;
  background: #f1f1f1;
  min-height: 90vh;
`;
function App() {
  const [sidebar, setSidebar] = useState(false);
  const location = useLocation();
  const showSidebar = () => setSidebar(!sidebar);
  const {logout} = useAppContext();

  return (
    <>
      {location.pathname === "/" ? (
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
      ) : (
        <IconContext.Provider value={{ color: "#fff" }}>
          <Nav className="d-flex justify-content-between">
            <NavIcon to="#" onClick={showSidebar}>
              <FaIcons.FaBars fontSize={"25px"} />
            </NavIcon>
            <div className="me-5">
              <Link onClick={()=>{logout()}}>Cerrar Sesión</Link>
            </div>
          </Nav>
          <SidebarNav sidebar={sidebar}>
            <SidebarWrap>
              <NavIcon to="#" onClick={showSidebar}>
                <AiIcons.AiOutlineClose fontSize={"25px"} />
              </NavIcon>
              {SidebarData.map((item, index) => {
                return <SubMenu item={item} key={index} />;
              })}
            </SidebarWrap>
          </SidebarNav>
          <MainContent sidebar={sidebar}>
            <Routes>
              <Route element={<ProtectedRoutes />}>
                <Route path="/Inventario" element={<Inventario />} />
                <Route path="/factura" element={<Factura />} />
                <Route path="/parametros" element={<Parametros />} />
                <Route path="/Roles" element={<Rol />} />
                <Route path="/Permisos" element={<Permisos />} />
              </Route>
            </Routes>
          </MainContent>
        </IconContext.Provider>
      )}

      <Toaster position="top-center" duration={4000} closeButton />
    </>
  );
}

export default App;
