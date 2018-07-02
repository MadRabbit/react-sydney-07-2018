const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const { PORT = 3000, NODE_ENV } = process.env;

const typeDefs = exports.typeDefs = `
  type Todo {
    id: ID!
    name: String!
    completed: Boolean!
  }

  type Query {
    todos: [Todo]
  }

  type Mutation {
    addEntry(name: String!): Todo
    toggleEntry(id: ID!): Todo
    removeEntry(id: ID!): Todo
  }
`;


/**
 * Fake backend in local state
 */
let items = [];

const resolvers = {
  Query: {
    todos() {
      return items;
    }
  },

  Mutation: {
    addEntry(_, { name }) {
      const newEntry = { id: Math.random() * 10000 | 0, name, completed: false };
      items = [newEntry, ...items];
      return newEntry;
    },

    toggleEntry(_, { id }) {
      const oldEntry = items.find(entry => entry.id === id);
      const newEntry = { ...oldEntry, completed: !entry.completed };

      items = items.map(entry => entry === oldEntry ? newEntry : entry);

      return newEntry;
    },

    removeEntry(_, { id }) {
      const entry = items.find(entry => entry.id === id);

      items = items.filter(i => i.id !== id);

      return entry;
    }
  }
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/graphql', graphqlExpress({ schema }));

if (NODE_ENV !== 'test') {
  app.listen(PORT);
}
