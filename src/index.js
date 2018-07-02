import React from 'react';
import ReactDOM from "react-dom";
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import App from './app';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql'
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>, 
  document.getElementById('app')
);
