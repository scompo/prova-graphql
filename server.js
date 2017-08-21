const express = require('express');
const graphqlHTTP = require('express-graphql');
const {
  buildSchema
} = require('graphql');

const PORT = 4000;

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = {
  hello: () => 'Hello world!'
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(PORT, () => console.log(`server running on to http://localhost:${PORT}/graphql`));
