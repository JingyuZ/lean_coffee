import React, { Component } from 'react';

import Subtopic from './subtopic';
import { get, post } from '../../shared/api_helper';

class App extends Component {
  constructor(props) {
    super(props);
    const boardId = document.querySelector('.js-board-id').dataset.boardId;

    this.state = {
      id: boardId,
      topic: null,
      description: null,
      subtopics: [],
    };
  }

  componentDidMount = () => {
    const setState = this.setState.bind(this);

    get(`/boards/${this.state.id}`).then(function(data) {
      setState({
        topic: data.topic,
        description: data.description,
        subtopics: data.subtopics,
      });
    });
  };

  onVote = (subtopicId) => {
    post(`/subtopics/${subtopicId}/vote`);
  };

  render() {
    const { topic, description, subtopics } = this.state;

    return (
      <div>
        <h1>{topic}</h1>
        <p>{description}</p>
        {subtopics.map((subtopic, index) => (<Subtopic className="mb-2" key={index} description={subtopic.description} onVote={this.onVote} id={subtopic.id} />))}
      </div>
    );
  }
}

export default App;
