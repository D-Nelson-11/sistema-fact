import { Routes, Route } from "react-router-dom";
import "./public/App.css";
import Inventario from "./pages/Inventario";
import { Reports } from "./pages/Reports";
import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./components/Sidebar/SidebarData";
import SubMenu from "./components/Sidebar/SubMenu";
import { IconContext } from "react-icons/lib";
import { colors } from "./helpers/themes";
import Factura from "./pages/Factura/Factura";
import Parametros from "./pages/Parametros";

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
  background:  ${colors.themeColor};
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

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav>
          <NavIcon to="#" onClick={showSidebar}>
            <FaIcons.FaBars fontSize={"25px"} />
          </NavIcon>
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
            <Route path="/Inventario" element={<Inventario />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/factura" element={<Factura />} />
            <Route path="/parametros" element={<Parametros />} />

          </Routes>
        </MainContent>
      </IconContext.Provider>
    </>
  );
}

export default App;
