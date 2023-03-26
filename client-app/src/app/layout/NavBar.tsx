import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";
import { Button, Container, Dropdown, Menu, Image } from "semantic-ui-react";
import { useStore } from "../stores/store";

export default observer(function NavBar() {
  const { userStore: { user, logout } } = useStore();
  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item header as={NavLink} to='/'>
          <img src='/assets/logo.png' alt='logo' style={{ marginRight: 10 }} />
          Business Process
        </Menu.Item>
        <Menu.Item as={NavLink} to='/scenarios' name='Scenario' />
        <Menu.Item as={NavLink} to='/errors' name='Errors' />
        <Menu.Item>
          <Button as={NavLink} to='/createScenario' positive content='Create Scenario' />
        </Menu.Item>
        <Menu.Item position='right'>
          <Image avatar spaced='right' src={user?.image || '/assets/user.png'} />
          <Dropdown pointing='top left' text={user?.displayName}>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to={`/profiles/${user?.username}`} text='My Profile' icon='user' />
              <Dropdown.Item onClick={logout} text='Logout' icon='power' />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Container>
    </Menu>
  )
})