
import { HiPlay } from "react-icons/hi";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import { convertToMilliseconds } from "../../../utils/convertToMilliseconds";
import ProgressBar from "../ProgressBar";
import { Container, HeaderPlayBar } from "./styles";



export default function ProgressPlayBar() {

  return (
    <Container>
      <HeaderPlayBar>
        <button>
          <HiPlay color="#0046B5" />
        </button>

        <div className="qtdTaskPlayBar">
          <MdOutlineSubdirectoryArrowRight color="#6C757D" />
          <span>0/0</span>
        </div>
      </HeaderPlayBar>

      <ProgressBar 
        restHours={convertToMilliseconds('05:10:35')}
        totalHours={convertToMilliseconds('10:00:00')}
      />
    </Container>
  )
}
