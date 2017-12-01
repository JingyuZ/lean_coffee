App.messages = App.cable.subscriptions.create('SubtopicVotingChannel', {
  received: (data) => {
    document.querySelector('.subtopic-group-votes-count').innerHTML = `${data.votes} votes`;
  }
});
