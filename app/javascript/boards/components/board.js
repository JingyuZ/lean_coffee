import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { Card, CardText, CardBlock, CardTitle } from 'reactstrap';

const Board = (props) => (
  <Card className="mb-2">
    <CardBlock>
      <CardTitle>{props.topic}</CardTitle>
      <CardText>{props.description}</CardText>
    </CardBlock>
  </Card>
);

Board.propTypes = {
  topic: PropTypes.string,
  description: PropTypes.string,
};

export default Board;
