import { CardTitle, CardWrapper } from './styles';

interface CardTaskInfoProps {
  cardTitle: string;
  cardType: 'text' | 'time' | 'info';
}

export default function CardTaskInfo({ cardTitle, cardType }: CardTaskInfoProps) {
  return (
    <CardWrapper>
      <CardTitle>{cardTitle}</CardTitle>
    </CardWrapper>
  );
}
