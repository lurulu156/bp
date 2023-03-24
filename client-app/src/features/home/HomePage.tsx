import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from "semantic-ui-react";

export default function HomePage() {
  return (
    <Segment inverted textAlign='center' vertical className='masthead' >
      <Container text>
        <Header as='h1' inverted>
          <Image size='massive' src='/assets/logo.png' alt='logo' style={{ marginBottom: 12 }} />
          Scenarios
        </Header>
        <Header as='h2' inverted content='Welcome to Business Process' />
        <Button as={Link} to='/scenarios' size='huge' inverted>
          Take me to the scenarios!
        </Button>
      </Container>
    </Segment>
  )
}