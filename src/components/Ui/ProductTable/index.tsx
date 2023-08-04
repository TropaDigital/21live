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
import { ro } from 'date-fns/locale';

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
  data: any;
  timeData: any;
  workForProduct: any;
  isPlayingForSchedule: boolean;
  productSelected: any;
}

export default function ProductTable({
  data,
  timeData,
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
        <ProductDate>{moment(data?.date_end).format('DD/MM/YYYY')}</ProductDate>
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
          {data?.products.map((row: any, index: number) => (
            <tbody key={index}>
              <tr style={{ cursor: 'pointer' }} onClick={() => productSelected(row, index + 1)}>
                <td>#{String(index + 1).padStart(2, '0')}</td>
                <td>
                  <div className="flex info">
                    <IconText /> {row.service}
                  </div>
                </td>
                {workFor === 'product' && (
                  <>
                    <td>
                      <span style={{ marginBottom: '4px', display: 'block' }}>
                        {timeData?.timeConsumed}
                      </span>
                      <ProgressBar
                        totalHours={convertToMilliseconds(row?.minutes)}
                        restHours={convertToMilliseconds(timeData?.timeConsumed)}
                      />
                    </td>
                    <td>{row?.minutes}</td>
                  </>
                )}
                <td>
                  <div dangerouslySetInnerHTML={{ __html: row.description }} />
                </td>
                <td>{row.size}</td>
                <td style={{ textTransform: 'capitalize' }}>{row.type}</td>
                <td>
                  {row.reason_change === '1'
                    ? 'Criação'
                    : row.reason_change === '2'
                    ? 'Desmembramento'
                    : row.reason_change === '3'
                    ? 'Alteração Interna'
                    : 'Alteração externa'}
                </td>
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