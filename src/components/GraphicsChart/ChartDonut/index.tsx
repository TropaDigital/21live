// Libraries
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

import { Container } from './styles';

interface DonutProps {
  data: any;
  dataKey: string;
  title?: string;
}

// const renderActiveShape = (props: any) => {
//   const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;

//   return (
//     <g>
//       <Sector
//         cx={cx}
//         cy={cy}
//         innerRadius={innerRadius}
//         outerRadius={outerRadius}
//         startAngle={startAngle}
//         endAngle={endAngle}
//         fill={fill}
//         opacity={1}
//         cursor="pointer"
//       />
//     </g>
//   );
// };

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, name }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 1.07;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill={'#6C757D'}
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {name}
    </text>
  );
};

const ChartDonut = ({ data, dataKey, title }: DonutProps) => {
  return (
    <Container>
      {title !== '' && (
        <div className="sectionInfo">
          <span>{title}</span>
        </div>
      )}

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey={dataKey}
            labelLine={false}
            strokeWidth={4}
            label={renderCustomizedLabel}
            startAngle={100}
            endAngle={460}
            outerRadius={140}
          >
            {data.map((entry: any) => (
              <Cell key={entry.name} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default ChartDonut;
