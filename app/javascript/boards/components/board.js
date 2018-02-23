import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardBlock, CardFooter, CardText, CardHeader } from 'reactstrap';
import BoardForm from './board_form';
import '../styles/board';

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
    };
  }

  onClickBoard = () => {
    const { onClick, id } = this.props;

    onClick(id);
  };

  onClickDelete = () => {
    const { deleteBoard, id } = this.props;

    if (confirm('Are you sure you want to delete this board?')) {
      deleteBoard(id);
    }
  };

  onClickEdit = () => {
    this.setState({ editing: true });
  };

  saveEdits = (boardId, formData) => {
    const { saveBoard } = this.props;

    saveBoard(boardId, formData).then((data) => {
      if (data.success) {
        this.setState({ editing: false });
      }
    });
  };

  cancelEdit = () => {
    const { cancelSaveBoard, id } = this.props;

    this.setState({ editing: false });
    cancelSaveBoard(id);
  };

  renderShowView = () => {
    const { topic, description } = this.props;

    return (
      <Card className="mb-2 topic-board">
        <CardHeader onClick={this.onClickBoard}>{topic}</CardHeader>
        <CardBlock onClick={this.onClickBoard}>
          <CardText>{description || 'This board has no description.'}</CardText>
        </CardBlock>
        <CardFooter className="topic-board__footer">
          <Button onClick={this.onClickEdit} className="mr-2" color="primary">
            <i className="fa fa-pencil-square-o" aria-hidden="true"></i> Edit
          </Button>
          <Button onClick={this.onClickDelete} color="danger">
            <i className="fa fa-trash-o" aria-hidden="true"></i> Delete
          </Button>
        </CardFooter>
      </Card>
    );
  };

  renderEditView = () => {
    const { id, topic, description, errors } = this.props;

    return (
      <BoardForm
        boardFormTitle="Edit Board"
        saveBoardButtonText="Save"
        saveBoard={this.saveEdits}
        cancelBoard={this.cancelEdit}
        board={{ id, topic, description }}
        errors={errors}
        className="mb-2"
      />
    );
  };

  render() {
    const { editing } = this.state;

    return (
      <div>
        {editing ? this.renderEditView() : this.renderShowView()}
      </div>
    );
  }
}

Board.propTypes = {
  id: PropTypes.number,
  description: PropTypes.string,
  topic: PropTypes.string,
  onClick: PropTypes.func,
  deleteBoard: PropTypes.func,
  saveBoard: PropTypes.func,
  cancelSaveBoard: PropTypes.func,
  errors: PropTypes.object,
};

export default Board;
