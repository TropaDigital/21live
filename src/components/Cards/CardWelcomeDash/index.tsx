// Icons
import { BiFilter, BiX } from 'react-icons/bi';

// Styles
import { CardWellcomeDash, FilterButtons } from './styles';

// Components
import ButtonDefault from '../../Buttons/ButtonDefault';

interface Props {
  user: string;
  clearFilter: () => void;
  openFilter: () => void;
}

export function CardWelcomeDash({ user, clearFilter, openFilter }: Props) {
  return (
    <CardWellcomeDash>
      <div className="infoCardWellcome">
        <h1>{`Bem-vindo, ${user}`}</h1>
        <span>Acompanhe e gerencie seus projetos e tarefas</span>
      </div>

      <FilterButtons>
        <ButtonDefault typeButton="danger" isOutline onClick={clearFilter}>
          <div className="close-icon">
            <BiX size={30} />
          </div>
          Limpar filtros
        </ButtonDefault>

        <ButtonDefault typeButton="lightWhite" isOutline onClick={openFilter}>
          <BiFilter />
          Filtros
        </ButtonDefault>
      </FilterButtons>
    </CardWellcomeDash>
  );
}
