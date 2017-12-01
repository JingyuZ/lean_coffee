import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CardGroup } from 'reactstrap';

import Subtopic from './subtopic';

class SubtopicGroup extends Component {
  render() {
    const { className, subtopics, onVote } = this.props;

    return (
      <CardGroup className={className}>
        {subtopics.map((subtopic, index) => (<Subtopic key={index} subtopic={subtopic} onVote={onVote} />))}
      </CardGroup>
    );
  }
}

SubtopicGroup.propTypes = {
  className: PropTypes.string,
  subtopics: PropTypes.array,
  onVote: PropTypes.func,
};

export default SubtopicGroup;
