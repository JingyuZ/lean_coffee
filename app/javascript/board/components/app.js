import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

import { get } from '../../shared/api_helper';

class App extends Component {
  constructor(props) {
    super(props);
    const boardId = document.querySelector('.js-board-id').dataset.boardId;

    this.state = {
      id: boardId,
      topic: null,
      description: null,
      // subtopics: [],
    };
  }

  componentDidMount = () => {
    const setState = this.setState.bind(this);

    get(`/boards/${this.state.id}`).then(function(data) {
      setState({
        topic: data.topic,
        description: data.description,
      });
    });
  };

  render() {
    const { topic, description } = this.state;

    return (
      <div>
        <h1>{topic}</h1>
        <p>{description}</p>
      </div>
    );
  }
}

export default App;
