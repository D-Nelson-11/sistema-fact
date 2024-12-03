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
import Usuarios from "./pages/Usuarios/Usuario";
import Bitacora from "./pages/Bitacora/Bitacora";
import { AllowRoute } from "./AllowRoute";
import Error from "./pages/Error";
const Nav = styled.div`
  background: ${colors.themeColor};
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: sticky; /* Hace la barra sticky */
  top: 0; /* Se adhiere a la parte superior */
  z-index: 1000; /* Se mantiene sobre otros elementos */
`;

const NavIcon = styled(Link)`
  margin-right: 2rem; /* Mover el botón de apertura a la derecha */
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: ${colors.themeColor};
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 20;
  right: 0; /* Mover barra a la derecha */
  transition: 0.6s;
  z-index: 10;
  transform: ${({ sidebar }) =>
    sidebar ? "translateX(0)" : "translateX(100%)"}; /* Ocultar desde la derecha */
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const MainContent = styled.div`
  margin-right: ${({ sidebar }) => (sidebar ? "250px" : "0")}; /* Margen derecho */
  transition: margin-right 0.6s;
  padding: 20px;
  background: #f1f1f1;
  min-height: 90vh;
`;
function App() {
  const [sidebar, setSidebar] = useState(true);
  const location = useLocation();
  const showSidebar = () => setSidebar(!sidebar);
  const { logout, user } = useAppContext();
  // document.addEventListener('contextmenu', (event) => event.preventDefault());


  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <>
      {location.pathname === "/" ? (
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
      ) : (
        <IconContext.Provider value={{ color: "#fff" }}>
          <Nav className="d-flex justify-content-between">
            {/* <NavIcon to="#" onClick={showSidebar}>
              <FaIcons.FaBars fontSize={"25px"} />
            </NavIcon> */}
            <div className="me-5">
              <Link
              className="text-white p-2"
                onClick={() => {
                  logout();
                }}>
                Cerrar Sesión
              </Link>
            </div>
          </Nav>
          <SidebarNav sidebar={sidebar}>
            <SidebarWrap>
              {/* <NavIcon to="#" onClick={showSidebar}>
                <AiIcons.AiOutlineClose fontSize={"25px"} />
              </NavIcon> */}
              {SidebarData.filter(
                (item) =>
                  user &&
                  user[1]?.some((permiso) => permiso.IdObjeto === item.IdObjeto)
              ).map((item, index) => {
                return <SubMenu item={item} key={index} />;
              })}
            </SidebarWrap>
          </SidebarNav>
          <MainContent sidebar={sidebar}>
            <Routes>
              <Route element={<ProtectedRoutes />}>
                <Route
                  path="/Inventario"
                  element={
                    <AllowRoute
                      TienePermiso={
                        user &&
                        user[1]?.some((permiso) => permiso.IdObjeto == 2)
                      }>
                      <Inventario />
                    </AllowRoute>
                  }
                />
                <Route
                  path="/factura"
                  element={
                    <AllowRoute
                      TienePermiso={
                        user &&
                        user[1]?.some((permiso) => permiso.IdObjeto == 3)
                      }>
                      <Factura />
                    </AllowRoute>
                  }
                />
                <Route
                  path="/parametros"
                  element={
                    <AllowRoute
                      TienePermiso={
                        user &&
                        user[1]?.some((permiso) => permiso.IdObjeto == 1)
                      }>
                      <Parametros />
                    </AllowRoute>
                  }
                />
                <Route
                  path="/Roles"
                  element={
                    <AllowRoute
                      TienePermiso={
                        user &&
                        user[1]?.some((permiso) => permiso.IdObjeto == 5)
                      }>
                      <Rol />
                    </AllowRoute>
                  }
                />
                <Route
                  path="/Permisos"
                  element={
                    <AllowRoute
                      TienePermiso={
                        user &&
                        user[1]?.some((permiso) => permiso.IdObjeto == 4)
                      }>
                      <Permisos />
                    </AllowRoute>
                  }
                />
                <Route
                  path="/Usuarios"
                  element={
                    <AllowRoute
                      TienePermiso={
                        user &&
                        user[1]?.some((permiso) => permiso.IdObjeto == 6)
                      }>
                      <Usuarios />
                    </AllowRoute>
                  }
                />
                <Route
                  path="/Bitacora"
                  element={
                    <AllowRoute
                      TienePermiso={
                        user &&
                        user[1]?.some((permiso) => permiso.IdObjeto == 7)
                      }>
                      <Bitacora />
                    </AllowRoute>
                  }
                />
                <Route path="/error" element={<Error/>}/>
              </Route>
            </Routes>
          </MainContent>
        </IconContext.Provider>
      )}

      <Toaster
        position="top-center"
        duration={4000}
        closeButton
        toastOptions={{
          style: {
            fontSize: "15px",
          },
        }}
      />
    </>
  );
}

export default App;
