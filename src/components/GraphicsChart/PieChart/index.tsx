// Libraries
import { PieChart, Cell, Legend, Pie, ResponsiveContainer, Tooltip } from 'recharts';

// Styles
import { Container } from './styles';

interface PieChartProps {
  data: any;
}

export default function PieChartGraphic({ data }: PieChartProps) {
  const COLORS = ['#0046B5', '#BADFFF'];
  return (
    <Container>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} innerRadius={45} outerRadius={80} paddingAngle={5} dataKey="value">
            {data.map((entry: any, index: number) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          {/* <Tooltip /> */}
          {/* <Legend /> */}
        </PieChart>
      </ResponsiveContainer>
    </Container>
  );
}
