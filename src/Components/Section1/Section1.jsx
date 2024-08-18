import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import data from "../../data/onboardingSheet.json";
import {
  setSelectedShip,
  setSelectedSize,
  setCo2Section1,
  setDistanceVal,
  setRequiredCII,
  setRemainingDays,
  setRating,
  setAttainedCII,
} from "../../utility/sharedState";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  padding: 12px;
  margin: 0 0 20px 0;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  border: 1px solid #ddd;
  background: #f8f8f8;
`;

const Heading = styled.h2`
  font-family: "Roboto", sans-serif;
  font-size: 1.2em;
  font-weight: 800;
  color: #00509d; /* Subtle text color */
  margin-bottom: 20px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-start;
  gap: 10px;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Two columns */
  grid-template-rows: repeat(3, auto); /* Three rows */
`;

/* const Dropdown = styled.select`
  padding: 5px;
  margin-top: 0px;
  width: 52%;
  border: 1px solid #ccc;
  border-radius: 5px;
`; */

const Dropdown = styled.select`
  padding: 10px;
  margin-top: 5px;
  width: 58%;
  border: 1px solid #ccc;
  border-radius: 15px;
  background-color: #ece8ff;
  transition: border-color 0.2s;
  text-align: center;

  &:focus {
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
    outline: none;
  }
`;

const Option = styled.option`
  padding: 10px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
  font-family: "Roboto", sans-serif;
  color: #152737;
  margin-bottom: 5px;
  flex: 1;
  text-align: right;
`;

const Input = styled.input`
  padding: 10px;
  width: 50%;
  border: 1px solid #ccc;
  border-radius: 15px;
  background-color: #ece8ff;
  transition: border-color 0.2s;
  text-align: center;

  &:focus {
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
    outline: none;
  }
`;

const DisabledInput = styled(Input)`
  background-color: #f0f0f0; /* Light gray background */
  color: #666; /* Gray text color */
  cursor: not-allowed; /* Change cursor to indicate it's non-editable */
  pointer-events: none; /* Disable interaction */
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const RatingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fffff;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  max-height: 300px;
  overflow-y: auto;
  padding: 20px;
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
      case "A":
        return "linear-gradient(45deg, #4caf50, #81c784)";
      case "B":
        return "linear-gradient(45deg, #f44336, #e57373)";
      case "C":
        return "linear-gradient(45deg, #ff9800, #ffb74d)";
      case "D":
        return "linear-gradient(45deg, #ffeb3b, #fff176)";
      case "E":
        return "linear-gradient(45deg, #9e9e9e, #bdbdbd)";
      default:
        return "linear-gradient(45deg, #ccc, #eee)";
    }
  }};
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2), 0 0 15px rgba(0, 0, 0, 0.1);
  animation: ${pulse} 2s infinite;
`;
const Subheading = styled.span`
  font-family: "Open Sans", sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #ffff;
  text-align: center;
  padding: 0px;
`;

const HeadingSection = styled.div`
  width: 100%;
  background: #00509d;
  color: white; /* White text */
  padding: 8px 0; /* Padding for top and bottom */
  border-radius: 15px 15px 0 0; /* Rounded corners at the top */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Shadow effect */
  text-align: center; /* Center the text */
  margin-bottom: 20px;
`;

const Subheading1 = styled.span`
  font-family: "Open Sans", sans-serif;
  font-size: 20px;
  font-weight: 500;
  color: #00509d;
  margin-bottom: 0px;
  margin-top: 5px;
  text-align: center;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`;

const DivWrapper = styled.div`
  width: 50%;
  padding: 0 20px;
  border: 1px solid #d3d3d3;
  border-radius: 12px;
  background-color: #fffff;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
  max-height: 350px;
  overflow-y: auto;
  padding: 20px;
  margin-top: 10px;
