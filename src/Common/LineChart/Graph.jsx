import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";
import { fueltable } from "../../data/fuelTable";
import { findMEConsBallast, findMEConsLaden } from "../../utility/Calculations";
import { getMainEngineCons } from "../../utility/sharedState";

const consumption = getMainEngineCons();
const percentage = 100 + consumption;

const data = [
  {
    speed: "8",
    ballastSpeed: (percentage * findMEConsBallast(fueltable, 8)) / 100,
    ladenSpeed: (percentage * findMEConsLaden(fueltable, 8)) / 100,
  },
  {
    speed: "8.5",
    ballastSpeed: (percentage * findMEConsBallast(fueltable, 8.5)) / 100,
    ladenSpeed: (percentage * findMEConsLaden(fueltable, 8.5)) / 100,
  },
  {
    speed: "9",
    ballastSpeed: (percentage * findMEConsBallast(fueltable, 9)) / 100,
    ladenSpeed: (percentage * findMEConsLaden(fueltable, 9)) / 100,
  },
  {
    speed: "9.5",
    ballastSpeed: (percentage * findMEConsBallast(fueltable, 9.5)) / 100,
    ladenSpeed: (percentage * findMEConsLaden(fueltable, 9.5)) / 100,
  },
  {
    speed: "10",
    ballastSpeed: (percentage * findMEConsBallast(fueltable, 10)) / 100,
    ladenSpeed: (percentage * findMEConsLaden(fueltable, 10)) / 100,
  },
  {
    speed: "10.5",
    ballastSpeed: (percentage * findMEConsBallast(fueltable, 10.5)) / 100,
    ladenSpeed: (percentage * findMEConsLaden(fueltable, 10.5)) / 100,
  },
  {
    speed: "11",
    ballastSpeed: (percentage * findMEConsBallast(fueltable, 11)) / 100,
    ladenSpeed: (percentage * findMEConsLaden(fueltable, 11)) / 100,
  },
  {
    speed: "11.5",
    ballastSpeed: (percentage * findMEConsBallast(fueltable, 11.5)) / 100,
    ladenSpeed: (percentage * findMEConsLaden(fueltable, 11.5)) / 100,
  },
  {
    speed: "12",
    ballastSpeed: (percentage * findMEConsBallast(fueltable, 12)) / 100,
    ladenSpeed: (percentage * findMEConsLaden(fueltable, 12)) / 100,
  },
  {
    speed: "12.5",
    ballastSpeed: (percentage * findMEConsBallast(fueltable, 12.5)) / 100,
    ladenSpeed: (percentage * findMEConsLaden(fueltable, 12.5)) / 100,
  },
  {
    speed: "13",
    ballastSpeed: (percentage * findMEConsBallast(fueltable, 13)) / 100,
    ladenSpeed: (percentage * findMEConsLaden(fueltable, 13)) / 100,
  },
  {
    speed: "13.5",
    ballastSpeed: (percentage * findMEConsBallast(fueltable, 13.5)) / 100,
    ladenSpeed: (percentage * findMEConsLaden(fueltable, 13.5)) / 100,
  },
  {
    speed: "14",
    ballastSpeed: (percentage * findMEConsBallast(fueltable, 14)) / 100,
    ladenSpeed: (percentage * findMEConsLaden(fueltable, 14)) / 100,
  },
];

const SpeedLineGraph = () => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="speed">
          <Label value="Speed" offset={-5} position="insideBottom" />
        </XAxis>
        <YAxis>
          <Label
            value="Consumption"
            angle={-90}
            offset={20}
            dy={25}
            position="insideLeft"
          />
        </YAxis>
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="ballastSpeed"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="ladenSpeed" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SpeedLineGraph;