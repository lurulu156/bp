import { useEffect, useState } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { v4 as uuid } from 'uuid';
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { ScenarioFormValues } from "../../../app/models/scenario";
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import MyTextArea from "../../../app/common/form/MyTextArea";

export default observer(function ScenarioForm() {
  const { scenarioStore } = useStore();
  const { createScenario, updateScenario, loadScenario, loadingInitial } = scenarioStore;
  const { id } = useParams();
  const navigate = useNavigate();
  const [scenario, setScenario] = useState<ScenarioFormValues>(new ScenarioFormValues());

  const validationSchema = Yup.object({
    title: Yup.string().required('The event title is required'),
    category: Yup.string().required('The event category is required'),
    description: Yup.string().required(),
    dueDate: Yup.string().required('Date is required').nullable(),
    bpCycle: Yup.string().required(),
    file: Yup.string().required(),
  });

  useEffect(() => {
    if (id) loadScenario(id).then(scenario => setScenario(new ScenarioFormValues(scenario)));
  }, [id, loadScenario]);

  function handleFormSubmit(scenario: ScenarioFormValues) {
    if (!scenario.id) {
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
            <MyTextArea rows={3} name='description' placeholder='Description' />
            <MySelectInput options={categoryOptions} name='category' placeholder='Category' />
            <MyDateInput name='dueDate' placeholderText='Due Date' showTimeSelect timeCaption='time' dateFormat='MMMM d, yyyy h:mm aa' />

            <Header content='Other Details' sub color='teal' />
            <MyTextInput name='file' placeholder='File Link' />
            <MyTextInput name='bpCycle' placeholder='BP Cycle' />
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={isSubmitting}
              floated='right'
              positive
              type='submit'
              content='Submit' />
            <Button as={Link} to='/scenarios' floated='right' type='button' content='Cancel' />
          </Form>
        )}
      </Formik>
    </Segment>
  )
})