import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBlock, CardText, CardTitle } from 'reactstrap';
import '../styles/board';

const Board = (props) => (
  <Card className="mb-2 topic-board" onClick={() => (props.onClick(props.id))}>
    <CardBlock>
      <CardTitle>{props.topic}</CardTitle>
      <CardText>{props.description}</CardText>
    </CardBlock>
  </Card>
);

Board.propTypes = {
  id: PropTypes.number,
  description: PropTypes.string,
  topic: PropTypes.string,
};

export default Board;
