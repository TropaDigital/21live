// Libraries
import CountUp from 'react-countup';

// Icons
import { BiCoffee, BiNews, BiPaint } from 'react-icons/bi';
import { FiAlertTriangle } from 'react-icons/fi';
import { BsBox, BsClockHistory, BsExclamationSquare } from 'react-icons/bs';
import { IconBranch, IconGroup } from '../../../assets/icons';
import { IoHammerOutline } from 'react-icons/io5';

// Styles
import { Container, HoursWrapperCounter } from './styles';
import { MdPlace } from 'react-icons/md';

interface Props {
  data: number | any;
  type?:
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'creation'
    | 'jobSpot'
    | 'jobFee'
    | 'newFee'
    | 'newSpot'
    | 'jobs'
    | 'team';
  description: string;
}

const icons = {
  info: <FiAlertTriangle size={24} />,
  success: <IconGroup />,
  danger: <BsExclamationSquare size={24} />,
  warning: <BsClockHistory />,
  creation: <BiPaint size={24} />,
  newFee: <BiNews />,
  newSpot: <BsBox />,
  jobFee: <BiCoffee />,
  jobSpot: <MdPlace />,
  jobs: <IoHammerOutline />,
  team: <IconBranch />
};

export function CardDataDash({ type, data, description }: Props) {
  return (
    <Container type={type}>
      <div className="info">
        <span>{description}</span>
        {description !== 'Total de horas disponíveis' &&
          description !== 'Horas de criação' &&
          description !== 'Total horas na fila' &&
          description !== 'Total de horas' && (
            <CountUp start={0} end={data} delay={0}>
              {({ countUpRef }) => (
                <div>
                  <span className="numberCard" ref={countUpRef} />
                </div>
              )}
            </CountUp>
          )}

        {(description === 'Total de horas disponíveis' ||
          description === 'Horas de criação' ||
          description === 'Total horas na fila' ||
          description === 'Total de horas') && (
          <HoursWrapperCounter>
            <CountUp start={0} end={Number(data.split(':')[0])} delay={0}>
              {({ countUpRef }) => (
                <div>
                  <span className="numberCard" ref={countUpRef} />
                </div>
              )}
            </CountUp>
            <div className="hours-points">:</div>
            <CountUp start={0} end={Number(data.split(':')[1])} delay={0}>
              {({ countUpRef }) => (
                <div>
                  <span className="numberCard" ref={countUpRef} />
                </div>
              )}
            </CountUp>
            <div className="hours-points">:</div>
            <CountUp start={0} end={Number(data.split(':')[2])} delay={0}>
              {({ countUpRef }) => (
                <div>
                  <span className="numberCard" ref={countUpRef} />
                </div>
              )}
            </CountUp>
          </HoursWrapperCounter>
        )}
      </div>
      <div className="info-icon">{icons[type || 'info']}</div>
    </Container>
  );
}
