import React, { Component } from 'react';

import SubtopicGroup from './subtopic_group';
import { get, post } from '../../shared/api_helper';

class App extends Component {
  constructor(props) {
    super(props);
    const boardId = document.querySelector('.js-board-id').dataset.boardId;

    this.state = {
      id: boardId,
      topic: null,
      description: null,
      subtopicGroups: [],
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

  onVote = (subtopicId) => {
    post(`/subtopics/${subtopicId}/vote`);
  };

  render() {
    const { topic, description, subtopicGroups } = this.state;

    return (
      <div>
        <h1>{topic}</h1>
        <p>{description}</p>
        {subtopicGroups.map((subtopicGroup, index) => (<SubtopicGroup className="mb-2" key={index} subtopics={subtopicGroup.subtopics} onVote={this.onVote} />))}
      </div>
    );
  }
}

export default App;
