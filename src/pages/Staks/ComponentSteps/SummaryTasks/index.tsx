import ButtonDefault from '../../../../components/Buttons/ButtonDefault';

import {
  Summary,
  SummaryButtons,
  SummaryCard,
  SummaryCardSubtitle,
  SummaryCardTitle,
  SummaryTasksInfo,
  SummaryWrapper
} from './styles';

interface TasksProps {
  createTasks: () => void;
  editTasks: () => void;
  selectedProducts: any;
}

export default function SummaryTasks({ selectedProducts, editTasks, createTasks }: TasksProps) {
  return (
    <SummaryWrapper>
      <Summary className="big">
        <div className="title">Produtos selecionados</div>
        {selectedProducts.map((row: any, index: number) => (
          <SummaryCard key={index}>
            <SummaryCardTitle>{row.service}</SummaryCardTitle>
            <SummaryCardSubtitle>
              <div>
                Tipo: <span>{row.type}</span>
              </div>
              <div>
                Formato: <span>{row.size}</span>
              </div>
            </SummaryCardSubtitle>
          </SummaryCard>
        ))}
      </Summary>

      <SummaryTasksInfo>
        <div className="title">RESUMO DA TAREFA</div>
        <div className="item-hours">
          Total de itens: <span>{selectedProducts.length}</span>
        </div>
        <div className="item-hours">
          Horas estimadas <span>04:00:00</span>
        </div>
        <SummaryButtons>
          <ButtonDefault typeButton="primary" isOutline onClick={() => editTasks()}>
            Editar tarefa
          </ButtonDefault>
          <ButtonDefault onClick={() => createTasks()}>Criar tarefa</ButtonDefault>
        </SummaryButtons>
      </SummaryTasksInfo>
    </SummaryWrapper>
  );
}
