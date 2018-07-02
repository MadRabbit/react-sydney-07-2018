import React from 'react';
import TodosList from '../../src/app/list';
import { TodosQuery } from '../../src/app/queries.gql';
import { graphqlMock } from '../helper';

describe('<TodosList />', () => {
  it('renders a bunch of todo items', () => {
    graphqlMock.expect(TodosQuery).reply({
      todos: [
        { id: 1, name: 'cook breakfast'},
        { id: 2, name: 'feed the cat'},
        { id: 3, name: 'win at life' } 
      ]
    })

    const wrapper = render(<TodosList />);

    expect(wrapper.find('li').map(li => li.text())).to.eql([
      'cook breakfast',
      'feed the cat',
      'win at life'
    ]);
  });

  it('renders a prompt whent he list is empty', () => {
    graphqlMock.expect(TodosQuery).reply({
      todos: []
    })

    const wrapper = render(<TodosList />);

    expect(wrapper).to.have.text('No items yet');
  });

  it('shows a spinnar when the query is loading', () => {
    graphqlMock.expect(TodosQuery).loading();

    const wrapper = render(<TodosList />);

    expect(wrapper).to.have.text('Loading...');
  });

  it('shows an error when things go sour', () => {
    graphqlMock.expect(TodosQuery).fail('Everything is terrible');

    const wrapper = render(<TodosList />);

    expect(wrapper).to.contain.text('Everything is terrible');
  });
});
