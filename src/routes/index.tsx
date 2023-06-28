/* eslint-disable import-helpers/order-imports */
import { Routes, Route } from 'react-router-dom';
import { PrivateRoutes } from './PrivateRoutes';

// LAYOUT
import Layout from '../components/Layout';

// PAGES
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import SignIn from '../pages/Login/SignIn';
import SignUp from '../pages/Login/SignUp';
import Clients from '../pages/Clients';
import Users from '../pages/Users';
import Board from '../pages/Board';
import Services from '../pages/Services';
import Team from '../pages/Team/ListTeam';
import ListOffice from '../pages/Team/ListOffice';
import ListFluxo from '../pages/Fluxos/ListFluxo';
import EditFluxo from '../pages/Fluxos/EditFluxo';
import ListProjects from '../pages/Projects/ListProjects';

// COMPONENTES
import ComponentsForms from '../pages/components/ComponentsForms';
import ComponentsPage from '../pages/components/ComponentsPage';
import ComponentTable from '../pages/components/ComponentTable';
import ListMeeting from '../pages/Meeting/ListMeeting';
import TaskList from '../pages/Tasks/TaskList';
import CreateProject from '../pages/Projects/CreateProject';
import CreateTasks from '../pages/Tasks/CreateTasks';

function RoutesAll() {
  return (
    <Routes>
      <Route path="/login" element={<SignIn />} />
      <Route path="/cadastrar" element={<SignUp />} />

      <Route
        path="/"
        element={
          <PrivateRoutes>
            <Layout />
          </PrivateRoutes>
        }
      >
        <Route
          path="/dashboard"
          element={
            <PrivateRoutes>
              <Dashboard />
            </PrivateRoutes>
          }
        />

        <Route
          path="/perfil"
          element={
            <PrivateRoutes>
              <Profile />
            </PrivateRoutes>
          }
        />

        <Route
          path="/usuarios"
          element={
            <PrivateRoutes>
              <Users />
            </PrivateRoutes>
          }
        />

        <Route
          path="/clientes"
          element={
            <PrivateRoutes>
              <Clients />
            </PrivateRoutes>
          }
        />

        <Route
          path="/fluxo"
          element={
            <PrivateRoutes>
              <ListFluxo />
            </PrivateRoutes>
          }
        />

        <Route
          path="/fluxo/editar/:id"
          element={
            <PrivateRoutes>
              <EditFluxo />
            </PrivateRoutes>
          }
        />

        <Route
          path="/equipe"
          element={
            <PrivateRoutes>
              <Team />
            </PrivateRoutes>
          }
        />

        <Route
          path="/equipe/cargos"
          element={
            <PrivateRoutes>
              <ListOffice />
            </PrivateRoutes>
          }
        />

        <Route
          path="/produtos"
          element={
            <PrivateRoutes>
              <Services />
            </PrivateRoutes>
          }
        />

        <Route
          path="/projetos"
          element={
            <PrivateRoutes>
              <ListProjects />
            </PrivateRoutes>
          }
        />

        <Route
          path="/projeto/:id"
          element={
            <PrivateRoutes>
              <Board />
            </PrivateRoutes>
          }
        />

        <Route
          path="/criar-projeto"
          element={
            <PrivateRoutes>
              <CreateProject />
            </PrivateRoutes>
          }
        />

        <Route
          path="/tarefas"
          element={
            <PrivateRoutes>
              <TaskList />
            </PrivateRoutes>
          }
        />

        <Route
          path="/criar-tarefa"
          element={
            <PrivateRoutes>
              <CreateTasks />
            </PrivateRoutes>
          }
        />

        <Route
          path="/reuniao"
          element={
            <PrivateRoutes>
              <ListMeeting />
            </PrivateRoutes>
          }
        />

        <Route
          path="/components"
          element={
            <PrivateRoutes>
              <ComponentsPage />
            </PrivateRoutes>
          }
        />

        <Route
          path="/form"
          element={
            <PrivateRoutes>
              <ComponentsForms />
            </PrivateRoutes>
          }
        />

        <Route
          path="/tabela"
          element={
            <PrivateRoutes>
              <ComponentTable />
            </PrivateRoutes>
          }
        />
      </Route>
    </Routes>
  );
}

export default RoutesAll;
