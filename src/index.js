const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');

const dev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 3000;

const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: dev,
  pretty: dev
}));

app.listen(3000, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Running a GraphQL API server at http://localhost:${PORT}/graphql`);
});
