/* eslint-disable import-helpers/order-imports */

// React
import { useState, useEffect } from 'react';

// Icons
import { IconText } from '../../../assets/icons';

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
import moment from 'moment';
import 'moment/dist/locale/pt-br';
import ProgressBar from '../ProgressBar';

// Utils
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
  copywriting_date_end: string;
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

  useEffect(() => {
    console.log('log do data no products table', data);
  }, []);

  return (
    <ProductContainer>
      <ProductTitleInfos>
        <ProductTitle>Produtos para entrega</ProductTitle>
        <div>-</div>
        {/* {moment(task.copywriting_date_end).format('DD/MMM/YYYY')} */}
        <ProductDate>{moment(data[0]?.copywriting_date_end).format('DD/MMM/YYYY')}</ProductDate>
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
          {/* {data.map((row: Product) => (
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
          ))} */}
        </table>
      </ProductsTable>
    </ProductContainer>
  );
}
