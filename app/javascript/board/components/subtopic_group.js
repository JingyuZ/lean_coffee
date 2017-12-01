import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, CardGroup } from 'reactstrap';

import Subtopic from './subtopic';

class SubtopicGroup extends Component {
  render() {
    const { className, subtopics, onVote, votes } = this.props;

    return (
      <div className="d-flex flex-row align-items-center">
        <Button size="sm">
          <p className="subtopic-group-votes-count">{`${votes} votes`}</p>
        </Button>
        <CardGroup className={className}>
          {subtopics.map((subtopic, index) => (<Subtopic key={index} subtopic={subtopic} onVote={onVote} />))}
        </CardGroup>
      </div>
    );
  }
}

SubtopicGroup.propTypes = {
  className: PropTypes.string,
  subtopics: PropTypes.array,
  onVote: PropTypes.func,
};

export default SubtopicGroup;
