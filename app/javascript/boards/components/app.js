import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

import { get, post } from '../../shared/api_helper';
import Board from './board';
import NewBoard from './new_board';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boards: [],
      newBoard: false,
      newBoardErrors: null,
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

  onClickBoard = (boardId) => {
    window.location = `/boards/${boardId}`;
  };

  onClickNewBoard = () => {
    if (!this.state.newBoard) {
      this.setState({ newBoard: true });
    }
  };

  createNewBoard = (boardInfo) => {
    const { boards } = this.state;
    post('/boards', { board: boardInfo })
      .then((data) => {
        this.setState({ boards: boards.concat(data.board), newBoard: false, newBoardErrors: null });
      })
      .catch((error) => {
        this.setState({ newBoardErrors: error.data.errors });
      });
  };

  cancelNewBoard = () => {
    this.setState({ newBoard: false, newBoardErrors: null });
  };

  render() {
    const { boards, newBoard, newBoardErrors } = this.state;

    return (
      <div>
        <header className="d-flex flex-row justify-content-between align-items-center">
          <h1>Boards</h1>
          <Button color="success" onClick={this.onClickNewBoard} disabled={newBoard}>
            <i className="fa fa-plus-circle mr-1" aria-hidden="true"></i>
            Create Board
          </Button>
        </header>
        {boards.map((board, index) => (<Board key={index} topic={board.topic} description={board.description} id={board.id} onClick={this.onClickBoard} />))}
        {newBoard && <NewBoard createNewBoard={this.createNewBoard} cancelNewBoard={this.cancelNewBoard} errors={newBoardErrors} />}
      </div>
    );
  }
}

export default App;
