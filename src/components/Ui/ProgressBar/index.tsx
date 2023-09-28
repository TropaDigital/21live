// Styles
import { Container } from './styles';

interface Props {
  totalHours: any;
  restHours: any;
  isRadius?: boolean;
}

export default function ProgressBar({ totalHours, restHours, isRadius }: Props) {
  function convertToPercentage(milliseconds: any, totalMilliseconds: any) {
    const verifyMilliseconds = milliseconds > totalMilliseconds ? totalMilliseconds : milliseconds;

    return (verifyMilliseconds / totalMilliseconds) * 100;
  }

  const percentage = convertToPercentage(restHours, totalHours);

  return (
    <Container value={percentage} isRadius={isRadius}>
      <div className="progress progress-striped">
        <div className="progress-bar"></div>
      </div>
    </Container>
  );
}
