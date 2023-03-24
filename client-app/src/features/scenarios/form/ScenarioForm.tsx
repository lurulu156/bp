import { useEffect, useState } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { v4 as uuid } from 'uuid';
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Scenario } from "../../../app/models/scenario";
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import MyTextInput from "../../../common/form/MyTextInput";
import MyTextAreaInput from "../../../common/form/MyTextArea";
import MySelectInput from "../../../common/form/MySelectInput";
import MyDateInput from "../../../common/form/MyDateInput";
import { categoryOptions } from "../../../common/options/categoryOptions";

export default observer(function ScenarioForm() {
  const { scenarioStore } = useStore();
  const { createScenario, updateScenario, loading, loadScenario, loadingInitial } = scenarioStore;
  const { id } = useParams();
  const navigate = useNavigate();

  const [scenario, setScenario] = useState<Scenario>({
    id: '',
    title: '',
    category: '',
    description: '',
    dueDate: null,
    bpCycle: '',
    file: ''
  });

  const validationSchema = Yup.object({
    title: Yup.string().required('The event title is required'),
    category: Yup.string().required('The event category is required'),
    description: Yup.string().required(),
    dueDate: Yup.string().required('Date is required').nullable(),
    bpCycle: Yup.string().required(),
    file: Yup.string().required(),
  });

  useEffect(() => {
    if (id) loadScenario(id).then(scenario => setScenario(scenario!));
  }, [id, loadScenario]);

  function handleFormSubmit(scenario: Scenario) {
    if (scenario.id.length === 0) {
      let newScenario = {
        ...scenario,
        id: uuid()
      };
      createScenario(newScenario).then(() => navigate(`/scenarios/${newScenario.id}`))
    } else {
      updateScenario(scenario).then(() => navigate(`/scenarios/${scenario.id}`))
    }
  }

  if (loadingInitial) return <LoadingComponent content='Loading scenario...' />

  return (
    <Segment clearing>
      <Header content='Scenario Details' sub color='teal' />
      <Formik
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={scenario}
        onSubmit={values => handleFormSubmit(values)}>
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
            <MyTextInput name='title' placeholder='Title' />
            <MyTextAreaInput rows={3} name='description' placeholder='Description' />
            <MySelectInput options={categoryOptions} name='category' placeholder='Category' />
            <MyDateInput name='dueDate' placeholderText='Due Date' showTimeSelect timeCaption='time' dateFormat='MMMM d, yyyy h:mm aa' />

            <Header content='Other Details' sub color='teal' />
            <MyTextInput name='fileLink' placeholder='File Link' />
            <MyTextInput name='bpCycle' placeholder='BP Cycle' />

            <Button disabled={isSubmitting || !dirty || !isValid} loading={loading} floated='right' positive type='submit' content='Submit' />
            <Button as={Link} to='/scenarios' floated='right' type='button' content='Cancel' />
          </Form>
        )}
      </Formik>
    </Segment>
  )
})