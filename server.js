const express = require('express');
const graphqlHTTP = require('express-graphql');
const {
  buildSchema
} = require('graphql');

const quotes = require('./quotes');

const schema = buildSchema(`
	type Query {
		quoteOfTheDay: String
		random: Float!
		rollThreeDice: [Int]
		rollDice(num: Int!, sides: Int): [Int]
	}
`);

const root = {
  quoteOfTheDay: quotes.quoteOfTheDay,
  random: () => {
    return Math.random();
  },
  rollThreeDice: () => {
    return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6));
  },
  rollDice: ({
    num,
    sides
  }) => {
    var out = [];
    for (var i = 0; i < num; i++) {
      out.push(1 + Math.floor(Math.random() * (sides || 6)));
    }
    return out;
  }
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(3000);
console.log('Running a GraphQL API server at http://localhost:3000/graphql');
