import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";


export default observer(function ScenarioDetails() {
  const { scenarioStore } = useStore();
  const { selectedScenario: scenario, loadScenario, loadingInitial } = scenarioStore;
  const { id } = useParams();

  useEffect(() => {
    if (id) loadScenario(id);
  }, [id, loadScenario])

  if (loadingInitial || !scenario) return <LoadingComponent />;

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
          <Button as={Link} to={`/manage/${scenario.id}`} basic color='blue' content='Edit' />
          <Button as={Link} to='/scenarios' basic color='grey' content='Cancel' />
        </Button.Group>
      </Card.Content>
    </Card>
  )
})