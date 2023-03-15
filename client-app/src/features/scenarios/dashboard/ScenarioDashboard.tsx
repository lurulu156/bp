import { Grid } from "semantic-ui-react";
import { Scenario } from "../../../app/models/scenario";
import ScenarioDetails from "../details/ScenarioDetails";
import ScenarioForm from "../form/ScenarioForm";
import ScenarioList from "./ScenarioList";


interface Props {
  scenarios: Scenario[];
  selectedScenario: Scenario | undefined;
  selectScenario: (id: string) => void;
  cancelSelectScenario: () => void;
  openForm: (id: string) => void;
  closeForm: () => void;
  editMode: boolean;
  createOrEdit: (scenario: Scenario) => void;
  deleteScenario: (id: string) => void;
}


export default function ActivityDashboard({ scenarios, selectedScenario, selectScenario,
  cancelSelectScenario, openForm, closeForm, editMode, createOrEdit, deleteScenario }: Props) {
  return (
    <Grid>
      <Grid.Column width='10'>
        <ScenarioList
          scenarios={scenarios}
          selectScenario={selectScenario}
          deleteScenario={deleteScenario}
        />
      </Grid.Column>
      <Grid.Column width='6'>
        {selectedScenario && !editMode &&
          <ScenarioDetails
            scenario={selectedScenario}
            cancelSelectScenario={cancelSelectScenario}
            openForm={openForm}
          />}
        {editMode &&
          <ScenarioForm
            closeForm={closeForm}
            scenario={selectedScenario}
            createOrEdit={createOrEdit} />}
      </Grid.Column>

    </Grid>
  )
}