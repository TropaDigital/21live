// Icons
import { BiFilter, BiX } from 'react-icons/bi';
import { TbReport } from 'react-icons/tb';

// Styles
import { CardWellcomeDash, FilterButtons } from './styles';

// Components
import ButtonDefault from '../../Buttons/ButtonDefault';

interface Props {
  user: string;
  clearFilter: () => void;
  openFilter: () => void;
  openReport?: () => void;
  hasFilters: boolean;
  hasReport: boolean;
}

export function CardWelcomeDash({
  user,
  clearFilter,
  openFilter,
  openReport,
  hasFilters,
  hasReport
}: Props) {
  return (
    <CardWellcomeDash>
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
    </CardWellcomeDash>
  );
}
