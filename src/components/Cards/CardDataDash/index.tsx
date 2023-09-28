// Libraries
import CountUp from 'react-countup';
// Icons
import { BiGitBranch, BiGroup, BiPaint } from 'react-icons/bi';
import { FiAlertOctagon, FiAlertTriangle } from 'react-icons/fi';

// Styles
import { Container } from './styles';

interface Props {
  data: number;
  type?: 'success' | 'danger' | 'warning' | 'info' | 'creation';
  description: string;
}

const icons = {
  info: <FiAlertTriangle size={28} />,
  success: <BiGroup size={28} />,
  danger: <BiGitBranch size={28} />,
  warning: <FiAlertOctagon size={28} />,
  creation: <BiPaint size={28} />
};

export function CardDataDash({ type, data, description }: Props) {
  return (
    <Container type={type}>
      <div className="info">
        {icons[type || 'info']}
        <CountUp start={0} end={data} delay={0}>
          {({ countUpRef }) => (
            <div>
              <span className="numberCard" ref={countUpRef} />
            </div>
          )}
        </CountUp>
      </div>

      <span>{description}</span>
    </Container>
  );
}
