const WebNotifications = {
  subscribe(received) {
    window.App.WebNotificationsSubscription = window.App.cable.subscriptions.create({
      channel: "SubtopicVotingChannel",
    }, {
      received: received,
    });
  }
};

export default WebNotifications;
