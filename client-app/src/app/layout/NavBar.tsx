import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";

export default function NavBar() {
  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item header as={NavLink} to='/'>
          <img src='/assets/logo.png' alt='logo' style={{ marginRight: 10 }} />
          Business Process
        </Menu.Item>
        <Menu.Item as={NavLink} to='/scenarios' name='Scenario' />
        <Menu.Item>
          <Button as={NavLink} to='/createScenario' positive content='Create Scenario' />
        </Menu.Item>
      </Container>
    </Menu>
  )
}