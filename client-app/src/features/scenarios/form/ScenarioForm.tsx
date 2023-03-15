import { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Scenario } from "../../../app/models/scenario";

interface Props {
  scenario: Scenario | undefined;
  closeForm: () => void;
  createOrEdit: (scenario: Scenario) => void;
}

export default function ActivityForm({ scenario: selectedScenario, closeForm, createOrEdit }: Props) {

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
    createOrEdit(scenario);
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
        <Form.Input placeholder='DueDate' value={scenario.dueDate} name='dueDate' onChange={handleInputChange} />
        <Form.Input placeholder='BPCycle' value={scenario.bpCycle} name='BPCycle' onChange={handleInputChange} />
        <Form.Input placeholder='File' value={scenario.file} name='file' onChange={handleInputChange} />
        <Button floated='right' positive type='submit' content='Submit' />
        <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
      </Form>
    </Segment>
  )
}