`;

const IndicatorWrapper = styled.div`
  width: 80%;
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RatingText = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #333;
`;

const Section1 = () => {
  const options = data["Onboarding Sheet"].map((item, index) => ({
    id: index,
    name: item["Vessel Name"],
  }));

  const yearOption = [
    {
      id: "2020",
      value: "2020",
    },
    {
      id: "2021",
      value: "2021",
    },
    {
      id: "2022",
      value: "2022",
    },
    {
      id: "2023",
      value: "2023",
    },
    {
      id: "2024",
      value: "2024",
    },
    {
      id: "2025",
      value: "2025",
    },
    {
      id: "2026",
      value: "2026",
    },
  ];

  const [selectedOption, setSelectedOption] = useState(options[0].id);
  const [selectedData, setSelectedData] = useState(data["Onboarding Sheet"][0]);
  const [selectedYear, setSelectedYear] = useState("");
  const [correlationFactor, setCorrelationFactor] = useState("");
  const [startDate, setStarDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [futureReferenceDate, setFutureReferenceDate] = useState("");
  /* const [requiredCII,setRequireCII] = useState('') */
  const [co2, setCo2] = useState(null);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    setSelectedData(data["Onboarding Sheet"][selectedOption]);
    setSelectedShip(options[selectedOption].name);
    setSelectedSize(options[selectedOption].Size);
  }, [selectedOption]);

  useEffect(() => {
    const updateCorrelationFactor = (year) => {
      switch (year) {
        case "2020":
          setCorrelationFactor("1");
          break;
        case "2021":
          setCorrelationFactor("2");
          break;
        case "2022":
          setCorrelationFactor("3");
          break;
        case "2023":
          setCorrelationFactor("5");
          break;
        case "2024":
          setCorrelationFactor("7");
          break;
        case "2025":
          setCorrelationFactor("9");
          break;
        case "2026":
          setCorrelationFactor("11");
          break;
        default:
          setCorrelationFactor("");
      }
    };

    updateCorrelationFactor(selectedYear);
  }, [selectedYear]);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const formatDate = (date = "") => {
    try {
      let dateString = date.split("-");
      return `${dateString[2]}/${dateString[1]}/${dateString[0]}`;
    } catch (err) {
      console.log("hide");
      return "";
    }
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const calculateDaysDifference = (date1, date2) => {
    // Parse the dates
    const startDate = new Date(date1);
    const endDate = new Date(date2);

    // Get the difference in milliseconds
    const differenceInTime = endDate - startDate;

    // Convert milliseconds to days
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    return Math.abs(differenceInDays); // Using Math.abs to ensure positive difference
  };

  const calculateRequiredCII = (D22, C7, E22, F9) => {
    const exponentialResult = Math.pow(C7, -E22);
    console.log(exponentialResult);
    const refCII = D22 * exponentialResult;
    const requiredCII = (refCII * (100 - F9)) / 100;

    return requiredCII;
  };
  const requiredCII = calculateRequiredCII(
    selectedData["a"],
    selectedData["Size"],
    selectedData["c"],
    correlationFactor
  );
  const remainingDays = calculateDaysDifference(futureReferenceDate, endDate); // Output: 27
  const attainedCII =
    parseFloat(co2 * 1000000) / (parseFloat(distance) * 49000);
  setRemainingDays(remainingDays);
  const shipData = data["Onboarding Sheet"][selectedOption];

  const d1Value = shipData ? shipData["d1"] : null;
  const d2Value = shipData ? shipData["d2"] : null;
  const d3Value = shipData ? shipData["d3"] : null;
  const d4Value = shipData ? shipData["d4"] : null;

  const limitA = requiredCII * d1Value;
  const limitB = requiredCII * d2Value;
  const limitC = requiredCII * d3Value;
  const limitD = requiredCII * d4Value;

  const generateRating = () => {
    let rating;
    if (attainedCII <= limitA) {
      rating = "A";
    } else if (limitA <= attainedCII && attainedCII < limitB) {
      rating = "B";
    } else if (limitB <= attainedCII && attainedCII < limitC) {
      rating = "C";
    } else if (limitC <= attainedCII && attainedCII < limitD) {
      rating = "D";
    } else if (limitD <= attainedCII) {
      rating = "E";
    }
    return rating;
  };

  const rating = generateRating();
  setRating(rating);
  setAttainedCII(attainedCII)

  setRequiredCII(requiredCII);
  setCo2Section1(co2);
  setDistanceVal(distance);

  return (
    <Wrapper>
      <Heading>Current CII</Heading>
      <ContentWrapper>
        <DivWrapper>
          <Subheading1>General</Subheading1>
          <Container>
            <FormGroup>
              <Label>Ship Name:</Label>
              <Dropdown value={selectedOption} onChange={handleChange}>
                {options.map((option) => (
                  <Option key={option.id} value={option.id}>
                    {option.name}
                  </Option>
                ))}
              </Dropdown>
            </FormGroup>
            <FormGroup>
              <Label>Size:</Label>
              <DisabledInput
                type="text"
                value={selectedData["Size"]}
                readOnly
              />
            </FormGroup>
            <FormGroup>
              <Label>Ship Class:</Label>
              <DisabledInput
                type="text"
                value={selectedData["Vessel Class"]}
                readOnly
              />
            </FormGroup>
            <FormGroup>
              <Label>Year of Measurement:</Label>
              <Dropdown value={selectedYear} onChange={handleYearChange}>
                {yearOption.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.value}
                  </Option>
                ))}
              </Dropdown>
            </FormGroup>
            <FormGroup>
              <Label>Correction Factor (%):</Label>
              <DisabledInput type="text" value={correlationFactor} readOnly />
            </FormGroup>
          </Container>
        </DivWrapper>
        <DivWrapper>
        <Subheading1>Current CII Data</Subheading1>
        <Container>
          <FormGroup>
            <Label>CII Data Start Date:</Label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStarDate(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>CII Data End Date:</Label>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Future Reference Date:</Label>
            <Input
              type="date"
              value={futureReferenceDate}
              onChange={(e) => setFutureReferenceDate(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Remaining Period (Days): </Label>
            <DisabledInput type="number" value={remainingDays} readOnly />
          </FormGroup>
          <FormGroup>
            <Label>CO2 (MT):</Label>
            <Input
              type="number"
              value={co2}
              onChange={(e) => setCo2(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Distance (NM):</Label>
            <Input
              type="number"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
            />
          </FormGroup>
        </Container>
        </DivWrapper>
      </ContentWrapper>
      <RatingWrapper>
        <HeadingSection>
          <Subheading>Rating </Subheading>
          {startDate && endDate && (
            <div>
              (as of {formatDate(startDate)} to {formatDate(endDate)})
            </div>
          )}
        </HeadingSection>
        <div style={{ flexDirection: "row", display: "flex" }}>
          <Rating rating={rating}>{rating}</Rating>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "10px",
            }}
          >
            <span>Required CII: {requiredCII.toFixed(2)}</span>
            <span>Attained CII: {attainedCII.toFixed(2)}</span>
          </div>
        </div>
      </RatingWrapper>
    </Wrapper>
  );
};

export default Section1;
