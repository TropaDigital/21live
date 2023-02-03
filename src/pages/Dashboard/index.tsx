import { CardDataDash } from '../../components/Cards/CardDataDash';
import { CardWelcomeDash } from '../../components/Cards/CardWelcomeDash';
import BarChartGrafic from '../../components/GraphicsChart/BarChartGrafic';
import ChartDonut from '../../components/GraphicsChart/ChartDonut';
import { TableDefault } from '../../components/TableDefault';
import { ContainerGroupTable } from '../../components/UiElements/styles';
import { useAuth } from '../../hooks/AuthContext';
import { Container } from './styles';

export default function Dashboard() {
  const { user } = useAuth();

  const dataDahs = [
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

      <CardWelcomeDash user={user.name} />

      <div className="contentData">
        <CardDataDash data={42} type="success" description="Clientes" />

        <CardDataDash data={42} type="creation" description="Clientes" />

        <CardDataDash data={5} type="info" description="Clientes" />

        <CardDataDash data={101} type="danger" description="Clientes" />

        <CardDataDash data={36} type="warning" description="Clientes" />
      </div>

      <ContainerGroupTable style={{ marginTop: '1rem' }}>
        <BarChartGrafic />
        <ChartDonut data={dataDahs} dataKey="value" />
      </ContainerGroupTable>

      <ContainerGroupTable style={{ marginTop: '1rem' }}>
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

    </Container>
  );
}
