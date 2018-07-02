import React from 'react';
import App from '../../src/app';
import TodosList from '../../src/app/list';
import NewItemForm from '../../src/app/form';
import { TodosQuery } from '../../src/app/queries.gql';
import { graphqlMock } from '../helper';


describe('<App />', () => {
  beforeEach(() => graphqlMock.expect(TodosQuery).reply({ todos: [] }));

  it('does not explode', () => {
    expect(render(<App />)).to.contain.text('Things to do');
  });

  it('has the todos list', () => {
    expect(render(<App />)).to.have.descendants(TodosList);
  });

  it('has a new item form', () => {
    expect(render(<App />)).to.have.descendants(NewItemForm);
  });
});
