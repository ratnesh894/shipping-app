import React, { useState } from "react";
import styled, {keyframes} from "styled-components";
import {
  getCo2Value,
  getTransportWork,
  getCo2Section1,
  getDistanceVal,
  getSelectedShip,
  getRequiredCII,
} from "../../utility/sharedState";
import data from '../../data/onboardingSheet.json'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  padding: 12px;
  margin: 0 0 20px 0;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
  background-color: #f9f9f9;
`;

const HeadingSection = styled.div`
  width: 100%;
  background: #4caf50; /* Green background */
  color: white; /* White text */
  padding: 10px 0; /* Padding for top and bottom */
  border-radius: 15px 15px 0 0; /* Rounded corners at the top */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Shadow effect */
  text-align: center; /* Center the text */
`;

const Heading = styled.h2`
  font-family: "Open Sans", sans-serif;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 10px;
  margin-top: 5px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 600;
  font-family: "Open Sans", sans-serif;
  color: #333;
  margin-right: 10px;
  flex: 1;
  text-align: left;
  margin-bottom: 10px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`;

const RatingWrapper = styled.div`
  display: flex;
  flex-direction:column;
  align-items: center;
  margin-top: 20px;
`;

const Subheading = styled.span`
  font-family: "Open Sans", sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  margin-top: 5px;
  text-align:center;
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.2);
  }
  70% {
    box-shadow: 0 0 15px 10px rgba(0, 0, 0, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
`;

const Rating = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 48px;
  font-weight: bold;
  color: #fff;
  border-radius: 15px;
  margin-right: 10px;
  background: ${({ rating }) => {
    switch (rating) {
      case 'A':
        return 'linear-gradient(45deg, #4caf50, #81c784)';
      case 'B':
        return 'linear-gradient(45deg, #f44336, #e57373)';
      case 'C':
        return 'linear-gradient(45deg, #ff9800, #ffb74d)';
      case 'D':
        return 'orange';
      case 'E':
        return 'red';
      default:
        return 'linear-gradient(45deg, #ccc, #eee)';
    }
    
  }};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 0 15px rgba(0, 0, 0, 0.1);
  animation: ${pulse} 2s infinite;
`;

const FinalCII = () => {
  const co2Value = getCo2Value();
  const tranPortWorkValue = getTransportWork();
  const co2Section1Value = getCo2Section1();
  const distance = getDistanceVal();
  const selectedShip = getSelectedShip()
  const requiredCII = getRequiredCII()

  const shipData = data['Onboarding Sheet'].find(ship => ship['Vessel Name'] === selectedShip);
  const d1Value = shipData ? shipData['d1'] : null;
  const d2Value = shipData ? shipData['d2'] : null;
  const d3Value = shipData ? shipData['d3'] : null;
  const d4Value = shipData ? shipData['d4'] : null;
  
  const limitA = requiredCII * d1Value;
  const limitB  = requiredCII * d2Value;
  const limitC = requiredCII * d3Value;
  const limitD = requiredCII * d4Value;
  

  console.log(co2Value);
  console.log(co2Section1Value);
  console.log(tranPortWorkValue);
  console.log(distance);
  
  
  
  const totalCo2Mt = parseFloat(co2Value) + parseFloat(co2Section1Value);
  console.log(totalCo2Mt);
  
  const totalTansPortWk = parseFloat(tranPortWorkValue) + parseFloat(distance);
  const attainedCII =
    (parseFloat(totalCo2Mt) * 1000000) / parseFloat(totalTansPortWk);
    console.log(attainedCII);
    

 const generateRating = () => {
    let rating;
    if(attainedCII <= limitA) {
      rating = 'A'
    } else if ((limitA <= attainedCII) && (attainedCII < limitB) ){
      rating = 'B'
    } else if((limitB <= attainedCII) && (attainedCII < limitC) ) {
      rating = 'C'
    } else if((limitC <= attainedCII) && (attainedCII < limitD) ) {
      rating = 'D'
    } else if (limitD <= attainedCII) {
      rating = 'E'
    }
    return rating;
  }

  const rating  = generateRating()
  

  return (
    <Wrapper>
      <HeadingSection>
        <Heading>Output - Predicted CII</Heading>
      </HeadingSection>
      <Container>
        <Label>Total CO2(MT):{totalCo2Mt}</Label>
        <Label>Total Transport Work:{totalTansPortWk}</Label>
        <Label>Attained CII:{attainedCII}</Label>
        <RatingWrapper>
        <Subheading>Rating</Subheading>
        <div style={{flexDirection:'row',display:'flex'}}>
        <Rating rating={rating}>{rating}</Rating>
        </div>
      </RatingWrapper>
      </Container>
    </Wrapper>
  );
};

export default FinalCII;
