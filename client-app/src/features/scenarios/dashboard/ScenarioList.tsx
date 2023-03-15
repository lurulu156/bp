import { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from 'mobx-react-lite';

export default observer(function ActivityList() {
    const { scenarioStore } = useStore();
    const { deleteScenario, scenariosByDate, loading } = scenarioStore;
    const [target, setTarget] = useState('');

    function handleDeleteActivity(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteScenario(id);
    }

    return (
        <Segment>
            <Item.Group divided>
                {scenariosByDate.map(scenario => (
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
                                    onClick={() => scenarioStore.selectScenario(scenario.id)} />
                                <Button floated='right' content='Delete' color='red'
                                    loading={loading && target === scenario.id}
                                    name={scenario.id}
                                    onClick={(e) => handleDeleteActivity(e, scenario.id)} />
                                <Label basic content={scenario.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})