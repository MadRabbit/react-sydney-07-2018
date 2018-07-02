import React from 'react';
import { Mutation } from 'react-apollo';
import { CreateMutation, TodosList } from './queries.gql';

export default () => 
  <Mutation mutation={CreateMutation}>
    {(addItem) => {
      const input = React.createRef();
      const onSubmit = event => {
        event.preventDefault();
        addItem({
          variables: { name: input.current.value },
          refetchQueries: [{ query: TodosList }]
        });

        input.current.value = '';
      }

      return (
        <form onSubmit={onSubmit}>
          <input type="text" placeholder="New item name" ref={input} />
          <button type="submit">Create</button>
        </form>
      )
    }}
  </Mutation>
  
