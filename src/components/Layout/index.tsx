import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import {
  IconClipboard,
  IconDash,
  IconProjects,
  IconMeeting,
  IconTeam,
  IconProducts,
  IconFlux
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
              icon: IconDash
            },
            {
              to: '/projetos',
              name: 'Projetos',
              icon: IconProjects
            },
            {
              to: '/tarefas',
              name: 'Tarefas',
              icon: IconClipboard
            },
            // {
            //   to: '/clientes',
            //   name: 'Clientes',
            //   icon: IconUsers,
            // },
            // {
            //   to: '/usuarios',
            //   name: 'Usuarios',
            //   icon: IconTeam,
            // },
            {
              to: '/servicos',
              name: 'Produtos',
              icon: IconProducts
            },
            {
              to: '/fluxo',
              name: 'Fluxos',
              icon: IconFlux
            },
            {
              to: '/equipe',
              name: 'Equipe',
              icon: IconTeam
            },
            {
              to: '/reuniao',
              name: 'Atas de Reunião',
              icon: IconMeeting
            }
            // {
            //   to: '/tarefas',
            //   name: 'Tarefas',
            //   icon: IconClipboard,
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
