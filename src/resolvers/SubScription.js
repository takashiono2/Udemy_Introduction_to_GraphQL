function newSubscribe(parent, args, context) {
  return context.pubsub.asyncIterator("NEW_LINK");
}

const newLink = {
  subscribe: newLinkSubscribe,
  resoleve: (payload) => {
    return payload;
  },
};

module.exports = {
  newLink,
}