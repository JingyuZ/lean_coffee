import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import ActionCable from 'actioncable'

import SubtopicGroup from './subtopic_group';
import WebNotifications from './web_notifications';
import NewSubtopicNotifications from './new_subtopic_notifications';
import { get, post } from '../../shared/api_helper';
import NewSubtopic from './new_subtopic';

window.App = {};

class App extends Component {
  constructor(props) {
    super(props);
    const boardId = document.querySelector('.js-board-id').dataset.boardId;

    this.state = {
      id: boardId,
      topic: null,
      description: null,
      subtopicGroups: [],
      newSubtopic: false,
      newSubtopicErrors: null,
    };
  }

  componentDidMount = () => {
    const setState = this.setState.bind(this);
    const that = this;
    const cabelUrl = document.querySelector('.js-board-id').dataset.cableUrl;

    get(`/boards/${this.state.id}`).then(function(data) {
      setState({
        topic: data.topic,
        description: data.description,
        subtopicGroups: data.subtopicGroups,
      });
    });

    window.App.cable = ActionCable.createConsumer(cabelUrl);
    WebNotifications.subscribe((data) => {
      let subtopicGroups = that.state.subtopicGroups;
      for (let i in subtopicGroups) {
        if (subtopicGroups[i].id === data.id) {
          subtopicGroups[i].votes = data.votes;
          break;
        }
      }
      setState({ subtopicGroups }, this.sortSubtopicGroups());
    });
    NewSubtopicNotifications.subscribe((data) => {
      let subtopicGroups = that.state.subtopicGroups;
      let myChannelUpdate = false;
      for (let i in subtopicGroups) {
        if (subtopicGroups[i].id === data.subtopic.subtopicGroupId) {
          myChannelUpdate = true;
          break;
        }
      }
      if (!myChannelUpdate) {
        const newSubtopicGroup = { id: data.subtopic.subtopicGroupId, subtopics: [data.subtopic], votes: 0 };
        subtopicGroups = subtopicGroups.concat([newSubtopicGroup]);
        setState({ subtopicGroups });
      }
    });
  };

  sortSubtopicGroups() {
    let subtopicGroups = this.state.subtopicGroups;
    const newSubtopicGroups = subtopicGroups.sort((a, b) => {
      const voteA = a.votes;
      const voteB = b.votes;
      if (voteA < voteB) {
        return 1;
      }
      if (voteA > voteB) {
        return -1;
      }
      return 0;
    });
  }

  onClickNewSubtopic = () => {
    if (!this.state.newSubtopic) {
      this.setState({ newSubtopic: true })
    }
  };

  onVote = (subtopicId) => {
    post(`/subtopics/${subtopicId}/vote`);
  };

  createNewSubtopic = (subtopicInfo) => {
    const { id, subtopicGroups } = this.state;
    const params = { subtopic: subtopicInfo, boardId: id };
    post('/subtopics', params)
      .then((data) => {
        const newSubtopicGroup = { subtopics: [data.subtopic], votes: 0, id: data.subtopic.subtopicGroupId };
        this.setState({ subtopicGroups: subtopicGroups.concat(newSubtopicGroup), newSubtopic: false, newSubtopicErrors: null });
      });
  };

  cancelNewSubtopic = () => {
    this.setState({ newSubtopic: false, newSubtopicErrors: null });
  };

  onDragStart = (initialDragInfo) => {
    console.log(initialDragInfo);
  };

  onDragEnd = (dropResult) => {
    console.log(dropResult);
    const { subtopicGroups } = this.state;
    const subtopicGroupId = dropResult.destination.droppableId.split('-')[1];
    const subtopicId = dropResult.draggableId.split('-')[1];
    post(`/subtopics/${subtopicId}/change_group`, { subtopicGroupId: subtopicGroupId }).then((data) => {
      let newSubtopicGroups = subtopicGroups;

      const indexOfSourceGroup = subtopicGroups.findIndex((subtopicGroup) => (subtopicGroup.id === data.sourceGroupId));
      if (data.sourceGroupDestroyed) {
        newSubtopicGroups = subtopicGroups.slice(0, indexOfSourceGroup).concat(subtopicGroups.slice(indexOfSourceGroup + 1, subtopicGroups.length));
      } else {
        const indexOfTopicToRemove = subtopicGroups[indexOfSourceGroup].subtopics.findIndex((subtopic) => (subtopic.id == subtopicId));
        const sourceSubtopics = subtopicGroups[indexOfSourceGroup].subtopics;
        if (indexOfTopicToRemove === 0) {
          subtopicGroups[indexOfSourceGroup].subtopics = sourceSubtopics.slice(1);
        } else if (indexOfTopicToRemove === sourceSubtopics.length - 1) {
          subtopicGroups[indexOfSourceGroup].subtopics = sourceSubtopics.slice(0, indexOfTopicToRemove);
        } else {
          subtopicGroups[indexOfSourceGroup].subtopics = sourceSubtopics.slice(0, indexOfTopicToRemove - 1).concat(sourceSubtopics.slice(indexOfTopicToRemove + 1, sourceSubtopics.length));
        }
      }

      const destinationSubtopicGroup = newSubtopicGroups.find((subtopicGroup) => (subtopicGroup.id == subtopicGroupId));
      const destinationIndex = dropResult.destination.index;
      if (destinationIndex === 0) {
        destinationSubtopicGroup.subtopics = [ data.subtopic ].concat(destinationSubtopicGroup.subtopics);
      } else {
        destinationSubtopicGroup.subtopics = destinationSubtopicGroup.subtopics.concat([ data.subtopic ]);
      }


      this.setState({ subtopicGroups: newSubtopicGroups });
    });
  };

  renderSubtopicGroup = (subtopicGroup, index) => {
    return (
      <Droppable droppableId={`subtopicGroup-${subtopicGroup.id}`} direction="horizontal" key={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'transparent' }}
            className="mb-2"
          >
          <SubtopicGroup className="mb-2" key={index} subtopics={subtopicGroup.subtopics} onVote={this.onVote} votes={subtopicGroup.votes} id={subtopicGroup.id} />          </div>
        )}

      </Droppable>
    )
  };

  render() {
    const { topic, description, subtopicGroups, newSubtopic, newSubtopicErrors } = this.state;

    return (
      <DragDropContext onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}>
        <div>
          <header className="d-flex flex-row justify-content-between align-items-center">
            <h1>Topic: {topic}</h1>
            <Button color="success" onClick={this.onClickNewSubtopic} disabled={newSubtopic}>
            <i className="fa fa-plus-circle mr-1" aria-hidden="true"></i>
            Create Subtopic
            </Button>
          </header>
          {description && <p className="mb-4">Description: {description}</p>}
          <h2>Subtopics</h2>
          {subtopicGroups.map((subtopicGroup, index) => (this.renderSubtopicGroup(subtopicGroup, index)))}
          {newSubtopic && <NewSubtopic createNewSubtopic={this.createNewSubtopic} cancelNewSubtopic={this.cancelNewSubtopic} errors={newSubtopicErrors} />}
        </div>
      </DragDropContext>
    );
  }
}

export default App;
