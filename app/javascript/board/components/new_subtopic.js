import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardBlock, CardTitle, Form, FormGroup, Input, Label } from 'reactstrap';

class NewSubtopic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        description: null,
      },
    };
  }

  onSubmitForm = (event) => {
    const { createNewSubtopic } = this.props;
    const { formData } = this.state;

    event.preventDefault();
    createNewSubtopic(formData);
  };

  onDescriptionChange = (event) => {
    const newDescription = event.currentTarget.value;
    this.setState({ formData: { ...this.state.formData, description: newDescription } });
  };

  onCancel = () => {
    const { cancelNewSubtopic } = this.props;

    cancelNewSubtopic();
  };

  render() {
    return (
      <Card>
        <CardBlock>
          <CardTitle>New Subtopic</CardTitle>
          <Form onSubmit={this.onSubmitForm}>
            <FormGroup>
              <Label for="subtopicDescription">Description</Label>
              <Input type="text" name="description" id="subtopicDescription" onChange={this.onDescriptionChange} />
            </FormGroup>
            <Button color="primary" className="mr-2">Create</Button>
            <Button color="secondary" onClick={this.onCancel}>Cancel</Button>
          </Form>
        </CardBlock>
      </Card>
    );
  }
}

NewSubtopic.propTypes = {
  createNewSubtopic: PropTypes.func.isRequired,
  cancelNewSubtopic: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

export default NewSubtopic;
