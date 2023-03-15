import { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function ScenarioForm() {
  const { scenarioStore } = useStore();
  const { selectedScenario, closeForm, createScenario, updateScenario, loading } = scenarioStore
  const initialState = selectedScenario ?? {
    id: '',
    title: '',
    category: '',
    description: '',
    dueDate: '',
    bpCycle: '',
    file: ''
  }

  const [scenario, setScenario] = useState(initialState);

  function handleSubmit() {
    scenario.id ? updateScenario(scenario) : createScenario(scenario);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setScenario({ ...scenario, [name]: value })
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete='off'>
        <Form.Input placeholder='Title' value={scenario.title} name='title' onChange={handleInputChange} />
        <Form.TextArea placeholder='Description' value={scenario.description} name='description' onChange={handleInputChange} />
        <Form.Input placeholder='Category' value={scenario.category} name='category' onChange={handleInputChange} />
        <Form.Input placeholder='DueDate' type='date' value={scenario.dueDate} name='dueDate' onChange={handleInputChange} />
        <Form.Input placeholder='BPCycle' defaultValue={scenario.bpCycle} name='BPCycle' onChange={handleInputChange} />
        <Form.Input placeholder='File' value={scenario.file} name='file' onChange={handleInputChange} />
        <Button loading={loading} floated='right' positive type='submit' content='Submit' />
        <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
      </Form>
    </Segment>
  )
})