
import { BiFlag } from "react-icons/bi";
import { FiMoreHorizontal } from "react-icons/fi";
import { avatarAll } from "../../../utils/dataDefault";
import Avatar from "../Avatar";
import ProgressPlayBar from "../ProgressPlayBar";
import { 
  Container,
  HeaderTask,
  HeaderTaskButton,
  MainTask,
  TitleTask,
  FieldGroupTask,
  DataSpan,
} from "./styles";

export default function Task() {

  return (
    <Container>
      <HeaderTask>
        <div className="colorTask">
          <div className="colorTask" />
          <div className="colorTask" />
        </div>

        <HeaderTaskButton>
          <FiMoreHorizontal color="#6C757D" />
        </HeaderTaskButton>
      </HeaderTask>

      <MainTask>
        <TitleTask>Ação - Dia das Mães</TitleTask>

        <FieldGroupTask>
          <div className="sectionAvatarTask">
            <Avatar 
              data={avatarAll}
            />
          </div>

          <div className="sectionDataTask">
            <DataSpan>09 mar</DataSpan>
            <button className="buttonFlagTask">
              <BiFlag color="#6C757D" size={18}/>
            </button>
          </div>
        </FieldGroupTask>

        <div className="sectionTimeTask">
          <ProgressPlayBar />
        </div>

      </MainTask>
    </Container>
  )
}
