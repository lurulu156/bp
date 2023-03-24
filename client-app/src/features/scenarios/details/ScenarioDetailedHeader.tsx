import { observer } from 'mobx-react-lite';
import { Button, Header, Item, Segment, Image, Label } from 'semantic-ui-react'
import { Scenario } from '../../../app/models/scenario';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';

const scenarioImageStyle = {
  filter: 'brightness(30%)'
};

const scenarioImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white'
};

interface Props {
  scenario: Scenario
}

export default observer(function ScenarioDetailedHeader({ scenario }: Props) {
  const { scenarioStore: { updateAttendeance, loading, cancelScenarioToggle } } = useStore();
  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: '0' }}>
        {scenario.isCancelled &&
          <Label style={{ position: 'absolute', zIndex: 1000, left: -14, top: 20 }}
            ribbon color='red' content='Cancelled' />}
        <Image src={`/assets/categoryImages/${scenario.category}.jpg`} fluid style={scenarioImageStyle} />
        <Segment style={scenarioImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size='huge'
                  content={scenario.title}
                  style={{ color: 'white' }}
                />
                <p>{format(scenario.dueDate!, 'dd MMM yyyy')}</p>
                <p>
                  Hosted by <strong><Link to={`/profiles/${scenario.hostUsername}`}>{scenario.hostUsername}</Link></strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached='bottom'>
        {scenario.isHost ? (
          <>
            <Button
              color={scenario.isCancelled ? 'green' : 'red'}
              floated='left'
              basic
              content={scenario.isCancelled ? 'Re-activate Scenario' : 'Cancel Scenario'}
              onClick={cancelScenarioToggle}
              loading={loading}
            />
            <Button
              as={Link}
              to={`/manage/${scenario.id}`}
              color='orange'
              floated='right'
              disabled={scenario.isCancelled}
            >
              Manage Scenario
            </Button>
          </>

        ) : scenario.isGoing ? (
          <Button onClick={updateAttendeance}
            loading={loading}>Cancel attendance</Button>
        ) : (
          <Button disabled={scenario.isCancelled} onClick={updateAttendeance}
            loading={loading} color='teal'>Join Scenario</Button>
        )}
      </Segment>
    </Segment.Group>
  )
})