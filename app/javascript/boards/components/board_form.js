import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardBlock, CardHeader, CardFooter, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';

class BoardForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        topic: null,
        description: null,
      },
    };
  }

  onSubmitForm = (event) => {
    const { saveBoard } = this.props;
    const { formData } = this.state;

    event.preventDefault();
    saveBoard(formData);
  };

  onTopicChange = (event) => {
    const newTopic = event.currentTarget.value;
    this.setState({ formData: { ...this.state.formData, topic: newTopic } });
  };

  onDescriptionChange = (event) => {
    const newDescription = event.currentTarget.value;
    this.setState({ formData: { ...this.state.formData, description: newDescription } });
  };

  onCancel = () => {
    const { cancelBoard } = this.props;

    cancelBoard();
  };

  renderTopicInput = () => {
    let topicErrors;
    const { topic: error } = this.props.errors || {};
    const inputProps = {
      type: 'text',
      name: 'topic',
      id: 'boardTopic',
      onChange: this.onTopicChange,
    };
    const formGroupProps = {};
    if (error) {
      formGroupProps.color = 'danger';
      inputProps.color = 'danger';
      topicErrors = <FormFeedback>{error}</FormFeedback>;
    }

    return (
      <FormGroup {...formGroupProps}>
        <Label for="boardTopic">Topic</Label>
        <Input {...inputProps} />
        {topicErrors}
      </FormGroup>
    );
  };

  render() {
    const { boardFormTitle, saveBoardButtonText } = this.props;

    return (
      <Card>
        <CardHeader>{boardFormTitle}</CardHeader>
        <Form onSubmit={this.onSubmitForm}>
          <CardBlock>
            {this.renderTopicInput()}
            <FormGroup>
              <Label for="boardDescription">Description</Label>
              <Input type="text" name="description" id="boardDescription" onChange={this.onDescriptionChange} />
            </FormGroup>
          </CardBlock>
          <CardFooter>
            <Button color="primary" className="mr-2">{saveBoardButtonText}</Button>
            <Button color="secondary" onClick={this.onCancel}>Cancel</Button>
          </CardFooter>
        </Form>
      </Card>
    );
  }
}

BoardForm.propTypes = {
  boardFormTitle: PropTypes.string.isRequired,
  saveBoardButtonText: PropTypes.string.isRequired,
  saveBoard: PropTypes.func.isRequired,
  cancelBoard: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

export default BoardForm;