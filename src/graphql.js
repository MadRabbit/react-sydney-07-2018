import ApolloClient from 'apollo-boost';

export const typeDefs = `
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
      items = [{ id: Math.random() * 10000 | 0, name, completed: false }, ...items];
    },

    toggleEntry(_, { id }) {
      items = items.map(entry => 
        entry.id === id ? { ...entry, completed: !entry.completed } : entry
      );
    },

    removeEntry(_, { id }) {
      items = items.filter(i => i.id !== id);
    }
  }
};

export default new ApolloClient({
  clientState: {
    resolvers,
    typeDefs
  }
});
