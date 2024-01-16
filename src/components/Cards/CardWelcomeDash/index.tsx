// Icons
import { BiFilter, BiX } from 'react-icons/bi';
import { TbReport } from 'react-icons/tb';

// Styles
import { CardWrapper, CardWellcomeDash, FilterButtons } from './styles';

// Components
import ButtonDefault from '../../Buttons/ButtonDefault';

// Libraries
import moment from 'moment';
import { AppliedFilter, FilterTotal } from '../../UiElements/styles';

interface Props {
  user: string;
  clearFilter: () => void;
  openFilter: () => void;
  openReport?: () => void;
  hasFilters: boolean;
  hasReport: boolean;
  filtersApplieds: AppliedFilters;
}

interface AppliedFilters {
  fromDate: string;
  toDate: string;
}

export function CardWelcomeDash({
  user,
  clearFilter,
  openFilter,
  openReport,
  hasFilters,
  hasReport,
  filtersApplieds
}: Props) {
  return (
    <CardWellcomeDash>
      <CardWrapper>
        <div className="infoCardWellcome">
          <h1>{`Bem-vindo, ${user}`}</h1>
          <span>Acompanhe e gerencie seus projetos e tarefas</span>
        </div>

        <FilterButtons>
          {hasReport && (
            <ButtonDefault typeButton="success" isOutline onClick={openReport}>
              <div className="close-icon">
                <TbReport />
              </div>
              Gerar relatório
            </ButtonDefault>
          )}

          {!hasFilters && (
            <ButtonDefault typeButton="danger" isOutline onClick={clearFilter}>
              <div className="close-icon">
                <BiX size={30} />
              </div>
              Limpar filtros
            </ButtonDefault>
          )}

          <ButtonDefault typeButton="lightWhite" isOutline onClick={openFilter}>
            <BiFilter />
            Filtros
          </ButtonDefault>
        </FilterButtons>
      </CardWrapper>

      {!hasFilters && (
        <CardWrapper>
          <FilterTotal>
            <div className="filter-title">Filtros (1):</div>
            <span>Data</span>
          </FilterTotal>

          <AppliedFilter onClick={openFilter} style={{ cursor: 'pointer' }}>
            <div className="filter-title">
              Data inicial: <span>{moment(filtersApplieds?.fromDate).format('DD/MM/YYYY')}</span>
            </div>
            <span>-</span>
            <div className="filter-title">
              Data final: <span>{moment(filtersApplieds?.toDate).format('DD/MM/YYYY')}</span>
            </div>
          </AppliedFilter>
        </CardWrapper>
      )}
    </CardWellcomeDash>
  );
}
