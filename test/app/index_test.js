import React from 'react';
import App from '../../src/app';

describe('<App />', () => {
  it('does not explode', () => {
    expect(render(<App />)).to.contain.text('Hello world');
  });
});
