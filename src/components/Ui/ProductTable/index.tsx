/* eslint-disable import-helpers/order-imports */

// React
import { useState, useEffect } from 'react';

// Icons
import { IconText } from '../../../assets/icons';
import { BiPencil } from 'react-icons/bi';

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

// Hooks
import { useAuth } from '../../../hooks/AuthContext';
import { FaUpload } from 'react-icons/fa';

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
  isFinished?: boolean;
  typeOfWorkFinished?: string;
  typeOfPlay: string;
  uploadEnabled: boolean;
  uploadProduct: (value: any) => void;
}

export default function ProductTable({
  data,
  timeData,
  workForProduct,
  isPlayingForSchedule,
  productSelected,
  isFinished,
  typeOfWorkFinished,
  typeOfPlay,
  uploadProduct,
  uploadEnabled
}: ProductTableProps) {
  const { user } = useAuth();
  const [workFor, setWorkFor] = useState<string>('schedule');
  // const workStatus = workFor === 'product' ? true : false;

  useEffect(() => {
    setWorkFor(typeOfPlay);
  }, [typeOfPlay]);

  const handleWorkFor = (value: any) => {
    setWorkFor(value);
    if (value === 'product') {
      workForProduct(true);
    }
    if (value === 'schedule') {
      workForProduct(false);
    }
  };

  return (
    <ProductContainer>
      <ProductTitleInfos>
        <ProductTitle>Produtos para entrega</ProductTitle>
        <div>-</div>
        <ProductDate>{moment(data?.date_end).format('DD/MM/YYYY')}</ProductDate>
        {!isPlayingForSchedule && (
          <>
            <div>-</div>
            {!isFinished && (
              <ProductSelect>
                <Switch
                  onChange={() => handleWorkFor(workFor === 'product' ? 'schedule' : 'product')}
                  checked={workFor === 'product' ? true : false}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  onColor="#0046B5"
                  width={40}
                  height={21}
                />
                Trabalhar por produto
              </ProductSelect>
            )}

            {isFinished && (
              <ProductSelect>
                <Switch
                  onChange={() => ''}
                  checked={typeOfWorkFinished === 'delivery' ? false : true}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  onColor="#0046B5"
                  width={40}
                  height={21}
                />
                Trabalhar por produto
              </ProductSelect>
            )}
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
              {uploadEnabled && <th>Upload</th>}
              {workFor === 'product' && <th>Status</th>}
            </tr>
          </thead>
          {data?.products.map((row: any, index: number) => (
            <tbody key={index}>
              <tr className={row.status === 'reject' ? 'reject' : ''}>
                <td style={{ cursor: 'pointer' }} onClick={() => productSelected(row)}>
                  #{String(index + 1).padStart(2, '0')}
                </td>
                <td style={{ cursor: 'pointer' }} onClick={() => productSelected(row)}>
                  {user.permissions.includes('jobs_tasks_essay') && (
                    <div className="flex info">
                      <IconText /> {row.service}
                    </div>
                  )}

                  {user.permissions.includes('jobs_tasks_execute') && (
                    <div className="flex info">
                      <BiPencil /> {row.service}
                    </div>
                  )}
                </td>
                {workFor === 'product' && (
                  <>
                    <td style={{ cursor: 'pointer' }} onClick={() => productSelected(row)}>
                      <span style={{ marginBottom: '4px', display: 'block' }}>
                        {timeData?.timeConsumed}
                      </span>
                      <ProgressBar
                        totalHours={convertToMilliseconds(row?.minutes)}
                        restHours={convertToMilliseconds(timeData?.timeConsumed)}
                      />
                    </td>
                    <td style={{ cursor: 'pointer' }} onClick={() => productSelected(row)}>
                      {row?.minutes}
                    </td>
                  </>
                )}
                <td style={{ cursor: 'pointer' }} onClick={() => productSelected(row)}>
                  <div dangerouslySetInnerHTML={{ __html: row.description }} />
                </td>
                <td style={{ cursor: 'pointer' }} onClick={() => productSelected(row)}>
                  {row.size}
                </td>
                <td
                  style={{ cursor: 'pointer', textTransform: 'capitalize' }}
                  onClick={() => productSelected(row)}
                >
                  {row.type}
                </td>
                <td style={{ cursor: 'pointer' }} onClick={() => productSelected(row)}>
                  {row.reason_change === '1'
                    ? 'Criação'
                    : row.reason_change === '2'
                    ? 'Desmembramento'
                    : row.reason_change === '3'
                    ? 'Alteração Interna'
                    : 'Alteração externa'}
                </td>
                {uploadEnabled && (
                  <td onClick={() => uploadProduct(row)}>
                    <div className="upload">
                      <FaUpload />
                    </div>
                  </td>
                )}
                {workFor === 'product' && (
                  <td>
                    <div
                      className={
                        row.status === 'Em Andamento'
                          ? 'status progress'
                          : row.status === 'Concluida'
                          ? 'status finished'
                          : 'status'
                      }
                    >
                      {row.status === 'Em Andamento'
                        ? 'Em Andamento'
                        : row.status === 'Concluida'
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
