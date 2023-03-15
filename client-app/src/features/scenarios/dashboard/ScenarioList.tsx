import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Scenario } from "../../../app/models/scenario";

interface Props {
    scenarios: Scenario[];
    selectScenario: (id: string) => void;
    deleteScenario: (id: string) => void;
}

export default function ActivityList({ scenarios, selectScenario, deleteScenario }: Props) {
    return (
        <Segment>
            <Item.Group divided>
                {scenarios.map(scenario => (
                    <Item key={scenario.id}>
                        <Item.Content>
                            <Item.Header as='a'>{scenario.title}</Item.Header>
                            <Item.Meta>{scenario.dueDate}</Item.Meta>
                            <Item.Description>
                                <div>{scenario.description}</div>
                                <div>{scenario.bpCycle}, {scenario.category}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated='right' content='View' color='blue'
                                    onClick={() => selectScenario(scenario.id)} />
                                <Button floated='right' content='Delete' color='red'
                                    onClick={() => deleteScenario(scenario.id)} />
                                <Label basic content={scenario.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}