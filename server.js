const PORT = 4000;

const express = require('express');
const graphqlHTTP = require('express-graphql');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = require('graphql');

const Sequelize = require('sequelize');

const sequelize = new Sequelize('prova-graphql', 'niente', 'niente', {
  host: 'localhost',
  dialect: 'sqlite',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

  // SQLite only
  storage: '/home/scompo/programmi/prova-graphql/prova-graphql.sqlite'
});

const MioType = new GraphQLObjectType({
  name: 'mio',
  fields: () => ({
    a: {
      type: GraphQLString
    },
    b: {
      type: GraphQLString
    }
  })
});

const MioModel = sequelize.define('mio', {
  a: {
    type: Sequelize.STRING
  },
  b: {
    type: Sequelize.STRING
  }
});

MioModel.sync({
  force: true
}).then(() => {
  return MioModel.create({
    a: 'aaaa',
    b: 'bbbb'
  });
}).then(() => {
  return MioModel.create({
    a: 'accc',
    b: 'dddd'
  })
}).then(() => {
  return MioModel.create({
    a: 'aeee',
    b: 'ffff'
  })
});

const allMioTypeResolver = (source, args, context) => {
  return MioModel.findAll({
    where: {
      a: {
        $like: '%' + args.a + '%'
      }
    }
  }).then(m => {
    return m
  });
}

const rootQuery = new GraphQLObjectType({
  name: 'query',
  fields: {
    allMio: {
      type: new GraphQLList(MioType),
      args: {
        'a': {
          type: GraphQLString
        }
      },
      resolve: allMioTypeResolver
    }
  }
});

const schema = new GraphQLSchema({
  query: rootQuery
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.listen(PORT, () => console.log(`server running on to http://localhost:${PORT}/graphql`));
