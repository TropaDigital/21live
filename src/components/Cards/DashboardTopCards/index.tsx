// Styles
import { CardDataDash } from '../CardDataDash';
import { WrapperCards } from './styles';

interface CardsInfoProps {
  typeCards: 'manager' | 'executive' | 'traffic';
  cardsData: CardsData[];
}

export interface CardsData {
  data: number;
  type:
    | 'success'
    | 'creation'
    | 'info'
    | 'danger'
    | 'warning'
    | 'jobSpot'
    | 'jobFee'
    | 'newFee'
    | 'newSpot'
    | 'jobs'
    | 'team'
    | undefined;
  title: string;
}

export default function TopCardsDash({ typeCards, cardsData }: CardsInfoProps) {
  return (
    <WrapperCards>
      {typeCards === 'manager' &&
        cardsData.map((row: CardsData) => (
          <CardDataDash key={row.title} data={row.data} type={row.type} description={row.title} />
        ))}

      {typeCards === 'executive' &&
        cardsData.map((row: CardsData) => (
          <CardDataDash key={row.title} data={row.data} type={row.type} description={row.title} />
        ))}

      {typeCards === 'traffic' &&
        cardsData.map((row: CardsData) => (
          <CardDataDash key={row.title} data={row.data} type={row.type} description={row.title} />
        ))}
    </WrapperCards>
  );
}
