import React from 'react';
import ReactDOM from "react-dom";
import { ApolloProvider } from 'react-apollo';
import client from './graphql';
import App from './app';
import './index.css';

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>, 
  document.getElementById('app')
);
