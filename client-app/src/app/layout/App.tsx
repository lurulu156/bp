import { useEffect, useState } from 'react';
import axios from 'axios';
import { Scenario } from '../models/scenario';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ScenarioDashboard from '../../features/scenarios/dashboard/ScenarioDashboard';
import { v4 as uuid } from 'uuid';

function App() {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [selectedScenario, setSelectedScenario] = useState<Scenario | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Scenario[]>('http://localhost:5000/api/v0/scenarios')
      .then(response => {
        setScenarios(response.data);
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
    setScenarios([...scenarios.filter(x => x.id !== id)])
  }

  function handleCreateOrEditActivity(scenario: Scenario) {
    scenario.id
      ? setScenarios([...scenarios.filter(x => x.id !== scenario.id), scenario])
      : setScenarios([...scenarios, { ...scenario, id: uuid() }]);
    setEditMode(false);
    setSelectedScenario(scenario);
  }


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
        />
      </Container>
    </>
  );
}

export default App;
