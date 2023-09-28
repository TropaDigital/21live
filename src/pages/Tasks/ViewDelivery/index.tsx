/* eslint-disable import-helpers/order-imports */
// React
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Components
import { ContainerDefault } from '../../../components/UiElements/styles';

// Styles
import { DeliveryWrapper } from './styles';

// Hooks
import useDebouncedCallback from '../../../hooks/useDebounced';
import { useFetch } from '../../../hooks/useFetch';
import HeaderPage from '../../../components/HeaderPage';
import DeliveryTable from '../../../components/DeliveryTable';

export default function ViewDelivery() {
  const location = useLocation();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { isLoading, debouncedCallback } = useDebouncedCallback(
    (search: string) => setSearch(search),
    700
  );

  const { data } = useFetch<any[]>(`tasks/${location.state}`);

  const handleNavigateDeliveryProducts = (infos: any) => {
    const taskDetails = {
      delivery: infos.delivery,
      task: infos.task,
      task_index: infos.task_index
    };
    navigate(`/entrega/${infos.task_index}`, { state: taskDetails });
  };

  const handleFilters = () => {
    console.log('log do filters on task');
  };

  return (
    <ContainerDefault>
      <DeliveryWrapper>
        <HeaderPage title="Suas entregas" />

        <DeliveryTable
          data={data ? data : []}
          loading={isLoading}
          searchInfo={searchTerm}
          searchInput={(value: any) => {
            setSearchTerm(value);
            debouncedCallback(value);
          }}
          addFilter={handleFilters}
          taskSelected={handleNavigateDeliveryProducts}
        />
      </DeliveryWrapper>
    </ContainerDefault>
  );
}
