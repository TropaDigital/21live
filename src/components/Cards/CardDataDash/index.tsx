// Libraries
import CountUp from 'react-countup';
// Icons
import { BiPaint } from 'react-icons/bi';
import { FiAlertTriangle } from 'react-icons/fi';
import { BsExclamationSquare } from 'react-icons/bs';
import { IconBranch, IconGroup } from '../../../assets/icons';

// Styles
import { Container } from './styles';

interface Props {
  data: number;
  type?: 'success' | 'danger' | 'warning' | 'info' | 'creation';
  description: string;
}

const icons = {
  info: <FiAlertTriangle size={24} />,
  success: <IconGroup />,
  danger: <BsExclamationSquare size={24} />,
  warning: <IconBranch />,
  creation: <BiPaint size={24} />
};

export function CardDataDash({ type, data, description }: Props) {
  return (
    <Container type={type}>
      <div className="info">
        <span>{description}</span>
        <CountUp start={0} end={data} delay={0}>
          {({ countUpRef }) => (
            <div>
              <span className="numberCard" ref={countUpRef} />
            </div>
          )}
        </CountUp>
      </div>
      <div className="info-icon">{icons[type || 'info']}</div>
    </Container>
  );
}
