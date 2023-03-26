import { SyntheticEvent, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Tab, Grid, Header, Card, Image, TabProps } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useStore } from "../../app/stores/store";
import { UserScenario } from '../../app/models/profile';

const panes = [
  { menuItem: 'Future Scenarios', pane: { key: 'future' } },
  { menuItem: 'Past Scenarios', pane: { key: 'past' } },
  { menuItem: 'Hosting', pane: { key: 'hosting' } }
];

export default observer(function ProfileScenarios() {
  const { profileStore } = useStore();
  const {
    loadUserScenarios,
    profile,
    loadingScenarios,
    userScenarios
  } = profileStore;

  useEffect(() => {
    loadUserScenarios(profile!.username);
  }, [loadUserScenarios, profile]);

  const handleTabChange = (e: SyntheticEvent, data: TabProps) => {
    loadUserScenarios(profile!.username, panes[data.activeIndex as number].pane.key);
  };

  return (
    <Tab.Pane loading={loadingScenarios}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated='left' icon='calendar' content={'Scenarios'} />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            panes={panes}
            menu={{ secondary: true, pointing: true }}
            onTabChange={(e, data) => handleTabChange(e, data)}
          />
          <br />
          <Card.Group itemsPerRow={4}>
            {userScenarios.map((scenario: UserScenario) => (
              <Card
                as={Link}
                to={`/scenarios/${scenario.id}`}
                key={scenario.id}
              >
                <Image
                  src={`/assets/categoryImages/${scenario.category}.jpg`}
                  style={{ minHeight: 100, objectFit: 'cover' }}
                />
                <Card.Content>
                  <Card.Header textAlign='center'>{scenario.title}</Card.Header>
                  <Card.Meta textAlign='center'>
                    <div>{format(new Date(scenario.dueDate), 'h:mm a')}</div>
                    <div>{format(new Date(scenario.dueDate), 'do LLL')}</div>
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
});