import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import {
  IconClipboard,
  IconDash,
  IconProjects,
  IconMeeting,
  IconTeam,
  IconProducts,
  IconFlux,
  IconUsers
} from '../../assets/icons';

import ScrollAreas from '../Ui/ScrollAreas';
import Header from './Header';
import Sidebar from './Sidebar';
import { Container, Main } from './styles';

export default function Layout() {
  const [modalActive, setModalActive] = useState(false);
  const location = useLocation();

  return (
    <Container>
      <Header handleOnMenu={() => setModalActive(!modalActive)} modalActive={modalActive} />
      <Main>
        <Sidebar
          modalActive={modalActive}
          path={location.pathname}
          menus={[
            {
              to: '/dashboard',
              name: 'Dashboard',
              icon: IconDash,
              identifier: 'dashboard_admin'
            },
            {
              to: '/projetos',
              name: 'Projetos',
              icon: IconProjects,
              identifier: 'project_admin'
            },
            {
              to: '/tarefas',
              name: 'Tarefas',
              icon: IconClipboard,
              identifier: 'task_admin'
            },
            {
              to: '/suas-tarefas',
              name: 'Tarefas',
              icon: IconClipboard,
              identifier: 'task_execute'
            },
            {
              to: '/suas-tarefas',
              name: 'Tarefas',
              icon: IconClipboard,
              identifier: 'task_essay'
            },
            {
              to: '/clientes',
              name: 'Clientes',
              icon: IconUsers,
              identifier: 'client_admin'
            },
            {
              to: '/produtos',
              name: 'Produtos',
              icon: IconProducts,
              identifier: 'products_admin'
            },
            {
              to: '/fluxo',
              name: 'Fluxos',
              icon: IconFlux,
              identifier: 'flow_admin'
            },
            {
              to: '/equipe',
              name: 'Equipe',
              icon: IconTeam,
              identifier: 'team_admin'
            },
            {
              to: '/reuniao',
              name: 'Atas de Reunião',
              icon: IconMeeting,
              identifier: 'meeting_admin'
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
