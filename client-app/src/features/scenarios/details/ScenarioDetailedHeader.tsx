import { observer } from 'mobx-react-lite';
import { Button, Header, Item, Segment, Image } from 'semantic-ui-react'
import { Scenario } from '../../../app/models/scenario';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

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
  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: '0' }}>
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
                  Hosted by <strong>Bob</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached='bottom'>
        <Button color='teal'>Join Scenario</Button>
        <Button>Cancel attendance</Button>
        <Button as={Link} to={`/manage/${scenario.id}`} color='orange' floated='right'>
          Manage Scenario
        </Button>
      </Segment>
    </Segment.Group>
  )
})