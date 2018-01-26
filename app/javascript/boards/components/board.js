import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardBlock, CardFooter, CardText, CardHeader } from 'reactstrap';
import '../styles/board';

class Board extends Component {
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

  render() {
    const { topic, description } = this.props;

    return (
      <Card className="mb-2 topic-board">
        <CardHeader onClick={this.onClickBoard}>{topic}</CardHeader>
        <CardBlock onClick={this.onClickBoard}>
          <CardText>{description || 'This board has no description.'}</CardText>
        </CardBlock>
        <CardFooter className="topic-board__footer">
          <Button onClick={this.onClickDelete} color="danger">
            <i className="fa fa-trash-o" aria-hidden="true"></i> Delete
          </Button>
        </CardFooter>
      </Card>
    );
  }
}

Board.propTypes = {
  id: PropTypes.number,
  description: PropTypes.string,
  topic: PropTypes.string,
  onClick: PropTypes.func,
  deleteBoard: PropTypes.func,
};

export default Board;
