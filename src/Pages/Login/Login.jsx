import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  background: rgb(34, 193, 195);
  background: linear-gradient(
    135deg,
    rgba(34, 193, 195, 1) 0%,
    rgba(253, 187, 45, 1) 100%
  );
  font-family: "work sans";
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  height: auto;

  & > span:first-child {
    text-align: center;
    font-family: "open sans", sans-serif;
    padding: 2rem 0;
    margin: 0;
    font-size: 2rem;
  }
`;

const Label = styled.span`
  font-family: "open sans", sans-serif;
  color: grey;
`;

const InputField = styled.div`
  text-align: left;
  margin: 60px 0px 10px 5px;
  display: flex;
  flex-direction: column;

  input {
    box-sizing: border-box;
    border: none;
    font-size: 1.3rem;
    padding-left: 1.5rem;
    padding-bottom: 1rem;
    box-shadow: inset 0px -3px 0px 0px rgba(187, 187, 187, 0.2);
    transition: box-shadow 0.2s ease-in;
  }
`;

function Login() {
  return (
    <Wrapper>
      <LoginContainer>
        <span>Login</span>
        <InputField>
          <Label>Username</Label>
          <input type="text"></input>
          <Label>Password</Label>
          <input type="text"></input>
        </InputField>
      </LoginContainer>
    </Wrapper>
  );
}

export default Login;
