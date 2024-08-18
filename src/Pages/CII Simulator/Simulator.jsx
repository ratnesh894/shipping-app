import React, { useState, useRef } from "react";
import styled from "styled-components";
import Header from "../../Components/Header";
import Section1 from "../../Components/Section1/Section1";
import Section2 from "../../Components/Section2/Section2";
import FinalCII from "../../Components/Section3/Section3";

const Container = styled.div`
  margin: 20px;
  oveflow-y: scroll;
  display: flex;
  flex-direction: row;
  position: relative;
  gap: 20px;
`;

// const Navbar = styled.div`
//   width: 20%;
//   position: fixed;
//   background-color:#f9f9f9;
//   padding: 10px;
//   /* height: min-content; */
//   box-shadow: 2px 0 5px rgba(0,0,0,0.1); /* Subtle shadow for separation */
// `;

const NavbarIcon = styled.div`
  width: 40px;
  height: 40px;
  background-color: #2c3e50;
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
  width: 15%;
  height: 100%;
  background-color: #00509d;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  transition: width 0.3s, padding 0.3s;
  overflow: hidden;
  border-radius: 20px;
  z-index: 999;
  position: fixed;
  top: 58px;
  left: 15px;
`;

const MainContent = styled.div`
  /*  flex: 1; */
  display: flex;
  flex-direction: column;
  align-items: center; /* Center horizontally */
  justify-content: center;
  margin-left: 280px;
  transition: margin-left 0.3s;
  margin-top: 10px;
  width: 85%;
`;

const SectionContainer = styled.div`
  width: 100%;
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
  width: 30%;
  height: 50px;
  background: #66cdaa;
  display: flex;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  margin-top: auto;
  margin: 10px 0px 20px 0px;
  color: white;
  font-size: 18px;
  font-family: "Roboto", sans-serif;
  cursor: pointer;
`;

const NavItem = styled.div`
  color: ${({ isActive }) =>
    isActive ? "#000" : "#fff"}; /* Change text color based on active state */
  background-color: ${({ isActive }) =>
    isActive
      ? "#fff"
      : "transparent"}; /* Change background to white if active */
  padding: 15px 10px;
  text-align: center;
  width: 80%;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  font-size: 1.2em;
  transition: background-color 0.3s;
  margin-top: 40px;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  border: 1px solid #ddd;
  &:hover {
    background-color: #ddd;
  }
`;

function NavbarComponent({ onSectionClick, activeSection }) {
  return (
    <Navbar>
      {/*  <h2>Navigation</h2> */}
      <NavItem
        isActive={activeSection === "section1"}
        onClick={() => onSectionClick("section1")}
      >
        Current CII
      </NavItem>
      <NavItem
        isActive={activeSection === "section2"}
        onClick={() => onSectionClick("section2")}
      >
        Remaining Days Profile
      </NavItem>
      <NavItem
        isActive={activeSection === "section3"}
        onClick={() => onSectionClick("section3")}
      >
        Final CII
      </NavItem>
    </Navbar>
  );
}

function CIISimulator() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSimulate, setSImulate] = useState(0);
  const [activeSection, setActiveSection] = useState("section1");

  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const finalCIIRef = useRef(null);

  const handleSectionClick = (section) => {
    setActiveSection(section);

    if (section === "section1") {
      section1Ref.current.scrollIntoView({ behavior: "smooth" });
    } else if (section === "section2") {
      section2Ref.current.scrollIntoView({ behavior: "smooth" });
    } else if (section === "section3") {
      finalCIIRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSimulate = () => {
    setSImulate((prev) => prev + 1);

    finalCIIRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      style={{
        background: "#ECE8FF",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <Container>
        <NavbarComponent
          activeSection={activeSection}
          onSectionClick={handleSectionClick}
        />
        <MainContent>
          <SectionContainer ref={section1Ref}>
            <Section1 />
          </SectionContainer>

          <SectionContainer ref={section2Ref}>
            <Section2 />
          </SectionContainer>

          <Button onClick={handleSimulate}>Simulate</Button>
          <SectionContainer ref={finalCIIRef}>
            <FinalCII simulate={isSimulate} />
          </SectionContainer>
        </MainContent>
      </Container>
    </div>
  );
}

export default CIISimulator;
