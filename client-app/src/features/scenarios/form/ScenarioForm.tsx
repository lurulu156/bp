import { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { v4 as uuid } from 'uuid';
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default observer(function ScenarioForm() {
  const { scenarioStore } = useStore();
  const { selectedScenario, createScenario, updateScenario, loading, loadScenario, loadingInitial } = scenarioStore;
  const { id } = useParams();
  const navigate = useNavigate();

  const [scenario, setScenario] = useState({
    id: '',
    title: '',
    category: '',
    description: '',
    dueDate: '',
    bpCycle: '',
    file: ''
  });

  useEffect(() => {
    if (id) loadScenario(id).then(scenario => setScenario(scenario!));
  }, [id, loadScenario]);

  function handleSubmit() {
    if (!scenario.id) {
      scenario.id = uuid();
      createScenario(scenario).then(() => navigate(`/scenarios/${scenario.id}`))
    } else {
      updateScenario(scenario).then(() => navigate(`/scenarios/${scenario.id}`))
    }
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setScenario({ ...scenario, [name]: value })
  }

  if (loadingInitial) return <LoadingComponent content='Loading scenario...' />

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
        <Button as={Link} to='/scenarios' floated='right' type='button' content='Cancel' />
      </Form>
    </Segment>
  )
})