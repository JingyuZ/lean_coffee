import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, CardGroup } from 'reactstrap';
import { Draggable } from 'react-beautiful-dnd';

import Subtopic from './subtopic';

class SubtopicGroup extends Component {
  renderSubtopic = (subtopic, index) => {
    const { onVote } = this.props;

    return (
      <Draggable draggableId={`subtopic-${subtopic.id}`} key={index}>
        {(provided, snapshot) => (
          <div className="d-flex" style={{ flex: '1' }}>
            <div className="d-flex" ref={provided.innerRef} style={{ ...provided.draggableStyle, flex: '1' }} {...provided.dragHandleProps}>
              <Subtopic subtopic={subtopic} onVote={onVote} />
            </div>
            {provided.placeholder}
          </div>
        )}
      </Draggable>
    );
  };

  render() {
    const { className, subtopics, onVote, votes, id } = this.props;

    return (
      <div className="d-flex flex-row align-items-center">
        <Button size="sm">
          <p className={`subtopic-group-votes-count js-subtopic-group-${id}`}>{`${votes} votes`}</p>
        </Button>
        <CardGroup className="d-flex flex-row" style={{ flex: '1' }}>
          {subtopics.map((subtopic, index) => (this.renderSubtopic(subtopic, index)))}
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
