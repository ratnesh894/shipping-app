import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.header`
  background-color: #00509d; /* Dark Blue */
  color: #FFFFFF; /* White */
  padding: 5px 0px 5px 0px;
  display: flex;
  height: 40px;
  justify-content: center;
  align-items: center;
  width: 100%;
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
    <Title>CII Dashboard</Title>
    {/* <Nav>
      <a href="#home">Home</a>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
    </Nav> */}
  </Wrapper>
);

export default Header;
