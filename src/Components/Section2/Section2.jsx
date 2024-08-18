import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  getRemainingDays,
  getSelectedShip,
  getSelectedSize,
  setCo2,
  setTansportWork,
  setMainEngineCons
} from "../../utility/sharedState";
import {
  findMEConsLaden,
  findMEConsBallast,
  findAEConst,
  findBoilerConst,
} from "../../utility/Calculations";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import { fueltable } from "../../data/fuelTable";

const Wrapper = styled.div`
  /* display: flex;
  flex-direction: column; */
  align-items: center;
  width: 95%;
  padding: 12px;
  margin: 0 0 20px 0;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
  background: #f8f8f8;
`;

const Heading = styled.h2`
  font-weight: 800;
  font-family: "Roboto", sans-serif;
  font-size: 1.2em;
  color: #00509d;
  margin-bottom: 10px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  /* justify-content: flex-start; */
  gap: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 0 20px;
  border-radius: 12px;
  background-color: #fffff;
  border: 1px solid #d3d3d3;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
  max-height: 380px;
  overflow-y: auto;
  padding: 20px;
  margin-top: 20px;
`;

const Subheading = styled.span`
  font-family: "Open Sans", sans-serif;
  font-size: 20px;
  font-weight: 500;
  color: #00509d;
  margin-bottom: 10px;
  margin-top: 5px;
  text-align: center;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-height: 400px;
  overflow-y: auto;
`;

const Container2 = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Two columns */
  grid-template-rows: repeat(3, auto); /* Three rows */

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

const Dropdown = styled.select`
  padding: 10px;
  margin-top: 0px;
  width: 30%;
  border: 1px solid #ccc;
  border-radius: 15px;
  background-color: #ECE8FF;
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

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
  margin-left: 0px;
  /* background: red; */
`;

const TooltipWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const TotalSumSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 70px 0px 0px 10px;
  border: 2px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 0 10px rgba(21, 92, 180, 0.5);
  width: 100%;
`;

const GreenTick = styled.span`
  color: green;
  font-size: 24px;
`;

const RedCross = styled.span`
  color: red;
  font-size: 24px;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 16px;
  margin-left: 10px;
  width: 100%;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 400;
  margin-right: 10px;
  margin-top: 8px;
  margin-bottom: 5px;
  flex: 1;
  text-align: right;
  font-family: "Roboto", sans-serif;
  color: #152737;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 10px;
  width:50%;
  border: 1px solid #ccc;
  border-radius: 15px;
  background-color: #ECE8FF;
  transition: border-color 0.2s;
  text-align: center;

  &:focus {
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
    outline: none;
  }
`;

const Container1 = styled(Container)`
  width: 95%;
