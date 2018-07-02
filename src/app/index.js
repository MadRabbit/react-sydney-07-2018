import React from 'react';
import TodosList from './list';
import NewItemForm from './form';

export default class App extends React.Component {
  render() {
    return (
      <article>
        <h1>Things to do:</h1>
        <NewItemForm />
        <TodosList />
      </article>
    );
  }
}
