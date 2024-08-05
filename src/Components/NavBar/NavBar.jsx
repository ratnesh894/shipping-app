import React from "react";
import styled from "styled-components";

const NavbarContainer = styled.div`
  width: 20%;
  background-color: #333;
  color: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 10px;
  position: fixed;
`;

const NavLink = styled.div`
  padding: 10px 0;
  cursor: pointer;
  &:hover {
    background-color: #555;
  }
`;

function Navbar({ onSectionClick }) {
  return (
    <NavbarContainer>
      <NavLink onClick={() => onSectionClick("section1")}>Section 1</NavLink>
      <NavLink onClick={() => onSectionClick("section2")}>Section 2</NavLink>
      <NavLink onClick={() => onSectionClick("section3")}>Final CII</NavLink>
    </NavbarContainer>
  );
}

export default Navbar;
