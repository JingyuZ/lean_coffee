import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardText, CardBlock } from 'reactstrap';

class Subtopic extends Component {
  render() {
    const { className, description, onVote, id } = this.props;

    return (
      <Card className={className}>
        <CardBlock className="d-flex flex-row justify-content-between align-items-center">
          <CardText>{description}</CardText>
          <Button size="sm" onClick={() => (onVote(id))}>
            <i className="fa fa-arrow-circle-up" aria-label="Upvote"></i>
          </Button>
        </CardBlock>
      </Card>
    );
  }
}

Subtopic.propTypes = {
  className: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.number,
  onVote: PropTypes.func,
};

export default Subtopic;
