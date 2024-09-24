import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SidebarLink = styled(Link)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    background: #252831;
    border-left: 4px solid #632ce4;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  background: #414757;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 18px;
  transition: background 0.3s ease, color 0.3s ease;

  &:hover {
    background: #632ce4;
    cursor: pointer;
  }
`;

const DropdownContainer = styled.div.attrs(({ isOpen }) => ({
  // Aquí podemos evitar que `isOpen` se pase al DOM
  isOpen: undefined,
}))`
  max-height: ${({ isOpen }) => (isOpen ? "500px" : "0")};
  overflow: hidden;
  transition: max-height 0.5s ease;
`;

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <SidebarLink to={item.path} onClick={item.subNav && showSubnav}>
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>
      <DropdownContainer isOpen={subnav}>
        {item.subNav &&
          item.subNav.map((subItem, index) => {
            return (
              <DropdownLink to={subItem.path} key={index}>
                {subItem.icon}
                <SidebarLabel>{subItem.title}</SidebarLabel>
              </DropdownLink>
            );
          })}
      </DropdownContainer>
    </>
  );
};

export default SubMenu;
