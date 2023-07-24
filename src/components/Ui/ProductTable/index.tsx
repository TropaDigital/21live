/* eslint-disable import-helpers/order-imports */

// React
import { useState, useEffect } from 'react';

// Styles
import {
  ProductContainer,
  ProductDate,
  ProductSelect,
  ProductTitle,
  ProductTitleInfos,
  ProductsTable
} from './styles';

// Libraries
import Switch from 'react-switch';
import { IconText } from '../../../assets/icons';
import ProgressBar from '../ProgressBar';
import { convertToMilliseconds } from '../../../utils/convertToMilliseconds';

interface Product {
  id: string;
  title: string;
  consumedTime: string;
  estimatedTime: string;
  description: string;
  format: string;
  formatType: string;
  type: string;
  status: string;
}

interface ProductTableProps {
  data: Product[];
  workForProduct: any;
  isPlayingForSchedule: boolean;
  productSelected: any;
}

export default function ProductTable({
  data,
  workForProduct,
  isPlayingForSchedule,
  productSelected
}: ProductTableProps) {
  const [workFor, setWorkFor] = useState<string>('schedule');

  useEffect(() => {
    const workStatus = workFor === 'product' ? true : false;
    workForProduct(workStatus);
  }, [workFor, workForProduct]);

  return (
    <ProductContainer>
      <ProductTitleInfos>
        <ProductTitle>Produtos para entrega</ProductTitle>
        <div>-</div>
        <ProductDate>15/07/2023</ProductDate>
        {!isPlayingForSchedule && (
          <>
            <div>-</div>
            <ProductSelect>
              <Switch
                onChange={() => setWorkFor(workFor === 'product' ? 'schedule' : 'product')}
                checked={workFor === 'product' ? true : false}
                uncheckedIcon={false}
                checkedIcon={false}
                onColor="#0046B5"
                width={40}
                height={21}
              />
              Trabalhar por produto
            </ProductSelect>
          </>
        )}
      </ProductTitleInfos>

      <ProductsTable>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tarefa</th>
              {workFor === 'product' && (
                <>
                  <th>Tempo consumido</th>
                  <th>Tempo estimado</th>
                </>
              )}
              <th>Descrição</th>
              <th>Formato</th>
              <th>I/D</th>
              <th>Tipo</th>
              {workFor === 'product' && <th>Status</th>}
            </tr>
          </thead>
          {data.map((row: Product) => (
            <tbody key={row.id}>
              <tr
                key={row.id}
                style={{ cursor: 'pointer' }}
                onClick={() => productSelected(row.id)}
              >
                <td>#{String(row.id).padStart(5, '0')}</td>
                <td>
                  <div className="flex info">
                    <IconText /> {row.title}
                  </div>
                </td>
                {workFor === 'product' && (
                  <>
                    <td>
                      <span style={{ marginBottom: '4px', display: 'block' }}>
                        {row.consumedTime}
                      </span>
                      <ProgressBar
                        totalHours={convertToMilliseconds(row.estimatedTime)}
                        restHours={convertToMilliseconds(row.consumedTime)}
                      />
                    </td>
                    <td>{row.estimatedTime}</td>
                  </>
                )}
                <td>{row.description}</td>
                <td>{row.format}</td>
                <td>{row.formatType}</td>
                <td>{row.type}</td>
                {workFor === 'product' && (
                  <td>
                    <div
                      className={
                        row.status === 'progress'
                          ? 'status progress'
                          : row.status === 'finished'
                          ? 'status finished'
                          : 'status'
                      }
                    >
                      {row.status === 'progress'
                        ? 'Em progresso'
                        : row.status === 'finished'
                        ? 'Concluída'
                        : 'Pendente'}
                    </div>
                  </td>
                )}
              </tr>
            </tbody>
          ))}
        </table>
      </ProductsTable>
    </ProductContainer>
  );
}
