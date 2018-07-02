import React from 'react';
import NewItemForm from '../../src/app/form';
import { CreateMutation } from '../../src/app/queries.gql';
import { graphqlMock } from '../helper';

describe('<NewItemForm />', () => {
  it('render the form stuff', () => {
    const wrapper = render(<NewItemForm />);

    expect(wrapper).to.have.descendants('input[type="text"]');
    expect(wrapper).to.have.descendants('button[type="submit"]');
  });

  it('sends a mutation query', () => {
    const mock = graphqlMock.expect(CreateMutation).reply({
      addItem: {
        id: 4,
        name: 'new item'
      }
    });

    const wrapper = render(<NewItemForm />);

    wrapper.find('input').instance().value = 'new item';
    wrapper.find('form').simulate('submit');

    expect(mock.calls).to.eql([[{ name: 'new item' }]]);

    expect(wrapper.find('input')).to.have.value('');
  })
})
