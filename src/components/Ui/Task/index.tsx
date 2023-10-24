// Icons
import { BiFlag } from 'react-icons/bi';
import { FiMoreHorizontal } from 'react-icons/fi';

// Utils
import { avatarAll } from '../../../utils/dataDefault';

// Components
import Avatar from '../Avatar';
import ProgressPlayBar from '../ProgressPlayBar';

// Styles
import {
  Container,
  ContentTask,
  HeaderTask,
  HeaderTaskButton,
  MainTask,
  TitleTask,
  FieldGroupTask,
  DataSpan,
  FooterTask
} from './styles';
import moment from 'moment';

interface ITask {
  task_id: string;
  title: string;
  tenant_id?: string;
  project_product_id?: string;
  flow_id?: string;
  description: string;
  creation_description?: string;
  creation_date_end?: string;
  copywriting_description?: string;
  copywriting_date_end?: string;
  created?: string;
  updated?: string;
  type: string;
  total_time?: string;
  status?: string;
  time_consumed?: string;
  type_play?: string;
  user_id?: string;
  urgent?: string;
  ticket_id?: string;
  start_job?: string;
  end_job?: string;
  organization_id?: string;
  requester_id?: string;
}

interface DataTaskProps {
  data: ITask;
}

export default function Task({ data }: DataTaskProps) {
  return (
    <Container>
      <ContentTask>
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
          <TitleTask>{data.title}</TitleTask>

          <FieldGroupTask>
            <div className="sectionAvatarTask">
              <Avatar data={avatarAll} />
            </div>

            <div className="sectionDataTask">
              <DataSpan>
                {data.end_job !== '' && moment(data.end_job).format('DD/MMM')}
                {data.end_job === '' && 'Tarefa livre'}
              </DataSpan>
              {/* <button className="buttonFlagTask">
                <BiFlag color="#6C757D" size={18} />
              </button> */}
            </div>
          </FieldGroupTask>
        </MainTask>
      </ContentTask>

      <FooterTask>
        <ProgressPlayBar timeConsumed={data.time_consumed} totalTime={data.total_time} />
      </FooterTask>
    </Container>
  );
}
