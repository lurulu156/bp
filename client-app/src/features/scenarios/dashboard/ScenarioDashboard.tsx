import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ScenarioList from "./ScenarioList";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default observer(function ScenarioDashboard() {
  const { scenarioStore } = useStore();
  const { loadScenarios, scenarioRegistry } = scenarioStore;

  useEffect(() => {
    if (scenarioRegistry.size <= 1) loadScenarios();
  }, [loadScenarios, scenarioRegistry.size])

  if (scenarioStore.loadingInitial) return <LoadingComponent content='Loading app...' />

  return (
    <Grid>
      <Grid.Column width='10'>
        <ScenarioList />
      </Grid.Column>
      <Grid.Column width='6'>
        <h2>Scenario filters</h2>
      </Grid.Column>
    </Grid>
  )
})