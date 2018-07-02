import React from 'react';
import { Query } from 'react-apollo';
import { TodosQuery } from './queries.gql';

export default () =>
  <Query query={TodosQuery}>
    {({ data, loading, error }) => {
      if (error) return error.message;
      if (loading) return 'Loading...';

      const { todos = [] } = data;

      if (todos.length === 0) return <p>No items yet</p>;

      return (
        <ul>
          {todos.map(i => <li key={i.id}>{i.name}</li>)}
        </ul>
      )
    }}
  </Query>
  
