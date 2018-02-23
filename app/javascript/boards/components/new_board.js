import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BoardForm from './board_form';

class NewBoard extends Component {
  render() {
    const { createNewBoard, cancelNewBoard, errors } = this.props;

    return (
      <BoardForm
        boardFormTitle="New Board"
        saveBoardButtonText="Create"
        saveBoard={createNewBoard}
        cancelBoard={cancelNewBoard}
        errors={errors}
      />
    );
  }
}

NewBoard.propTypes = {
  createNewBoard: PropTypes.func.isRequired,
  cancelNewBoard: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

export default NewBoard;
