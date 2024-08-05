import React, { useState,useRef } from "react";
import styled from "styled-components";
import Header from "../../Components/Header";
import Section1 from "../../Components/Section1/Section1";
import Section2 from "../../Components/Section2/Section2";
import FinalCII from "../../Components/Section3/Section3";

const Container = styled.div`
  margin: 20px;
  oveflow-y: scroll;
  display: flex;
  `;


// const Navbar = styled.div`
//   width: 20%;
//   position: fixed;
//   background-color:#f9f9f9;
//   padding: 10px;
//   /* height: min-content; */
//   box-shadow: 2px 0 5px rgba(0,0,0,0.1); /* Subtle shadow for separation */
// `;

const Container1 = styled.div`
  width: 100%;
  margin-left: 15px;
`;
const NavbarIcon = styled.div`
  width: 40px;
  height: 40px;
  background-color: #2C3E50;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
  border-radius: 5px;
`;

const Navbar = styled.div`
  width: ${(props) => (props.isOpen ? "200px" : "0")};
  height: 100vh;
  background-color: #2C3E50;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${(props) => (props.isOpen ? "10px" : "0")};
  transition: width 0.3s, padding 0.3s;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center horizontally */
  justify-content: center;
  overflow-y: auto;
  margin-left: ${(props) => (props.isOpen ? "220px" : "60px")}; /* Adjust margin based on navbar state */
  transition: margin-left 0.3s;
  margin-top: 10px;
  `;


// const MainContent = styled.div`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   margin: 10px;
// `;

const Button = styled.div`
  width: 50%;
  height: 50px;
  background: #66cdaa;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: auto;
  margin: 10px 0px 20px 0px;
  color: white;
  font-size: 18px;
  font-family: Open-sans;
  cursor: pointer;
`;

const NavLink = styled.div`
  padding: 10px 0;
  cursor: pointer;
  color: fff;
  &:hover {
    background-color: #fff;
  }
`;

/* const NavLink = styled.div`
  padding: 10px 0;
  cursor: pointer;
  color: #fff;
  text-align: center;
  width: 100%;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #555;
  }
`; */

const NavItem = styled.div`
  color: #fff;
  padding: 15px 10px;
  text-align: center;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 30px;
  &:hover {
    background-color: #444;
  }

  span {
    display: ${(props) => (props.isOpen ? "inline" : "none")};
  }
`;

function NavbarComponent({onSectionClick,isOpen}) {
  return (
    <Navbar isOpen = {isOpen}>
     {/*  <h2>Navigation</h2> */}
     <NavItem onClick={() => onSectionClick("section1")}>Section 1</NavItem>
      <NavItem onClick={() => onSectionClick("section2")}>Section 2</NavItem>
      <NavItem onClick={() => onSectionClick("section3")}>Final CII</NavItem>
    </Navbar>
  );
}


function CIISimulator() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSimulate,setSImulate] = useState(false)

  const handleSimulate = () => {
    setSImulate(!isSimulate);
  };

  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const finalCIIRef = useRef(null);

  const handleSectionClick = (section) => {
    if (section === "section1") {
      section1Ref.current.scrollIntoView({ behavior: "smooth" });
    } else if (section === "section2") {
      section2Ref.current.scrollIntoView({ behavior: "smooth" });
    } else if (section === "section3") {
      finalCIIRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Header />
      <Container>
      <NavbarIcon onClick={() => setIsOpen(!isOpen)}>
          ☰
        </NavbarIcon>
     <NavbarComponent onSectionClick={handleSectionClick} isOpen={isOpen}/>
      <MainContent isOpen={isOpen}>
        <Container1 ref = {section1Ref}>
        <Section1/>
        </Container1>
        
        <Container1 ref = {section2Ref}>
        <Section2  />
        </Container1>
        
        <Button onClick={handleSimulate}>Simulate</Button>
        {isSimulate && <FinalCII />}
        </MainContent>
      </Container>
    </>
  );
}

export default CIISimulator;
