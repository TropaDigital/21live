import { CardWellcomeDash } from './styles';

interface Props {
  user: string;
}

export function CardWelcomeDash({ user }: Props) {
  return (
    <CardWellcomeDash>
      <div className="infoCardWellcome">
        <h1>{`Bem-vindo, ${user}`}</h1>
        <span>Acompanhe e gerencie seus projetos e tarefas</span>
      </div>
    </CardWellcomeDash>
  );
}
