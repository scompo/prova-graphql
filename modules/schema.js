const graphql = require('graphql');

const queryType = new graphql.GraphQLObjectType({
  name: 'query',
  fields: {
    quoteOfTheDay: {
      type: graphql.GraphQLString
    },
  }
});

exports.schema = new graphql.GraphQLSchema({
  query: queryType
});
