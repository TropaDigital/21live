import React from 'react';

import {
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Tooltip,
  Area,
} from "recharts";

import { Container } from "./styles";

const getIntroOfPage = (label: any) => {
  if (label === 'Page A') {
    return "Page A is about men's clothing";
  }
  if (label === 'Page B') {
    return "Page B is about women's dress";
  }
  if (label === 'Page C') {
    return "Page C is about women's bag";
  }
  if (label === 'Page D') {
    return 'Page D is about household goods';
  }
  if (label === 'Page E') {
    return 'Page E is about food';
  }
  if (label === 'Page F') {
    return 'Page F is about baby food';
  }
  return '';
};


const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
        <p className="intro">{getIntroOfPage(label)}</p>
        <p className="desc">Anything you want can be displayed here.</p>
      </div>
    );
  } return null
}

const AreaCharts = () => {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      am: 3400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      am: 2310,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      am: 5890,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      am: 6900,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      am: 1881,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      am: 2800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 1490,
      pv: 2300,
      am: 4300,
      amt: 1100,
    },
  ];
  return (
    <Container>
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <AreaChart
          data={data}
          margin={{
            top: 20,
            right: 10,
            left: 0,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#e431ff" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#e431ff" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8f44fd" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8f44fd" stopOpacity={0} />
            </linearGradient>

            <linearGradient id="colorAm" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#53B5DD" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#53B5DD" stopOpacity={0} />
            </linearGradient>
          </defs>
          {/* <XAxis axisLine={false} tickLine={false} dataKey="name" /> */}
          {/* <YAxis axisLine={false} tickLine={false}  /> */}
          <CartesianGrid
            vertical={false}
            horizontal={false}
            stroke="#222222"
            strokeDasharray="3 3"
          />
          <Tooltip 
            // content={<CustomTooltip />}
          />

          <Area
            type="monotone"
            dataKey="uv"
            stroke={"0"}
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          <Area
            type="monotone"
            dataKey="pv"
            stroke={"0"}
            fillOpacity={1}
            fill="url(#colorPv)"
          />

          <Area
            type="monotone"
            dataKey="am"
            stroke={"0"}
            fillOpacity={1}
            fill="url(#colorAm)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default AreaCharts;
