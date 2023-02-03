import MascoteImage from '../../images/Mascote.png'
import { CardWellcomeDash } from './styles';

interface Props {
  user: string;
}

export function CardWelcomeDash({ user }: Props) {
 
  return (
    <CardWellcomeDash>
      <div className="infoCardWellcome">
        <h1>{`Ola. ${user}!`}</h1>
        <span>Dashboard com os principais indicadores dos seus times e clientes.</span>
      </div>

      <div className="WellcomeImage">
        <img src={MascoteImage} alt="wellcome" />
      </div>
    </CardWellcomeDash>
  );
}
