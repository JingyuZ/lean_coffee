const WebNotifications = {
  subscribe(received) {
    window.App.WebNotificationsSubscription = window.App.cable.subscriptions.create({
      channel: "NewSubtopicChannel",
    }, {
      received: received,
    });
  }
};

export default WebNotifications;
