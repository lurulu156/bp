import { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ScenarioDashboard from '../../features/scenarios/dashboard/ScenarioDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const { scenarioStore } = useStore();

  useEffect(() => {
    scenarioStore.loadScenarios();
  }, [scenarioStore])

  if (scenarioStore.loadingInitial) return <LoadingComponent content='Loading app...' />

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <ScenarioDashboard />
      </Container>
    </>
  );
}

export default observer(App);
