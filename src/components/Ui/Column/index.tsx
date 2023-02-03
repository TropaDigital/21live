
import { FiClock, FiMoreHorizontal } from "react-icons/fi";
import { RiStackLine } from "react-icons/ri";

import { 
  Container, 
  HeaderColumn, 
  TitleColumn, 
  ButtonHeaderColumn, 
  InfoColumn,
  MainColumn,
} from "./styles";

interface ColumnProps {
  title: string;
  children: React.ReactNode;
}

export default function Column({ title, children }: ColumnProps) {

  return (
    <Container>
      <HeaderColumn>
        <TitleColumn>{title}</TitleColumn>
        <ButtonHeaderColumn>
          <FiMoreHorizontal color="#6C757D" />
        </ButtonHeaderColumn>
      </HeaderColumn>

      <InfoColumn>
        <div className="infoBoxIcon">
          <RiStackLine color="#6C757D" />
          <span>5</span>
        </div>
        <div className="infoBoxIcon">
          <FiClock color="#6C757D" />
          <span>45h</span>
        </div>
      </InfoColumn>

      <MainColumn>
        {children}
      </MainColumn>
    </Container>
  )
}
