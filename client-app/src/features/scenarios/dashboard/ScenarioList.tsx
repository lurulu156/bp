import { Fragment } from "react";
import { Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from 'mobx-react-lite';
import ScenarioListItem from "./ScenarioListItem";

export default observer(function ScenarioList() {
    const { scenarioStore } = useStore();
    const { groupedScenarios } = scenarioStore;

    return (
        <>
            {groupedScenarios.map(([group, scenarios]) => (
                <Fragment key={group}>
                    <Header color='teal'>
                        Cycle {group}
                    </Header>
                    {scenarios && scenarios.map(scenario => (
                        <ScenarioListItem key={scenario.id} scenario={scenario} />
                    ))}
                </Fragment>
            ))}
        </>
    )
})