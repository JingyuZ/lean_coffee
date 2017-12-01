import React, { Component } from 'react';
import { Button } from 'reactstrap';

import SubtopicGroup from './subtopic_group';
import { get, post } from '../../shared/api_helper';
import NewSubtopic from './new_subtopic';

class App extends Component {
  constructor(props) {
    super(props);
    const boardId = document.querySelector('.js-board-id').dataset.boardId;

    this.state = {
      id: boardId,
      topic: null,
      description: null,
      subtopicGroups: [],
      newSubtopic: false,
      newSubtopicErrors: null,
    };
  }

  componentDidMount = () => {
    const setState = this.setState.bind(this);

    get(`/boards/${this.state.id}`).then(function(data) {
      setState({
        topic: data.topic,
        description: data.description,
        subtopicGroups: data.subtopic_groups,
      });
    });
  };

  onClickNewSubtopic = () => {
    if (!this.state.newSubtopic) {
      this.setState({ newSubtopic: true })
    }
  };

  onVote = (subtopicId) => {
    post(`/subtopics/${subtopicId}/vote`);
  };

  createNewSubtopic = (subtopicInfo) => {
    const { id, subtopicGroups } = this.state;
    const params = { subtopic: subtopicInfo, board_id: id };
    post('/subtopics', params)
      .then((data) => {
        const newSubtopicGroup = { subtopics: [data.subtopic], votes: 0 };
        this.setState({ subtopicGroups: subtopicGroups.concat(newSubtopicGroup), newSubtopic: false, newSubtopicErrors: null });
      });
  };

  cancelNewSubtopic = () => {
    this.setState({ newSubtopic: false, newSubtopicErrors: null });
  };

  render() {
    const { topic, description, subtopicGroups, newSubtopic, newSubtopicErrors } = this.state;

    return (
      <div>
        <header className="d-flex flex-row justify-content-between align-items-center">
          <h1>Topic: {topic}</h1>
          <Button color="success" onClick={this.onClickNewSubtopic} disabled={newSubtopic}>
            <i className="fa fa-plus-circle mr-1" aria-hidden="true"></i>
            Create Subtopic
          </Button>
        </header>
        {description && <p className="mb-4">Description: {description}</p>}
        <h2>Subtopics</h2>
        {subtopicGroups.map((subtopicGroup, index) => (<SubtopicGroup className="mb-2" key={index} subtopics={subtopicGroup.subtopics} onVote={this.onVote} votes={subtopicGroup.votes}/>))}
        {newSubtopic && <NewSubtopic createNewSubtopic={this.createNewSubtopic} cancelNewSubtopic={this.cancelNewSubtopic} errors={newSubtopicErrors} />}
      </div>
    );
  }
}

export default App;
