import { useEffect, useState } from 'react';
import { Scenario } from '../models/scenario';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ScenarioDashboard from '../../features/scenarios/dashboard/ScenarioDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [selectedScenario, setSelectedScenario] = useState<Scenario | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Scenarios.list()
      .then(response => {
        let scenarios: Scenario[] = [];
        response.forEach(scenario => {
          scenario.dueDate = scenario.dueDate.split('T')[0];
          scenarios.push(scenario);
        })
        setScenarios(scenarios)
        setLoading(false);
      })
  }, [])

  function handleSelectScenario(id: string) {
    setSelectedScenario(scenarios.find(x => x.id === id));
  }

  function handleCancelSelect() {
    setSelectedScenario(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectScenario(id) : handleCancelSelect();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleDeleteScenario(id: string) {
    setSubmitting(true);
    agent.Scenarios.delete(id).then(() => {
      setScenarios([...scenarios.filter(x => x.id !== id)])
      setSubmitting(false);
    })
  }

  function handleCreateOrEditActivity(scenario: Scenario) {
    setSubmitting(true);
    if (scenario.id) {
      agent.Scenarios.update(scenario).then(() => {
        setScenarios([...scenarios.filter(x => x.id !== scenario.id), scenario]);
        setSelectedScenario(scenario);
        setEditMode(false);
        setSubmitting(false);
      })
    } else {
      scenario.id = uuid();
      agent.Scenarios.create(scenario).then(() => {
        setScenarios([...scenarios, scenario]);
        setSelectedScenario(scenario);
        setEditMode(false);
        setSubmitting(false);
      })
    }

  }

  if (loading) return <LoadingComponent content='Loading app...' />

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: '7em' }}>
        <ScenarioDashboard
          scenarios={scenarios}
          selectedScenario={selectedScenario}
          selectScenario={handleSelectScenario}
          cancelSelectScenario={handleCancelSelect}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteScenario={handleDeleteScenario}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;
