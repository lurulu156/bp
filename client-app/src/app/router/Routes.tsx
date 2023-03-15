import { createBrowserRouter, RouteObject } from "react-router-dom";
import ScenarioDashboard from "../../features/scenarios/dashboard/ScenarioDashboard";
import ScenarioDetails from "../../features/scenarios/details/ScenarioDetails";
import ScenarioForm from "../../features/scenarios/form/ScenarioForm";
import App from "../layout/App";

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'scenarios', element: <ScenarioDashboard /> },
      { path: 'scenarios/:id', element: <ScenarioDetails /> },
      { path: 'createScenario', element: <ScenarioForm key='create' /> },
      { path: 'manage/:id', element: <ScenarioForm key='manage' /> },
    ]
  }
]

export const router = createBrowserRouter(routes);