import { Menu, Header } from 'semantic-ui-react';
import Calendar from 'react-calendar';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';

export default observer(function ScenarioFilters() {
  const { scenarioStore: { predicate, setPredicate } } = useStore();
  return (
    <>
      <Menu vertical size='large' style={{ width: '100%', marginTop: 25 }}>
        <Header icon='filter' attached color='teal' content='Filters' />
        <Menu.Item
          content='All Scenarios'
          active={predicate.has('all')}
          onClick={() => setPredicate('all', 'true')}
        />
        <Menu.Item
          content="I'm attending"
          active={predicate.has('isAttend')}
          onClick={() => setPredicate('isAttend', 'true')}
        />
        <Menu.Item
          content="I'm hosting"
          active={predicate.has('isHost')}
          onClick={() => setPredicate('isHost', 'true')}
        />
      </Menu>
      <Header icon='calendar' attached color='teal' content='Select date' />
      <Calendar locale="en-GB" />
    </>
  );
})