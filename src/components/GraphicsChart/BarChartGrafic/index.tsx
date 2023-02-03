import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  BarChart,
  LabelList,
} from 'recharts';

import { Container } from './styles';

interface Props {
  isVertical?: boolean;
}

const BarChartGrafic = ({ isVertical }: Props) => {
  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
      fill: '#8269B2',
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
      fill: '#93E088',
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 3800,
      amt: 2290,
      fill: '#37C3FF',
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
      fill: '#FFA981',
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
      fill: '#F92B60',
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
      fill: '#FFD66E',
    },
  ];

  return (
    <Container>
      <div className="sectionInfo">
        <span>Progress</span>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        {/* <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 18,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          
        >
          <CartesianGrid
            vertical={false}
            strokeDasharray="3 3"
            stroke="#c7c7c7"
          />
          <XAxis axisLine={false} tickLine={false} dataKey="name" fontSize={12} color="#6C757D" />
          <YAxis domain={[0, 300]} axisLine={false} tickLine={false} />
          <Tooltip />
          <Bar
            dataKey="pv"
            fill="#8884d8"
            radius={[5, 5, 0, 0]}
            barSize={122}
            stackId="a"
            onClick={() => console.log('Click')}
          >
            <LabelList dataKey="amt" position="top" fontSize={12} fontWeight={700} />
          </Bar>
        </BarChart> */}

        <BarChart
          width={500}
          height={300}
          data={data}
          layout={isVertical ? 'vertical' : 'horizontal'}
          margin={{ top: 18, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis
            type={isVertical ? "number" : 'category'}
            axisLine={false}
            tickLine={false}
            fontSize={12}
            color="#6C757D"
          />
          <YAxis
            type={isVertical ? "category" : 'number'}
            domain={[0, 300]}
            dataKey={isVertical ? "name" : undefined}
            axisLine={false}
            tickLine={false}
          />

          {/* <XAxis axisLine={false} tickLine={false} dataKey="name" fontSize={12} color="#6C757D" />
          <YAxis domain={[0, 300]} axisLine={false} tickLine={false} /> */}

          <CartesianGrid strokeDasharray="3 3" stroke="#c7c7c7" />
          <Tooltip />
          <Bar
            dataKey="pv"
            fill="#8884d8"
            radius={isVertical ? [0, 5, 5, 0] : [5, 5, 0, 0]}
            barSize={isVertical ? 300 : 122}
          >
            <LabelList
              dataKey="amt"
              position={isVertical ? 'right' : 'top'}
              fontSize={12}
              fontWeight={700}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default BarChartGrafic;
