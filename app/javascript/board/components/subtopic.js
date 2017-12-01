import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardText, CardBlock } from 'reactstrap';

class Subtopic extends Component {
  render() {
    const { onVote, subtopic } = this.props;
    const { description, id } = subtopic;

    return (
      <Card>
        <CardBlock>
          <CardText>{description}</CardText>
          <Button block className="mt-2" size="sm" onClick={() => (onVote(id))}>
            <i className="fa fa-arrow-circle-up mr-1" aria-hidden="true"></i>
            Vote
          </Button>
        </CardBlock>
      </Card>
    );
  }
}

Subtopic.propTypes = {
  subtopic: PropTypes.object,
  onVote: PropTypes.func,
};

export default Subtopic;
