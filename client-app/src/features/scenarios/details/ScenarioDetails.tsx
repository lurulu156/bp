import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ScenarioDetailedChat from "./ScenarioDetailedChat";
import ScenarioDetailedHeader from "./ScenarioDetailedHeader";
import ScenarioDetailedInfo from "./ScenarioDetailedInfo";
import ScenarioDetailedSidebar from "./ScenarioDetailedSidebar";


export default observer(function ScenarioDetails() {
  const { scenarioStore } = useStore();
  const { selectedScenario: scenario, loadScenario, loadingInitial, clearSelectedScenario } = scenarioStore;
  const { id } = useParams();

  useEffect(() => {
    if (id) loadScenario(id);
    return () => clearSelectedScenario();
  }, [clearSelectedScenario, id, loadScenario])

  if (loadingInitial || !scenario) return <LoadingComponent />;

  return (
    <Grid>
      <Grid.Column width='10'>
        <ScenarioDetailedHeader scenario={scenario} />
        <ScenarioDetailedInfo scenario={scenario} />
        <ScenarioDetailedChat scenarioId={scenario.id} />
      </Grid.Column>
      <Grid.Column width='6'>
        <ScenarioDetailedSidebar scenario={scenario} />
      </Grid.Column>
    </Grid>
  )
})