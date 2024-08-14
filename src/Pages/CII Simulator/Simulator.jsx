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
  height: 50%;
  background-color: #f0f4f8;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  transition: width 0.3s, padding 0.3s;
  overflow: hidden;
  position: fixed;
  top: 5;
  left: 0;
  z-index: 999;
`;

const MainContent = styled.div`
  /*  flex: 1; */
  display: flex;
  flex-direction: column;
  align-items: center; /* Center horizontally */
  justify-content: center;
  margin-left: 220px;
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
  font-family: "Roboto", sans-serif;
  cursor: pointer;
`;

const NavItem = styled.div`
  color: #333;
  padding: 15px 10px;
  text-align: center;
  width: 100%;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
  font-size: 1.2em;
  transition: background-color 0.3s;
  margin-top: 30px;
  &:hover {
    background-color: #ddd;
  }
`;

function NavbarComponent({ onSectionClick }) {
  return (
    <Navbar>
      {/*  <h2>Navigation</h2> */}
      <NavItem onClick={() => onSectionClick("section1")}>Current CII</NavItem>
      <NavItem onClick={() => onSectionClick("section2")}>
        Remaining Days Profile
      </NavItem>
      <NavItem onClick={() => onSectionClick("section3")}>Final CII</NavItem>
    </Navbar>
  );
}

function CIISimulator() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSimulate, setSImulate] = useState(0);

  const handleSimulate = () => {
    setSImulate((prev) => prev + 1);
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
        <NavbarComponent onSectionClick={handleSectionClick} />
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
    </>
  );
}

export default CIISimulator;
