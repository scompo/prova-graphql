const {
  GraphQLID,
  GraphQLNonNull
} = require('graphql');

const EventType = require('../types/event');

module.exports = {
  type: EventType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: (root, args) => {
    return new Promise((resolve, reject) => {
      resolve({
        id: 'ididididid',
        name: 'Exciting stuff'
      })
    });
  }
}
