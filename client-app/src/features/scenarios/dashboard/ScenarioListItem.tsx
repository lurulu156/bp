import { Link } from "react-router-dom";
import { Item, Button, Icon, Segment } from "semantic-ui-react";
import { Scenario } from "../../../app/models/scenario";

interface Props {
  scenario: Scenario
}

export default function ActivityListItem({ scenario }: Props) {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size='tiny' circular src='/assets/user.png' />
            <Item.Content>
              <Item.Header as='a'>{scenario.title}</Item.Header>
              <Item.Description>Hosted by Bob</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name='clock' /> {scenario.dueDate}
          <Icon name='marker' /> {scenario.file}
        </span>
      </Segment>
      <Segment secondary>
        Attendees go here
      </Segment>
      <Segment clearing>
        <span>{scenario.description}</span>
        <Button
          as={Link}
          to={`/activities/${scenario.id}`}
          color='teal'
          floated='right'
          content='View'
        />
      </Segment>
    </Segment.Group>
  )
}