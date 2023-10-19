// Icons
import { MdOutlineSubdirectoryArrowRight } from 'react-icons/md';
import { FaPlay } from 'react-icons/fa';

// Utils
import { convertToMilliseconds } from '../../../utils/convertToMilliseconds';

// Components
import ProgressBar from '../ProgressBar';

// Styles
import { Container, HeaderPlayBar } from './styles';

interface TimeProps {
  totalTime: string | undefined;
  timeConsumed: string | undefined;
}

export default function ProgressPlayBar({ totalTime, timeConsumed }: TimeProps) {
  return (
    <Container>
      <HeaderPlayBar>
        <div className="sectionPlayHoursBars">
          <div>
            <FaPlay color="#0046B5" />
          </div>

          <span className="timePlayBar">{timeConsumed} /</span>

          <span className="timePlayBar">{totalTime !== 'undefined' ? totalTime : 'Livre'}</span>
        </div>

        <div className="qtdTaskPlayBar">
          <MdOutlineSubdirectoryArrowRight color="#6C757D" />
          <span>0/0</span>
        </div>
      </HeaderPlayBar>

      <ProgressBar
        restHours={convertToMilliseconds(timeConsumed)}
        totalHours={convertToMilliseconds(totalTime !== 'undefined' ? totalTime : timeConsumed)}
        isRadius
      />
    </Container>
  );
}
