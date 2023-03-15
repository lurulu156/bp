import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";

export default function NavBar() {
  const { scenarioStore } = useStore()
  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item header>
          <img src='/assets/logo.png' alt='logo' style={{ marginRight: 10 }} />
          Business Process
        </Menu.Item>
        <Menu.Item name='Scenario' />
        <Menu.Item>
          <Button onClick={() => scenarioStore.openForm()} positive content='Create Scenario' />
        </Menu.Item>
      </Container>
    </Menu>
  )
}