import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

import { get } from '../../shared/api_helper';
import Board from './board';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boards: [],
    };
  }

  componentDidMount = () => {
    const setState = this.setState.bind(this);

    get('/boards').then(function(data) {
      setState({
        boards: data.boards,
      });
    });
  };

  render() {
    const { boards } = this.state;

    return (
      <div>
        <h1>Boards</h1>
        {boards.map((board, index) => (<Board key={index} topic={board.topic} description={board.description} />))}
      </div>
    );
  }
}

export default App;
