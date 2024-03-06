/* eslint-disable import-helpers/order-imports */
import { Routes, Route } from 'react-router-dom';
import { PrivateRoutes } from './PrivateRoutes';

// LAYOUT
import Layout from '../components/Layout';

// PAGES
import Dashboard from '../pages/Dashboard';
import SignIn from '../pages/Login/SignIn';
import SignUp from '../pages/Login/SignUp';
import Clients from '../pages/Clients';
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
import ViewDelivery from '../pages/Tasks/ViewDelivery';
import ViewProductsDeliveries from '../pages/Products/ViewProduct';
import Requests from '../pages/Requests/ListRequests';
import ViewRequest from '../pages/Requests/ViewRequests';
import InstanceLogin from '../pages/Login/InstanceLogin';
import ViewTask from '../pages/Tasks/ViewTask';
import Parameters from '../pages/Parameters';
import MonthlyReport from '../pages/Reports';
import CreateTaksWithRefused from '../pages/Tasks/RefusedTask';

// Hooks
import { useAuth } from '../hooks/AuthContext';
import TemplateAgenda from '../pages/Template';

function RoutesAll() {
  const { user } = useAuth();
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
        {user?.permissions?.includes('jobs_clients_view') && (
          <Route
            path="/clientes"
            element={
              <PrivateRoutes>
                <Clients />
              </PrivateRoutes>
            }
          />
        )}

        {!user?.permissions?.includes('jobs_projects_add') && (
          <Route
            path="/criar-projeto"
            element={
              <PrivateRoutes>
                <CreateProject />
              </PrivateRoutes>
            }
          />
        )}

        {user?.permissions?.includes('jobs_tasks_add') && (
          <Route
            path="/criar-tarefa"
            element={
              <PrivateRoutes>
                <CreateTasks />
              </PrivateRoutes>
            }
          />
        )}

        <Route
          path="/dashboard"
          element={
            <PrivateRoutes>
              <Dashboard />
            </PrivateRoutes>
          }
        />

        {user?.permissions?.includes('jobs_tasks_view') && (
          <Route
            path="/entrega/:id"
            element={
              <PrivateRoutes>
                <ViewProductsDeliveries />
              </PrivateRoutes>
            }
          />
        )}

        <Route
          path="/entregas/:id"
          element={
            <PrivateRoutes>
              <ViewDelivery />
            </PrivateRoutes>
          }
        />

        {user?.permissions?.includes('jobs_team_view') && (
          <Route
            path="/equipe"
            element={
              <PrivateRoutes>
                <Team />
              </PrivateRoutes>
            }
          />
        )}

        <Route
          path="/equipe/cargos"
          element={
            <PrivateRoutes>
              <ListOffice />
            </PrivateRoutes>
          }
        />

        {user?.permissions?.includes('jobs_flow_view') && (
          <Route
            path="/fluxo"
            element={
              <PrivateRoutes>
                <ListFluxo />
              </PrivateRoutes>
            }
          />
        )}

        {user?.permissions?.includes('jobs_flow_view') && (
          <Route
            path="/fluxo/:id"
            element={
              <PrivateRoutes>
                <Board />
              </PrivateRoutes>
            }
          />
        )}

        {user?.permissions?.includes('jobs_flow_edit') && (
          <Route
            path="/fluxo/editar/:id"
            element={
              <PrivateRoutes>
                <EditFluxo />
              </PrivateRoutes>
            }
          />
        )}

        {user?.permissions?.includes('jobs_tasks_view') && (
          <Route
            path="/minhas-tarefas"
            element={
              <PrivateRoutes>
                <ViewTaskList />
              </PrivateRoutes>
            }
          />
        )}

        {user?.permissions?.includes('jobs_tasks_add') && (
          <Route
            path="/nova-tarefa"
            element={
              <PrivateRoutes>
                <CreateTaksWithRefused />
              </PrivateRoutes>
            }
          />
        )}

        <Route
          path="/parametros"
          element={
            <PrivateRoutes>
              <Parameters />
            </PrivateRoutes>
          }
        />

        {/* <Route
          path="/perfil"
          element={
            <PrivateRoutes>
              <Profile />
            </PrivateRoutes>
          }
        /> */}

        {user?.permissions?.includes('jobs_products_view') && (
          <Route
            path="/produtos"
            element={
              <PrivateRoutes>
                <Products />
              </PrivateRoutes>
            }
          />
        )}

        {/* <Route
          path="/produto/:id"
          element={
            <PrivateRoutes>
              <WorkingProduct updateInfos={() => ''} />
            </PrivateRoutes>
          }
        /> */}

        {user?.permissions?.includes('jobs_projects_view') && (
          <Route
            path="/projetos"
            element={
              <PrivateRoutes>
                <ListProjects />
              </PrivateRoutes>
            }
          />
        )}

        {user?.permissions?.includes('jobs_tasks_report') && (
          <Route
            path="/relatorio"
            element={
              <PrivateRoutes>
                <MonthlyReport />
              </PrivateRoutes>
            }
          />
        )}

        {user?.permissions?.includes('jobs_meetings_view') && (
          <Route
            path="/reuniao"
            element={
              <PrivateRoutes>
                <ListMeeting />
              </PrivateRoutes>
            }
          />
        )}

        {user?.permissions?.includes('ticket_cats_view') && (
          <Route
            path="/solicitacoes"
            element={
              <PrivateRoutes>
                <Requests />
              </PrivateRoutes>
            }
          />
        )}

        {user?.permissions?.includes('ticket_cats_view') && (
          <Route
            path="/solicitacao/:id"
            element={
              <PrivateRoutes>
                <ViewRequest />
              </PrivateRoutes>
            }
          />
        )}

        {user?.permissions?.includes('jobs_tasks_view') && (
          <Route
            path="/tarefas"
            element={
              <PrivateRoutes>
                <TaskList />
              </PrivateRoutes>
            }
          />
        )}

        {user?.permissions?.includes('jobs_tasks_view') && (
          <Route
            path="/tarefa/:id"
            element={
              <PrivateRoutes>
                <ViewTask />
              </PrivateRoutes>
            }
          />
        )}

        <Route
          path="/templates"
          element={
            <PrivateRoutes>
              <TemplateAgenda />
            </PrivateRoutes>
          }
        />

        {/* <Route
          path="/usuarios"
          element={
            <PrivateRoutes>
              <Users />
            </PrivateRoutes>
          }
        /> */}
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default RoutesAll;
