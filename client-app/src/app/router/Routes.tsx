import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import TestErrors from "../../features/errors/TestError";
import ProfilePage from "../../features/profiles/ProfilePage";
import ScenarioDashboard from "../../features/scenarios/dashboard/ScenarioDashboard";
import ScenarioDetails from "../../features/scenarios/details/ScenarioDetails";
import ScenarioForm from "../../features/scenarios/form/ScenarioForm";
import App from "../layout/App";
import RequireAuth from "./RequireAuth";

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <RequireAuth />, children: [
          { path: 'scenarios', element: <ScenarioDashboard /> },
          { path: 'scenarios/:id', element: <ScenarioDetails /> },
          { path: 'createScenario', element: <ScenarioForm key='create' /> },
          { path: 'manage/:id', element: <ScenarioForm key='manage' /> },
          { path: 'profiles/:username', element: <ProfilePage /> },
          { path: 'errors', element: <TestErrors /> }
        ]
      },
      { path: 'not-found', element: <NotFound /> },
      { path: 'server-error', element: <ServerError /> },
      { path: '*', element: <Navigate replace to='/not-found' /> },
    ]
  }
]

export const router = createBrowserRouter(routes);