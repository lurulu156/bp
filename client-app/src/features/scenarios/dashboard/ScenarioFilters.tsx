import { Menu, Header } from 'semantic-ui-react';
import Calendar from 'react-calendar';

export default function ScenarioFilters() {
  return (
    <>
      <Menu vertical size='large' style={{ width: '100%', marginTop: 25 }}>
        <Header icon='filter' attached color='teal' content='Filters' />
        <Menu.Item content='All Scenarios' />
        <Menu.Item content="I'm attending" />
        <Menu.Item content="I'm hosting" />
      </Menu>
      <Header icon='calendar' attached color='teal' content='Select date' />
      <Calendar locale="en-GB" />
    </>
  );
}