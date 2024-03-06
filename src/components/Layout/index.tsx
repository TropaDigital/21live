/* eslint-disable import-helpers/order-imports */
// React
import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

// Icons
import {
  IconClipboard,
  // IconDash,
  IconUsers,
  IconProjects,
  IconMeeting,
  IconTeam,
  IconProducts,
  IconFlux
} from '../../assets/icons';
import { HiOutlineTicket } from 'react-icons/hi';
import { TbCheckupList } from 'react-icons/tb';
import { HiOutlineClipboardList } from 'react-icons/hi';

// Components
import ScrollAreas from '../Ui/ScrollAreas';
import Header from './Header';
import Sidebar from './Sidebar';

// Styles
import { Container, Main } from './styles';

export default function Layout() {
  const [modalActive, setModalActive] = useState(false);
  const location = useLocation();
  const TicketsIcon = HiOutlineTicket;
  const MyTasksIcon = TbCheckupList;
  const ClipboardTask = HiOutlineClipboardList;

  return (
    <Container>
      <Header handleOnMenu={() => setModalActive(!modalActive)} modalActive={modalActive} />
      <Main>
        <Sidebar
          modalActive={modalActive}
          path={location.pathname}
          menus={[
            // {
            //   to: '/dashboard',
            //   name: 'Dashboard',
            //   icon: IconDash,
            //   identifier: ''
            // },
            {
              to: '/clientes',
              name: 'Clientes',
              icon: IconUsers,
              identifier: 'jobs_clients_view'
            },
            {
              to: '/projetos',
              name: 'Projetos',
              icon: IconProjects,
              identifier: 'jobs_projects_view'
            },
            {
              to: '/tarefas',
              name: 'Tarefas',
              icon: ClipboardTask,
              identifier: 'jobs_tasks_view'
            },
            {
              to: '/minhas-tarefas',
              name: 'Minhas tarefas',
              icon: MyTasksIcon,
              identifier: 'jobs_tasks_view'
            },
            {
              to: '/produtos',
              name: 'Produtos',
              icon: IconProducts,
              identifier: 'jobs_products_view'
            },
            {
              to: '/fluxo',
              name: 'Fluxos',
              icon: IconFlux,
              identifier: 'jobs_flow_view'
            },
            {
              to: '/equipe',
              name: 'Equipe',
              icon: IconTeam,
              identifier: 'jobs_team_view'
            },
            {
              to: '/reuniao',
              name: 'Atas de Reunião',
              icon: IconMeeting,
              identifier: 'jobs_meetings_view'
            },
            {
              to: '/solicitacoes',
              name: 'Solicitações',
              icon: TicketsIcon,
              identifier: 'ticket_cats_view'
            }
            // {
            //   to: '/minhas-tarefas',
            //   name: 'Minhas tarefas',
            //   icon: MyTasksIcon,
            //   identifier: 'jobs_task_essay'
            // },
            // {
            //   to: '/form',
            //   name: 'Form',
            //   icon: IconTeam,
            // },
            // {
            //   to: '/components',
            //   name: 'Components',
            //   icon: FiCoffee,
            // },
            // {
            //   to: '/tabela',
            //   name: 'Tabelas',
            //   icon: AiOutlineTable,
            // },
          ]}
        />
        <ScrollAreas>
          <div className="contentMain">
            <Outlet />
          </div>
        </ScrollAreas>
      </Main>
    </Container>
  );
}
