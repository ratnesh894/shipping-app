// sharedState.js
let selectedShip = null;
let selectedSize = null;
let co2Value = null;
let transportWork = null;
let co2Section1 =  null;
let distance = null;
let reqCII = null;

export const setSelectedShip = (ship) => {
  selectedShip = ship;
};

export const getSelectedShip = () => {
  return selectedShip;
};

export const setSelectedSize = (size) => {
  selectedSize = size;
};

export const getSelectedSize = () => {
  return selectedSize;
};

export const setCo2 = (val) => {
  co2Value = val
}

export const getCo2Value = () => {
  return co2Value;
}

export const setTansportWork = (val) => {
  transportWork = val
}

export const getTransportWork = () => {
  return transportWork;
}

export const setCo2Section1 = (val) => {
  co2Section1 = val
}

export const getCo2Section1 = () => {
  return co2Section1;
}

export const setDistanceVal = (val) => {
  distance = val
}

export const getDistanceVal = () => {
  return distance;
}

export const setRequiredCII = (val) => {
  reqCII = val;
}

export const getRequiredCII = () => {
  return reqCII
}
