import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default function ScenarioDetails() {
  const { scenarioStore } = useStore();
  const { selectedScenario: scenario, openForm, cancelSelectScenario } = scenarioStore;
  if (!scenario) return <LoadingComponent />;
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${scenario.category}.jpg`} />
      <Card.Content>
        <Card.Header>{scenario.title}</Card.Header>
        <Card.Meta>
          <span>{scenario.dueDate}</span>
        </Card.Meta>
        <Card.Description>
          {scenario.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths='2'>
          <Button onClick={() => openForm(scenario.id)} basic color='blue' content='Edit' />
          <Button onClick={cancelSelectScenario} basic color='grey' content='Cancel' />
        </Button.Group>
      </Card.Content>
    </Card>
  )
}