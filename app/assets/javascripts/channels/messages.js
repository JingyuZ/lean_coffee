App.messages = App.cable.subscriptions.create('SubtopicVotingChannel', {
  received: (data) => {
    document.querySelector(`.js-subtopic-group-${data.id}`).innerHTML = `${data.votes} votes`;
  }
});
