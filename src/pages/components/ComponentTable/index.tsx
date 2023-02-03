import BarChartGrafic from '../../../components/GraphicsChart/BarChartGrafic';
import ChartDonut from '../../../components/GraphicsChart/ChartDonut';
import { TableDefault } from '../../../components/TableDefault';
import { ContainerGroupTable } from '../../../components/UiElements/styles';
import { Container } from './styles';

export default function ComponentTable() {
  const data2 = [
    {
      id: 1,
      name: 'A',
      value: 20,
      fill: '#8269B2',
      currency: 120.0,
      isDonut: false,
      isPadded: false,
    },
    {
      id: 2,
      name: 'B',
      value: 25,
      fill: '#37C3FF',
      currency: 80.0,
      isDonut: true,
      isPadded: false,
    },
    {
      id: 3,
      name: 'C',
      value: 35,
      fill: '#93E088',
      currency: 20.0,
      isDonut: true,
      isPadded: true,
    },
  ];

  return (
    <Container>
      <ContainerGroupTable>
        <TableDefault title="titulo da tabela">
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Valor</th>
              <th>Categoria</th>
              <th>Data</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Socios</td>
              <td>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(15000)}
              </td>
              <td>sistemas</td>
              <td>{new Intl.DateTimeFormat('pt-BR').format(new Date(1300))}</td>
            </tr>
            <tr>
              <td>Clientes</td>
              <td>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(3200)}
              </td>
              <td>sistemas</td>
              <td>
                {new Intl.DateTimeFormat('pt-BR').format(new Date(50000))}
              </td>
            </tr>
            <tr>
              <td>Clientes</td>
              <td>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(3200)}
              </td>
              <td>sistemas</td>
              <td>
                {new Intl.DateTimeFormat('pt-BR').format(new Date(50000))}
              </td>
            </tr>
            <tr>
              <td>Clientes</td>
              <td>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(3200)}
              </td>
              <td>sistemas</td>
              <td>
                {new Intl.DateTimeFormat('pt-BR').format(new Date(50000))}
              </td>
            </tr>
          </tbody>
        </TableDefault>

        <TableDefault title="titulo da tabela">
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Valor</th>
              <th>Categoria</th>
              <th>Data</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Socios</td>
              <td>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(15000)}
              </td>
              <td>sistemas</td>
              <td>{new Intl.DateTimeFormat('pt-BR').format(new Date(1300))}</td>
            </tr>
            <tr>
              <td>Clientes</td>
              <td>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(3200)}
              </td>
              <td>sistemas</td>
              <td>
                {new Intl.DateTimeFormat('pt-BR').format(new Date(50000))}
              </td>
            </tr>
            <tr>
              <td>Clientes</td>
              <td>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(3200)}
              </td>
              <td>sistemas</td>
              <td>
                {new Intl.DateTimeFormat('pt-BR').format(new Date(50000))}
              </td>
            </tr>
            <tr>
              <td>Clientes</td>
              <td>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(3200)}
              </td>
              <td>sistemas</td>
              <td>
                {new Intl.DateTimeFormat('pt-BR').format(new Date(50000))}
              </td>
            </tr>
          </tbody>
        </TableDefault>
      </ContainerGroupTable>

      <ContainerGroupTable style={{ marginTop: '2rem' }}>
        <BarChartGrafic /> 
        <BarChartGrafic isVertical={true}/> 
      </ContainerGroupTable>

      <ContainerGroupTable style={{ marginTop: '2rem' }}>
        <ChartDonut data={data2} dataKey="value" />

        <ChartDonut data={data2} dataKey="value" isDonut />

        <ChartDonut data={data2} isDonut isPadded dataKey="value"/>

        <ChartDonut data={data2} dataKey="value" />
      </ContainerGroupTable>

    </Container>
  );
}
