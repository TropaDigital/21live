
import { Container } from "./styles";

interface Props {
  totalHours: any;
  restHours: any;
}

export default function ProgressBar({ totalHours, restHours }: Props) {

  function convertToPercentage(milliseconds: any, totalMilliseconds: any) {
    const verifyMilliseconds = milliseconds > totalMilliseconds ? totalMilliseconds : milliseconds

    return (verifyMilliseconds / totalMilliseconds) * 100;
  }

  const percentage = convertToPercentage(restHours, totalHours);

  return (
    <Container value={percentage}>
      <div className="progress progress-striped">
        <div className="progress-bar">
        </div>                       
      </div> 
    </Container>
  )
}
