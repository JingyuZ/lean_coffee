import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

import { get, post, patch, del } from '../../shared/api_helper';
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

  updateBoard = (boardToUpdate, { errorsOnly = false } = {}) => {
    const { boards } = this.state;

    const boardIndex = boards.findIndex((board) => (board.id == boardToUpdate.id));
    const newBoardInfo = errorsOnly ? { error_messages: boardToUpdate.error_messages } : boardToUpdate;
    const newBoard = Object.assign({}, boards[boardIndex], newBoardInfo);
    let newBoards;
    if (boardIndex === 0) {
      newBoards = [newBoard].concat(boards.slice(1));
    } else if (boardIndex === boards.length - 1) {
      newBoards = boards.slice(0, boardIndex).concat(newBoard);
    } else {
      newBoards = boards.slice(0, boardIndex).concat(newBoard).concat(boards.slice(boardIndex + 1, boards.length));
    }

    this.setState({ boards: newBoards });
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

  saveBoard = (boardId, boardAttrs) => (
    patch(`/boards/${boardId}`, boardAttrs)
      .then((data) => {
        if (data.board) {
          this.updateBoard(data.board);
        } else {
          alert(`Something went horribly wrong: ${data}`);
        }
        return {success: true};
      })
      .catch((error) => {
        if (error.data && error.data.board) {
          this.updateBoard(error.data.board, {errorsOnly: true});
        } else {
          alert(`Something went horribly wrong: ${error}`);
        }
        return {success: false};
      })
  );

  cancelBoardUpdate = (boardId) => {
    this.updateBoard({ id: boardId, error_messages: null });
  };

  deleteBoard = (boardId) => {
    const { boards } = this.state;

    del(`/boards/${boardId}`)
      .then(() => {
        const boardIndex = boards.findIndex((board) => (board.id == boardId));
        let newBoards;
        if (boardIndex === 0) {
          newBoards = boards.slice(1);
        } else if (boardIndex === boards.length - 1) {
          newBoards = boards.slice(0, boardIndex);
        } else {
          newBoards = boards.slice(0, boardIndex - 1).concat(boards.slice(boardIndex + 1, boards.length));
        }

        this.setState({ boards: newBoards });
      })
      .catch((error) => {
        alert(`Something went horribly wrong. Error: ${error}`)
      })
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
        {boards.map((board, index) => (
          <Board
            key={index}
            topic={board.topic}
            description={board.description}
            id={board.id}
            onClick={this.onClickBoard}
            deleteBoard={this.deleteBoard}
            saveBoard={this.saveBoard}
            cancelSaveBoard={this.cancelBoardUpdate}
            errors={board.error_messages}
          />
        ))}
        {newBoard && <NewBoard createNewBoard={this.createNewBoard} cancelNewBoard={this.cancelNewBoard} errors={newBoardErrors} />}
      </div>
    );
  }
}

export default App;
