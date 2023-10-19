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
import Products from '../pages/Products';
import Team from '../pages/Team/ListTeam';
import ListOffice from '../pages/Team/ListOffice';
import ListFluxo from '../pages/Fluxos/ListFluxo';
import EditFluxo from '../pages/Fluxos/EditFluxo';
import ListProjects from '../pages/Projects/ListProjects';
import PageNotFound from '../pages/NotFound';
import Board from '../pages/Board';

// COMPONENTES
import ListMeeting from '../pages/Meeting/ListMeeting';
import TaskList from '../pages/Tasks/TaskList';
import CreateProject from '../pages/Projects/CreateProject';
import CreateTasks from '../pages/Tasks/CreateTasks';
import ViewTaskList from '../pages/Tasks/ViewYourTasks';
import WorkingProduct from '../pages/Products/WorkingProduct';
import ViewDelivery from '../pages/Tasks/ViewDelivery';
import ViewProductsDeliveries from '../pages/Products/ViewProduct';
import Requests from '../pages/Requests/ListRequests';
import ViewRequest from '../pages/Requests/ViewRequests';
import InstanceLogin from '../pages/Login/InstanceLogin';
import ViewTask from '../pages/Tasks/ViewTask';

function RoutesAll() {
  return (
    <Routes>
      <Route path="/login/:slug" element={<InstanceLogin />} />

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
          path="/fluxo/:id"
          element={
            <PrivateRoutes>
              <Board />
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
          path="/entrega/:id"
          element={
            <PrivateRoutes>
              <ViewProductsDeliveries />
            </PrivateRoutes>
          }
        />

        <Route
          path="/produtos"
          element={
            <PrivateRoutes>
              <Products />
            </PrivateRoutes>
          }
        />

        <Route
          path="/produto/:id"
          element={
            <PrivateRoutes>
              <WorkingProduct />
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
          path="/criar-projeto"
          element={
            <PrivateRoutes>
              <CreateProject />
            </PrivateRoutes>
          }
        />

        <Route
          path="/solicitacoes"
          element={
            <PrivateRoutes>
              <Requests />
            </PrivateRoutes>
          }
        />

        <Route
          path="/solicitacao/:id"
          element={
            <PrivateRoutes>
              <ViewRequest />
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
          path="/tarefa/:id"
          element={
            <PrivateRoutes>
              <ViewTask />
            </PrivateRoutes>
          }
        />

        <Route
          path="/entregas/:id"
          element={
            <PrivateRoutes>
              <ViewDelivery />
            </PrivateRoutes>
          }
        />

        <Route
          path="/minhas-tarefas"
          element={
            <PrivateRoutes>
              <ViewTaskList />
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
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default RoutesAll;
