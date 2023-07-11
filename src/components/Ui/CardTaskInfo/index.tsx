import { CardInfo, CardInfoField, CardTitle, CardWrapper } from './styles';

interface CardTaskInfoProps {
  cardTitle: string;
  cardType: 'text' | 'time' | 'info';
  dataCard: 'string';
}

export default function CardTaskInfo({ cardTitle, cardType, dataCard }: CardTaskInfoProps) {
  return (
    <CardWrapper cardSize={cardType}>
      <CardTitle>{cardTitle}</CardTitle>
      {cardType === 'text' && (
        <div>
          Lorem ipsum dolor sit amet consectetur. Lectus mi urna consequat faucibus eget nunc orci.
          Massa ornare justo erat sagittis aliquam turpis porttitor. Venenatis vestibulum malesuada
          egestas senectus eu et ultricies dui tortor. Elementum vitae feugiat pulvinar mi sed cras.
          Feugiat nibh nisl dignissim orci in. Imperdiet sed arcu ac consequat.
        </div>
      )}
      {cardType === 'time' && (
        <>
          <div>timer</div>
          <div>Tempo estimado: 00:30:00</div>
        </>
      )}
      {cardType === 'info' && (
        <CardInfo>
          <CardInfoField>
            <div className="info-title">Tempo estimado</div>
            <div className="info-description">02:00:00</div>
          </CardInfoField>
          <CardInfoField>
            <div className="info-title">Responsável:</div>
            <div className="info-description">Guilherme Augusto</div>
          </CardInfoField>
          <CardInfoField>
            <div className="info-title">Etapa:</div>
            <div className="info-description">Criação</div>
          </CardInfoField>
          <CardInfoField>
            <div className="info-title">Fluxo:</div>
            <div className="info-description">Campanha</div>
          </CardInfoField>
          <CardInfoField>
            <div className="info-title">Prioridade:</div>
            <div className="info-description">Normal</div>
          </CardInfoField>
          <CardInfoField>
            <div className="info-title">Data inicial:</div>
            <div className="info-description">26 de junho</div>
          </CardInfoField>
          <CardInfoField>
            <div className="info-title">Data final:</div>
            <div className="info-description">15 de Julho</div>
          </CardInfoField>
        </CardInfo>
      )}
    </CardWrapper>
  );
}
