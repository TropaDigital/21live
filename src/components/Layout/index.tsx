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
              identifier: 'dashboard'
            },
            {
              to: '/projetos',
              name: 'Projetos',
              icon: IconProjects,
              identifier: 'project'
            },
            {
              to: '/tarefas',
              name: 'Tarefas',
              icon: IconClipboard,
              identifier: 'task'
            },
            {
              to: '/clientes',
              name: 'Clientes',
              icon: IconUsers,
              identifier: 'client'
            },
            {
              to: '/produtos',
              name: 'Produtos',
              icon: IconProducts,
              identifier: 'products'
            },
            {
              to: '/fluxo',
              name: 'Fluxos',
              icon: IconFlux,
              identifier: 'flow'
            },
            {
              to: '/equipe',
              name: 'Equipe',
              icon: IconTeam,
              identifier: 'team'
            },
            {
              to: '/reuniao',
              name: 'Atas de Reunião',
              icon: IconMeeting,
              identifier: 'meeting'
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
