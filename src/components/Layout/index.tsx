/* eslint-disable import-helpers/order-imports */
// React
import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

// Icons
import {
  IconClipboard,
  // IconDash,
  // IconUsers,
  IconProjects,
  IconMeeting,
  IconTeam,
  IconProducts,
  IconFlux
} from '../../assets/icons';
import { HiOutlineTicket } from 'react-icons/hi';

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
            // {
            //   to: '/clientes',
            //   name: 'Clientes',
            //   icon: IconUsers,
            //   identifier: '21jobs_client_all'
            // },
            {
              to: '/projetos',
              name: 'Projetos',
              icon: IconProjects,
              identifier: '21jobs_projects_all'
            },
            {
              to: '/tarefas',
              name: 'Tarefas',
              icon: IconClipboard,
              identifier: '21jobs_task_manager'
            },
            {
              to: '/minhas-tarefas',
              name: 'Minhas tarefas',
              icon: IconClipboard,
              identifier: '21jobs_task_execute'
            },
            {
              to: '/minhas-tarefas',
              name: 'Minhas tarefas',
              icon: IconClipboard,
              identifier: '21jobs_task_essay'
            },
            {
              to: '/produtos',
              name: 'Produtos',
              icon: IconProducts,
              identifier: '21jobs_products_all'
            },
            {
              to: '/fluxo',
              name: 'Fluxos',
              icon: IconFlux,
              identifier: '21jobs_flow_all'
            },
            {
              to: '/equipe',
              name: 'Equipe',
              icon: IconTeam,
              identifier: '21jobs_team_view'
            },
            {
              to: '/reuniao',
              name: 'Atas de Reunião',
              icon: IconMeeting,
              identifier: '21jobs_meetings_view'
            },
            {
              to: '/solicitacoes',
              name: 'Solicitações',
              icon: TicketsIcon,
              identifier: '21jobs_meetings_view'
            }
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
