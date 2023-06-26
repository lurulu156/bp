import { Link } from "react-router-dom";
import { Item, Button, Icon, Segment, Label } from "semantic-ui-react";
import { Scenario } from "../../../app/models/scenario";
import { format } from "date-fns";
import { observer } from 'mobx-react-lite';
import ScenarioListItemAttendee from "./ScenarioListItemAttendee";

interface Props {
  scenario: Scenario
}

export default observer(function ScenarioListItem({ scenario }: Props) {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            {scenario.isCancelled &&
              <Label attached="top" color="red" content={`${scenario.title} is Cancelled`} style={{ textAlign: 'center' }} />}
            <Item.Image size='tiny' circular src={scenario.host?.image || '/assets/user.png'} />
            <Item.Content>
              <Item.Header as={Link} to={`/scenarios/${scenario.id}`}>
                {scenario.title}
              </Item.Header>
              <Item.Description>Hosted by <Link to={`/profiles/${scenario.hostUsername}`}>{scenario.host?.displayName}</Link></Item.Description>
              {scenario.isHost && (
                <Item.Description>
                  <Label basic color='orange'>
                    You are hosting this scenario!
                  </Label>
                </Item.Description>
              )}
              {scenario.isGoing && !scenario.isHost && (
                <Item.Description>
                  <Label basic color='green'>
                    You are attending to this scenario!
                  </Label>
                </Item.Description>
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name='clock' />{`${format(scenario.dueDate!, 'dd MMM yyyy h:mm aa') } `}
          <Icon name='flag' />{`${scenario.category} `}
          <Icon name='file alternate' />{`${scenario.file} `}
        </span>
      </Segment>
      <Segment secondary>
        <ScenarioListItemAttendee attendees={scenario.attendees!} />
      </Segment>
      <Segment clearing>
        <span>{scenario.description}</span>
        <Button
          as={Link}
          to={`/scenarios/${scenario.id}`}
          color='teal'
          floated='right'
          content='View'
        />
      </Segment>
    </Segment.Group>
  )
})