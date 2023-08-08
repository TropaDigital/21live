// React
import { useCallback, useEffect, useState } from 'react';

import HeaderPage from '../../components/HeaderPage';
import FilterModal from '../../components/Ui/FilterModal';
import { ContainerDefault } from '../../components/UiElements/styles';

export default function Requests() {
  const [modalFilters, setModalFilters] = useState<boolean>(true);

  return (
    <ContainerDefault>
      <HeaderPage title="Solicitações" />

      <FilterModal
        isOpen={modalFilters}
        onOpenChange={() => setModalFilters(!modalFilters)}
        clearFilters={() => ''}
        applyFilters={() => ''}
        selectedFilters={() => ''}
      />
    </ContainerDefault>
  );
}
