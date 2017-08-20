const express = require('express');
const graphqlHTTP = require('express-graphql');

const quotes = require('./modules/quotes');
const schema = require('./modules/schema');

const root = {
  quoteOfTheDay: quotes.quoteOfTheDay
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema.schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(3000);
console.log('Running a GraphQL API server at http://localhost:3000/graphql');
