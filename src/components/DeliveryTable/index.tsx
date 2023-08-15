/* eslint-disable import-helpers/order-imports */
// React
import { useEffect } from 'react';

// Icons
import { BiFilter, BiSearchAlt } from 'react-icons/bi';
import { FiFlag } from 'react-icons/fi';
import { IconContext } from 'react-icons';
import { IconText } from '../../assets/icons';

// Utils
import { convertToMilliseconds } from '../../utils/convertToMilliseconds';

// Styles
import { Flag } from '../../pages/Tasks/TaskList/styles';
import {
  DeliveryContainer,
  DeliveryDate,
  DeliveryDateWrapper,
  DeliveryFilter,
  DeliveriesTable
} from './styles';

// Components
import ButtonDefault from '../Buttons/ButtonDefault';
import { InputDefault } from '../Inputs/InputDefault';

// Libraries
import ProgressBar from '../Ui/ProgressBar';
import moment from 'moment';
import 'moment/dist/locale/pt-br';
import { IProductTask } from '../../types';

interface DeliveryProps {
  data: any;
  loading: boolean;
  searchInput: any;
  searchInfo: string;
  addFilter: any;
  taskSelected: any;
}

interface TaskDelivery {
  task_id?: number | any;
  title: string;
  user_id: string;
  tenant_id: number | string | any;
  product_id: number | string | any; // produto principal, o produto pode ter uma flag que significa que ele lista outros produtos na criação da task
  type?: string | any; //type_id da tabela task_type
  flow_id?: number | any;
  flow: string;
  description: string | any; //descricao geral
  name?: string | any;
  creation_description?: string | any; //entrega de criação
  creation_date_end?: string | any;
  copywriting_description?: string | any;
  copywriting_date_end?: string | any; //entrega da redação
  deliverys?: Array<IDelivery> | any; //se for dividir a entrega, entra agqui
  step?: number | any;
  project_id?: string;
  tenant: string;
  product_period: string;
  project_category: string;
  timeConsumed: string;
  totalTime: string;
  status: string;
  card_name: string;
}

export interface IDelivery {
  task_id?: number;
  date_end: Date;
  description?: string;
  order: string;
  products?: Array<IProductTask>;
}

export default function DeliveryTable({
  data,
  loading,
  searchInput,
  searchInfo,
  addFilter,
  taskSelected
}: DeliveryProps) {
  const handleGoToProducts = (deliveryInfos: any, taskIndex: any, taskInfos: any) => {
    const allTaskInfo = {
      delivery: deliveryInfos,
      task_index: taskIndex,
      task: taskInfos
    };
    taskSelected(allTaskInfo);
  };

  return (
    <DeliveryContainer>
      <DeliveryFilter>
        <InputDefault
          label=""
          name="search"
          placeholder="Buscar..."
          onChange={(event) => searchInput(event.target.value)}
          value={searchInfo}
          icon={BiSearchAlt}
          isLoading={loading}
          className="search-field"
        />

        {/* <ButtonDefault typeButton="lightWhite" isOutline onClick={addFilter}>
          <BiFilter />
          Ordenar por
        </ButtonDefault> */}
      </DeliveryFilter>

      {data.map((delivery: TaskDelivery) =>
        delivery.deliverys.map((row: IDelivery, index: number) => (
          <DeliveryDateWrapper key={index}>
            <DeliveryDate>{moment(row.date_end).format('DD/MM/YYYY')}</DeliveryDate>
            <DeliveriesTable>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Entregas</th>
                    <th>Tempo consumido</th>
                    <th>Tempo estimado</th>
                    <th>Data inicial</th>
                    <th>Data final</th>
                    <th>Produtos</th>
                    <th>Etapa</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    key={index}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleGoToProducts(row, index + 1, delivery)}
                  >
                    <td>
                      <div className="id-column">
                        #{String(delivery.task_id).padStart(5, '0')} |{' '}
                        {String(index + 1).padStart(2, '0')}
                      </div>
                    </td>
                    <td>
                      <div className="column info">
                        <div>
                          <IconText /> {delivery.title}
                        </div>
                        <span>
                          {delivery.tenant} / {delivery.project_category} |{' '}
                          {delivery.product_period}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span style={{ marginBottom: '4px', display: 'block' }}>
                        {delivery.timeConsumed}
                      </span>
                      <ProgressBar
                        totalHours={convertToMilliseconds(delivery.totalTime)}
                        restHours={convertToMilliseconds(delivery.timeConsumed)}
                      />
                    </td>
                    <td>
                      <div className="flag-info">
                        <Flag
                          style={{ textAlign: 'center' }}
                          className={delivery.status === 'true' ? 'flagged' : ''}
                        >
                          {delivery.status === 'true' ? (
                            <IconContext.Provider
                              value={{ color: '#F04438', className: 'global-class-name' }}
                            >
                              <FiFlag />
                            </IconContext.Provider>
                          ) : (
                            <IconContext.Provider
                              value={{ color: '#667085', className: 'global-class-name' }}
                            >
                              <FiFlag />
                            </IconContext.Provider>
                          )}
                        </Flag>
                        {delivery.totalTime}
                      </div>
                    </td>
                    <td style={{ textTransform: 'capitalize' }}>
                      {moment(delivery.copywriting_date_end).format('DD/MMM/YYYY')}
                    </td>
                    <td style={{ textTransform: 'capitalize' }}>
                      {moment(delivery.creation_date_end).format('DD/MMM/YYYY')}
                    </td>
                    <td>
                      {row.products !== undefined && row.products.length <= 1
                        ? `${row?.products?.length} produto`
                        : `${row?.products?.length} produtos`}
                    </td>
                    <td>
                      <div className="column">
                        {delivery.card_name}
                        <span>Fluxo: {delivery.flow}</span>
                      </div>
                    </td>
                    <td>
                      <div
                        className={
                          delivery.status === 'progress'
                            ? 'status progress'
                            : delivery.status === 'finished'
                            ? 'status finished'
                            : 'status'
                        }
                      >
                        {delivery.status === 'progress'
                          ? 'Em progresso'
                          : delivery.status === 'finished'
                          ? 'Concluída'
                          : 'Pendente'}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </DeliveriesTable>
          </DeliveryDateWrapper>
        ))
      )}
    </DeliveryContainer>
  );
}