`;

const Section2 = () => {
  const generateSpeedOptions = (start, end, increment) => {
    const options = [];
    for (let i = start; i <= end; i += increment) {
      options.push({ id: i, value: `${i.toFixed(1)} knots` });
    }
    return options;
  };

  const speedOptions = generateSpeedOptions(8, 14, 0.5);

  /* const [selectedOption, setSelectedOption] = useState(options[0].id); */
  const [ladenSpeed, setLadenSpeed] = useState(speedOptions[0].id);
  const [seaBallastSpeed, setSeaBallastSpeed] = useState(speedOptions[0].is);
  const [seaManeuvringSpeed, setSeaManuveringSpeed] = useState(
    speedOptions[0].id
  );
  const [mainEngineConsumption, setMainEngineConsumption] = useState(null);
  const [seaLaden, setSeaLaden] = useState(0);
  const [seaBallast, setSeaBallast] = useState(0);
  const [anchor, setAnchor] = useState(0);
  const [loadPort, setLoadPort] = useState(0);
  const [dischargePort, setDischargePort] = useState(0);
  const [manuvering, setManuvering] = useState(0);
  const [exceeds100, setExceeds100] = useState(false);
  const [meConsLaden, setMeConsLaden] = useState(null);
  const [distancePercent, setDistancePercent] = useState(null);
  const [consumption, setConsumption] = useState(null);
  const [hfo, setHfo] = useState(0);
  const [lfo, setLfo] = useState(0);
  const [mgo, setMgo] = useState(0);
  const [mdo, setMdo] = useState(0);
  const [bioLfo, setBioLfo] = useState(0);
  const [bioMgo, setBioMgo] = useState(0);
  const [lpg, setLpg] = useState(0);
  const [lng, setLng] = useState(0);
  const [methanol, setMethanol] = useState(0);
  const [ethanol, setEthanol] = useState(0);

  const [totalFuelRatio, setTotalFuelRatio] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isOperationalError, setOperationalError] = useState(false);
  const [totalOperationalProfile, setTotalOperationalProfile] = useState(0);

  const handleLadenSpeedChange = (event) => {
    setLadenSpeed(parseFloat(event.target.value));
  };

  useEffect(() => {
    // Calculate total fuel ratio
    const totalRatio = [
      hfo,
      lfo,
      mgo,
      mdo,
      bioLfo,
      bioMgo,
      lpg,
      lng,
      methanol,
      ethanol,
    ]
      .map((val) => parseFloat(val) || 0)
      .reduce((acc, val) => acc + val, 0);

    setTotalFuelRatio(totalRatio);
    setIsError(totalRatio !== 100);
  }, [hfo, lfo, mgo, mdo, bioLfo, bioMgo, lpg, lng, methanol, ethanol]);

  useEffect(() => {
    // Calculate total fuel ratio
    const total = [
      seaLaden,
      seaBallast,
      anchor,
      loadPort,
      dischargePort,
      manuvering,
    ]
      .map((val) => parseFloat(val) || 0)
      .reduce((acc, val) => acc + val, 0);

    setTotalOperationalProfile(total);
    setOperationalError(total !== 100);
  }, [seaLaden, seaBallast, anchor, loadPort, dischargePort, manuvering]);

  const selectedShipName = getSelectedShip();
  const selectedShipSize = 49000;

  const remainingDays = getRemainingDays();
  const seaLadenRef = `${selectedShipName} ${ladenSpeed}`;
  const seaBallastRef = `${selectedShipName} ${ladenSpeed}`;
  const seaManeuvringRef = `${selectedShipName} ${seaManeuvringSpeed}`;

  const meConsLadenValue = findMEConsLaden(fueltable, ladenSpeed);
  const meConstBallastValue = findMEConsBallast(fueltable, seaBallastSpeed);
  const meConstManeuvering = findMEConsBallast(fueltable, seaManeuvringSpeed);

  const seaLadenConsPerDayME = meConsLadenValue
    ? (parseFloat(meConsLadenValue) *
        (100 + parseFloat(mainEngineConsumption))) /
      100
    : null;

  const seaBallastConsPerDayME = meConstBallastValue
    ? (parseFloat(meConstBallastValue) *
        (100 + parseFloat(mainEngineConsumption))) /
      100
    : null;
  const seaManeuveringConsPerDayME = meConstManeuvering
    ? (parseFloat(meConstManeuvering) *
        (100 + parseFloat(mainEngineConsumption))) /
      100
    : null;

  const seaAnchorConsPerDayME = 0.0;
  const loadPortConsPerDayME = 0.0;
  const dischargePortConsPerDayME = 0.0;

  const ladenConsPerDayAE = findAEConst(fueltable, ladenSpeed);
  const ballastConsPerDayAE = findAEConst(fueltable, seaBallastSpeed);
  const manuveringConstPerDayAE = findAEConst(fueltable, seaManeuvringSpeed);
  const ladenConsPerDayBoilder = findBoilerConst(fueltable, ladenSpeed);
  const ballastConsPerDayBoiler = findBoilerConst(fueltable, seaBallastSpeed);
  const maneuveringConsBoiler = findBoilerConst(fueltable, seaManeuvringSpeed);

  const totalConsSeaLadenME =
    (parseFloat(seaLadenConsPerDayME) *
      parseFloat(remainingDays) *
      parseFloat(seaLaden)) /
    100;
  const totalConsSeaBallastME =
    (parseFloat(seaBallastConsPerDayME) *
      parseFloat(remainingDays) *
      parseFloat(seaBallast)) /
    100;

  const totalConsAtAnchorME = 0;
  const totalConsAtLoadPortME = 0;
  const totalConsAtDischargeME = 0;
  const totalConsManuveringME =
    (parseFloat(seaManeuveringConsPerDayME) *
      parseFloat(remainingDays) *
      parseFloat(manuvering)) /
    100;

  const sumofME =
    parseFloat(totalConsSeaLadenME) +
    parseFloat(totalConsSeaBallastME) +
    parseFloat(totalConsAtAnchorME) +
    parseFloat(totalConsAtLoadPortME) +
    parseFloat(totalConsAtDischargeME) +
    parseFloat(totalConsManuveringME);

  const totalConsSeaLadenAE =
    (parseFloat(ladenConsPerDayAE) *
      parseFloat(remainingDays) *
      parseFloat(seaLaden)) /
    100;
  const totalConsSeaBallastAE =
    (parseFloat(ballastConsPerDayAE) *
      parseFloat(remainingDays) *
      parseFloat(seaBallast)) /
    100;
  const totalConsAtAnchorAE =
    (2.4 * parseFloat(remainingDays) * parseFloat(anchor)) / 100;
  const totalConsAtLoadPortAE =
    (4.0 * parseFloat(remainingDays) * parseFloat(loadPort)) / 100;
  const totalConsAtDischargeAE =
    (5.0 * parseFloat(remainingDays) * parseFloat(dischargePort)) / 100;
  const totalConsManuveringAE =
    (parseFloat(manuveringConstPerDayAE) *
      parseFloat(remainingDays) *
      parseFloat(manuvering)) /
    100;

  const sumofAE =
    parseFloat(totalConsSeaLadenAE) +
    parseFloat(totalConsSeaBallastAE) +
    parseFloat(totalConsAtAnchorAE) +
    parseFloat(totalConsAtLoadPortAE) +
    parseFloat(totalConsAtDischargeAE) +
    parseFloat(totalConsManuveringAE);

  const totalConsSeaLadenBoiler =
    (parseFloat(ladenConsPerDayBoilder) *
      parseFloat(remainingDays) *
      parseFloat(seaLaden)) /
    100;
  const totalConsSeaBallastBoiler =
    (parseFloat(ballastConsPerDayBoiler) *
      parseFloat(remainingDays) *
      parseFloat(seaBallast)) /
    100;
  const totalConsSeaAnchorBoiler =
    (2.7 * parseFloat(remainingDays) * parseFloat(anchor)) / 100;
  const totalConsSeaLoadPortBoiler =
    (2.7 * parseFloat(remainingDays) * parseFloat(loadPort)) / 100;
  const totalConsSeaDischargePortBoiler =
    (2.7 * parseFloat(remainingDays) * parseFloat(dischargePort)) / 100;
  const totalConsManuvringBoiler =
    (parseFloat(maneuveringConsBoiler) *
      parseFloat(remainingDays) *
      parseFloat(manuvering)) /
    100;

  const sumofBoiler =
    parseFloat(totalConsSeaLadenBoiler) +
    parseFloat(totalConsSeaBallastBoiler) +
    parseFloat(totalConsSeaAnchorBoiler) +
    parseFloat(totalConsSeaLoadPortBoiler) +
    parseFloat(totalConsSeaDischargePortBoiler) +
    parseFloat(totalConsManuvringBoiler);

  const totalConsSeaLadenOther =
    (0.9 * parseFloat(remainingDays) * parseFloat(seaLaden)) / 100;
  const totalConsSeaBallastOther =
    (0.9 * parseFloat(remainingDays) * parseFloat(seaBallast)) / 100;
  const totalConsSeaAnchorOther =
    (1.0 * parseFloat(remainingDays) * parseFloat(anchor)) / 100;
  const totalConsSeaLoadPortOther =
    (2.0 * parseFloat(remainingDays) * parseFloat(loadPort)) / 100;
  const totalConsSeaDischargePortOther =
    (4.0 * parseFloat(remainingDays) * parseFloat(dischargePort)) / 100;
  const totalConsManuvringOther =
    (0.9 * parseFloat(remainingDays) * parseFloat(manuvering)) / 100;

  const sumofOther =
    parseFloat(totalConsSeaLadenOther) +
    parseFloat(totalConsSeaBallastOther) +
    parseFloat(totalConsSeaLoadPortOther) +
    parseFloat(totalConsSeaAnchorOther) +
    parseFloat(totalConsSeaDischargePortOther) +
    parseFloat(totalConsManuvringOther);

  const distance =
    ((parseFloat(ladenSpeed) * parseFloat(seaLaden)) / 100) *
      parseFloat(remainingDays) *
      24 +
    ((parseFloat(seaBallastSpeed) * parseFloat(seaBallast)) / 100) *
      parseFloat(remainingDays) *
      24 +
    ((parseFloat(seaManeuvringSpeed) * parseFloat(manuvering)) / 100) *
      parseFloat(remainingDays) *
      24 *
      ((100 - distancePercent) / 100);

  /* console.log(distance); */
  const handleBallastSpeedChange = (event) => {
    setSeaBallastSpeed(parseFloat(event.target.value));
  };

  console.log(sumofME + sumofAE + sumofBoiler + sumofOther);

  const totalConsumption =
    (parseFloat(sumofME) +
      parseFloat(sumofAE) +
      parseFloat(sumofBoiler) +
      parseFloat(sumofOther)) *
    ((100 - consumption) / 100);

  console.log(totalConsumption);
  const CO2 =
    (parseFloat(hfo) / 100) * parseFloat(totalConsumption) * 3.114 +
    (parseFloat(lfo) / 100) * parseFloat(totalConsumption) * 3.151 +
    (parseFloat(mgo) / 100) * parseFloat(totalConsumption) * 3.206 +
    (parseFloat(mdo) / 100) * parseFloat(totalConsumption) * 3.206 +
    (parseFloat(bioLfo) / 100) * parseFloat(totalConsumption) * 2.7 +
    (parseFloat(bioMgo) / 100) * parseFloat(totalConsumption) * 2.5 +
    (parseFloat(lpg) / 100) * parseFloat(totalConsumption) * 3.0 +
    (parseFloat(lng) / 100) * parseFloat(totalConsumption) * 2.75 +
    (parseFloat(methanol) / 100) * parseFloat(totalConsumption) * 1.37 +
    (parseFloat(ethanol) / 100) * parseFloat(totalConsumption) * 1.91;

  setCo2(CO2);
  console.log(CO2);

  console.log(selectedShipSize);

  const tansportWorkWithCfs =
    parseFloat(selectedShipSize) * parseFloat(distance) * 1.0 * 1.0;
  console.log(tansportWorkWithCfs);

  setTansportWork(tansportWorkWithCfs);
  setMainEngineCons(mainEngineConsumption)
  const hadleManuveringSpeedChange = (event) => {
    setSeaManuveringSpeed(parseFloat(event.target.value));
  };

  return (
    <Wrapper>
      <Heading>Remaining Days Profile</Heading>
      <ContentWrapper>
        <Container>
          <Subheading>Speed Profile (knots)</Subheading>
          <FormGroup>
            <Label>Sea Laden:</Label>
            <Dropdown value={ladenSpeed} onChange={handleLadenSpeedChange}>
              {speedOptions.map((option) => (
                <Option key={option.id} value={option.id}>
                  {option.value}
                </Option>
              ))}
            </Dropdown>
          </FormGroup>
          <FormGroup>
            <Label>Sea Ballast:</Label>
            <Dropdown
              value={seaBallastSpeed}
              onChange={handleBallastSpeedChange}
            >
              {speedOptions.map((option) => (
                <Option key={option.id} value={option.id}>
                  {option.value}
                </Option>
              ))}
            </Dropdown>
          </FormGroup>
          <FormGroup>
            <Label>Sea Maneuvering:</Label>
            <Dropdown
              value={seaManeuvringSpeed}
              onChange={hadleManuveringSpeedChange}
            >
              {speedOptions.map((option) => (
                <Option key={option.id} value={option.id}>
                  {option.value}
                </Option>
              ))}
            </Dropdown>
          </FormGroup>
        </Container>
        <Container>
          <TooltipWrapper>
            <Subheading style={{ gap: "10px" }}>Fuel Ratio (%) </Subheading>
            <Tooltip
              title="Enter the percentage of each fuel type used. The total should sum up to 100%."
              arrow
            >
              <InfoIcon />
            </Tooltip>
          </TooltipWrapper>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{ display: "flex", flexDirection: "column", width: "30%",marginRight:'10px' }}
            >
              <TotalSumSection>
                <span>Total Sum:{totalFuelRatio}%</span>
                {isError ? <RedCross>✗</RedCross> : <GreenTick>✓</GreenTick>}
              </TotalSumSection>
              {isError && (
                <ErrorMessage>Total fuel ratio must be 100%.</ErrorMessage>
              )}
            </div>
            <FlexContainer>
              <FormGroup>
                <Label>HFO:</Label>
                <Input
                  type="number"
                  value={hfo}
                  onChange={(e) => setHfo(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>BIOLFO:</Label>
                <Input
                  type="number"
                  value={bioLfo}
                  onChange={(e) => setBioLfo(e.target.value)}
                />
              </FormGroup>
            
              <FormGroup>
                <Label>MDO:</Label>
                <Input
                  type="number"
                  value={mdo}
                  onChange={(e) => setMdo(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>LNG:</Label>
                <Input
                  type="number"
                  value={lng}
                  onChange={(e) => setLng(e.target.value)}
                />
              </FormGroup>
            </FlexContainer>
            <FlexContainer>
            <FormGroup>
                <Label>LFO:</Label>
                <Input
                  type="number"
                  value={lfo}
                  onChange={(e) => setLfo(e.target.value)}
                />
              </FormGroup>
            
              <FormGroup>
                <Label>BIOMGO:</Label>
                <Input
                  type="number"
                  value={bioMgo}
                  onChange={(e) => setBioMgo(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>LPG:</Label>
                <Input
                  type="number"
                  value={lpg}
                  onChange={(e) => setLpg(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
              <Label>Methanol:</Label>
              <Input
                type="number"
                value={methanol}
                onChange={(e) => setMethanol(e.target.value)}
              />
              </FormGroup>
            </FlexContainer>
            <FlexContainer>
            <FormGroup>
                <Label>MGO:</Label>
                <Input
                  type="number"
                  value={mgo}
                  onChange={(e) => setMgo(e.target.value)}
                />
              </FormGroup>
           
              <FormGroup>
                <Label>Ethanol:</Label>
                <Input
                  type="number"
                  value={ethanol}
                  onChange={(e) => setEthanol(e.target.value)}
                />
              </FormGroup>
            </FlexContainer>
          </div>
        </Container>
      </ContentWrapper>
      <ContentWrapper>
        <Container>
          <Subheading>Operational Profile (%)</Subheading>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{ display: "flex", flexDirection: "column", width: "25%" }}
            >
              <TotalSumSection>
                <span>Sum total:{totalOperationalProfile}%</span>
                {isOperationalError ? (
                  <RedCross>✗</RedCross>
                ) : (
                  <GreenTick>✓</GreenTick>
                )}
              </TotalSumSection>
              {isOperationalError && (
                <ErrorMessage>Sum total must be 100%.</ErrorMessage>
              )}
            </div>
            <FlexContainer>
              <FormGroup>
                <Label>Sea Laden:</Label>
                <Input
                  type="number"
                  value={seaLaden}
                  onChange={(e) => setSeaLaden(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Sea Ballast:</Label>
                <Input
                  type="number"
                  value={seaBallast}
                  onChange={(e) => setSeaBallast(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Anchor:</Label>
                <Input
                  type="number"
                  value={anchor}
                  onChange={(e) => setAnchor(e.target.value)}
                />
              </FormGroup>
            </FlexContainer>
            <FlexContainer>
              <FormGroup>
                <Label>Load Port:</Label>
                <Input
                  type="number"
                  value={loadPort}
                  onChange={(e) => setLoadPort(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Discharge Port:</Label>
                <Input
                  type="number"
                  value={dischargePort}
                  onChange={(e) => setDischargePort(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Maneuvering:</Label>
                <Input
                  type="number"
                  value={manuvering}
                  onChange={(e) => setManuvering(e.target.value)}
                />
              </FormGroup>
            </FlexContainer>
          </div>
        </Container>
        <Container>
          <Subheading>Estimate Exemption (%)</Subheading>
          <FormGroup>
            <Label>Distance:</Label>
            <Input style={{width:'30%'}}
              type="number"
              value={distancePercent}
              onChange={(e) => setDistancePercent(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Consumption:</Label>
            <Input style={{width:'30%'}}
              type="number"
              value={consumption}
              onChange={(e) => setConsumption(e.target.value)}
            />
          </FormGroup>
        </Container>
      </ContentWrapper>
      <Container1>
        <FormGroup>
          <Label style={{ marginTop: "5px" }}>
            Main Engine Excess Consumption from Baseline:
          </Label>
          <Input style={{width:'20%'}}
            type="number"
            value={mainEngineConsumption}
            onChange={(e) => setMainEngineConsumption(e.target.value)}
          />
        </FormGroup>
      </Container1>
    </Wrapper>
  );
};

export default Section2;
