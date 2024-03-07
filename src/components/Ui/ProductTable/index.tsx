/* eslint-disable import-helpers/order-imports */

// React
import { useState, useEffect } from 'react';

// Icons
import { IconText } from '../../../assets/icons';
import { BiPencil, BiShow } from 'react-icons/bi';
import { FaUpload } from 'react-icons/fa';
import { BsChatText } from 'react-icons/bs';

// Styles
import {
  MotiveBtn,
  MotiveInfos,
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

// Components
import ModalDefault from '../ModalDefault';
import ButtonDefault from '../../Buttons/ButtonDefault';

interface ProductTableProps {
  data: any;
  timeData: any;
  workForProduct: any;
  productSelected: any;
  typeOfPlay: string;
  uploadEnabled: boolean;
  uploadProduct: (value: any) => void;
  viewFile: (value: any) => void;
  fileList?: any[];
}

export default function ProductTable({
  data,
  timeData,
  workForProduct,
  productSelected,
  typeOfPlay,
  uploadProduct,
  uploadEnabled,
  viewFile,
  fileList
}: ProductTableProps) {
  const { user } = useAuth();
  const [workFor, setWorkFor] = useState<string>('schedule');
  const [motiveModal, setMotiveModal] = useState<any>({
    isOpen: false,
    motive: ''
  });
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
      </ProductTitleInfos>

      <ProductsTable>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Produto</th>
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
              <th>Status</th>
              <th>Arquivos</th>
              {uploadEnabled && <th>Upload</th>}
            </tr>
          </thead>
          {data?.products.map((row: any, index: number) => (
            <tbody key={index}>
              <tr className={row.status === 'Desmembrada' ? 'reject' : ''}>
                <td
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    row.status !== 'Desmembrada' ? productSelected(row) : productSelected('task')
                  }
                >
                  #{String(row.products_delivery_id).padStart(2, '0')}
                </td>
                <td
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    row.status !== 'Desmembrada' ? productSelected(row) : productSelected('task')
                  }
                >
                  <div className="flex info">{row.service}</div>
                </td>
                {workFor === 'product' && (
                  <>
                    <td
                      style={{ cursor: 'pointer' }}
                      onClick={() =>
                        row.status === 'Desmembrada'
                          ? productSelected(row)
                          : productSelected('task')
                      }
                    >
                      <span style={{ marginBottom: '4px', display: 'block' }}>
                        {timeData?.timeConsumed}
                      </span>
                      <ProgressBar
                        totalHours={convertToMilliseconds(row?.minutes)}
                        restHours={convertToMilliseconds(timeData?.timeConsumed)}
                      />
                    </td>
                    <td
                      style={{ cursor: 'pointer' }}
                      onClick={() =>
                        row.status === 'Desmembrada'
                          ? productSelected(row)
                          : productSelected('task')
                      }
                    >
                      {row?.minutes}
                    </td>
                  </>
                )}
                <td
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    row.status !== 'Desmembrada' ? productSelected(row) : productSelected('task')
                  }
                >
                  <div dangerouslySetInnerHTML={{ __html: row.description }} />
                </td>
                <td
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    row.status !== 'Desmembrada' ? productSelected(row) : productSelected('task')
                  }
                >
                  {row.size}
                </td>
                <td
                  style={{ cursor: 'pointer', textTransform: 'capitalize' }}
                  onClick={() =>
                    row.status !== 'Desmembrada' ? productSelected(row) : productSelected('task')
                  }
                >
                  {row.type}
                </td>
                <td
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    row.status !== 'Desmembrada' ? productSelected(row) : productSelected('task')
                  }
                >
                  {row.reason_change === '1'
                    ? 'Criação'
                    : row.reason_change === '2'
                    ? 'Desmembramento'
                    : row.reason_change === '3'
                    ? 'Alteração Interna'
                    : 'Alteração externa'}
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      className={
                        row.status === 'Em Andamento'
                          ? 'status progress'
                          : row.status === 'Concluida'
                          ? 'status finished'
                          : row.status === 'Desmembrada'
                          ? 'status break'
                          : row.status === 'Aguardando Aprovação' &&
                            row.status_interaction === 'pass'
                          ? 'status finished'
                          : 'status'
                      }
                    >
                      {row.status === 'Em Andamento'
                        ? 'Em progresso'
                        : row.status === 'Concluida'
                        ? 'Concluída'
                        : row.status === 'Aguardando Aprovação' && row.status_interaction === ''
                        ? 'Aguardando Aprovação'
                        : row.status === 'Aguardando Aprovação' && row.status_interaction === 'wait'
                        ? 'Aguardando Aprovação'
                        : row.status === 'Aguardando Aprovação' && row.status_interaction === 'pass'
                        ? 'Aprovado'
                        : row.status === 'Desmembrada'
                        ? 'Reprovado'
                        : 'Pendente'}
                    </div>
                    {row.status === 'Desmembrada' && (
                      <MotiveBtn
                        onClick={() => setMotiveModal({ isOpen: true, motive: row.fail_reason })}
                      >
                        <BsChatText size={20} />
                      </MotiveBtn>
                    )}
                  </div>
                </td>
                {fileList &&
                fileList.filter((obj: any) => obj.products_delivery_id === row.products_delivery_id)
                  .length > 0 ? (
                  <td onClick={() => viewFile(row)}>
                    <div className="view">
                      <BiShow size={20} />
                    </div>
                  </td>
                ) : (
                  <td>
                    <div className="view block">
                      <BiShow size={20} />
                    </div>
                  </td>
                )}
                {uploadEnabled &&
                  row.status !== 'Desmembrada' &&
                  row.status !== 'Concluida' &&
                  row.status_interaction === '' && (
                    <td onClick={() => uploadProduct(row)}>
                      <div className="upload">
                        <FaUpload />
                      </div>
                    </td>
                  )}
                {uploadEnabled &&
                  (row.status === 'Desmembrada' ||
                    row.status === 'Concluida' ||
                    row.status_interaction !== '') && (
                    <td>
                      <div className="upload block">
                        <FaUpload />
                      </div>
                    </td>
                  )}
              </tr>
            </tbody>
          ))}
        </table>
      </ProductsTable>

      <ModalDefault
        isOpen={motiveModal.isOpen}
        onOpenChange={() => setMotiveModal({ isOpen: false, motive: '' })}
        title="Motivo da reprovação"
      >
        <MotiveInfos>
          <div dangerouslySetInnerHTML={{ __html: motiveModal.motive }} />

          <div className="buttons" onClick={() => setMotiveModal({ isOpen: false, motive: '' })}>
            <ButtonDefault typeButton="primary">Fechar</ButtonDefault>
          </div>
        </MotiveInfos>
      </ModalDefault>
    </ProductContainer>
  );
}
