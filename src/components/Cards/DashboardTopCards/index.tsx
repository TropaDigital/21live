// Styles
import { CardDataDash } from '../CardDataDash';
import { WrapperCards } from './styles';

interface CardsInfoProps {
  typeCards: 'manager' | 'executive';
  cardsData: CardsData[];
}

export interface CardsData {
  data: number;
  type: 'success' | 'creation' | 'info' | 'danger' | 'warning' | undefined;
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
    </WrapperCards>
  );
}
