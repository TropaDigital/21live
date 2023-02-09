
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import { convertToMilliseconds } from "../../../utils/convertToMilliseconds";
import ProgressBar from "../ProgressBar";
import { Container, HeaderPlayBar } from "./styles";
import { FaPlay } from "react-icons/fa";

export default function ProgressPlayBar() {

  return (
    <Container>
      <HeaderPlayBar>

        <div className="sectionPlayHoursBars">
          <button>
            <FaPlay color="#0046B5" />
          </button>

          <span className="timePlayBar">05:50:24</span>
        </div>

        <div className="qtdTaskPlayBar">
          <MdOutlineSubdirectoryArrowRight color="#6C757D" />
          <span>0/0</span>
        </div>
      </HeaderPlayBar>

      <ProgressBar 
        restHours={convertToMilliseconds('05:10:35')}
        totalHours={convertToMilliseconds('10:00:00')}
        isRadius
      />
    </Container>
  )
}
