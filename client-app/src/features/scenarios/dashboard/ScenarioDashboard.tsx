import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ScenarioDetails from "../details/ScenarioDetails";
import ScenarioForm from "../form/ScenarioForm";
import ScenarioList from "./ScenarioList";
import { observer } from "mobx-react-lite";

export default observer(function ScenarioDashboard() {
  const { scenarioStore } = useStore();
  const { selectedScenario, editMode } = scenarioStore;
  return (
    <Grid>
      <Grid.Column width='10'>
        <ScenarioList />
      </Grid.Column>
      <Grid.Column width='6'>
        {selectedScenario && !editMode &&
          <ScenarioDetails />}
        {editMode &&
          <ScenarioForm />}
      </Grid.Column>
    </Grid>
  )
})