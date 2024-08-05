import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.header`
  background-color: #2C3E50; /* Dark Blue */
  color: #FFFFFF; /* White */
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0;
  text-align: center;
`;

const Nav = styled.nav`
  a {
    color: #3498DB; /* Light Blue */
    margin-left: 1rem;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Header = () => (
  <Wrapper>
    <Title>CII Simulator</Title>
    {/* <Nav>
      <a href="#home">Home</a>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
    </Nav> */}
  </Wrapper>
);

export default Header;
