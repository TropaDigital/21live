import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  BarChart,
  LabelList
} from 'recharts';

import { Container } from './styles';

interface Props {
  data: any;
  isVertical?: boolean;
  title?: string;
  height: string;
}

const BarChartGrafic = ({ data, isVertical, title, height }: Props) => {
  // const data = [
  //   {
  //     name: 'Entregue',
  //     pv: 378,
  //     fill: '#00A063'
  //   },
  //   {
  //     name: 'Aprovação',
  //     pv: 232,
  //     fill: '#0098FF'
  //   },
  //   {
  //     name: 'Criação',
  //     pv: 262,
  //     fill: '#0045B5'
  //   },
  //   {
  //     name: 'Cancelado',
  //     pv: 105,
  //     fill: '#D92D20'
  //   },
  //   {
  //     name: 'Pendente',
  //     pv: 48,
  //     fill: '#FDB022'
  //   }
  // ];

  return (
    <Container height={height}>
      {title !== '' && (
        <div className="sectionInfo">
          <span>{title}</span>
        </div>
      )}

      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          layout={isVertical ? 'vertical' : 'horizontal'}
          margin={{ top: 18, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis
            type={isVertical ? 'number' : 'category'}
            dataKey={isVertical ? undefined : 'name'}
            axisLine={false}
            tickLine={false}
            fontSize={12}
            color="#6C757D"
          />
          <YAxis
            type={isVertical ? 'category' : 'number'}
            domain={[0, 'dataMax + 22']}
            dataKey={isVertical ? 'name' : undefined}
            axisLine={false}
            tickLine={false}
          />

          <CartesianGrid
            // vertical={isVertical ? true : false}
            // horizontal={isVertical ? false : true}
            strokeDasharray="3 3"
            stroke="#c7c7c7"
          />
          <Tooltip />
          <Bar
            dataKey="Total"
            fill="#8884d8"
            radius={isVertical ? [0, 5, 5, 0] : [5, 5, 0, 0]}
            barSize={isVertical ? 60 : 100}
          >
            <LabelList
              dataKey="Total"
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
