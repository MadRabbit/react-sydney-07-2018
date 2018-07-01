require('babel-register')({ cache: true });

// react 16 fake polyfill
global.requestAnimationFrame = callback => {
  setTimeout(callback, 0);
};

/**
 * chai setup
 */
const chai = require('chai');
chai.use(require('chai-enzyme')());

global.expect = chai.expect;

/**
 * JSDOM setup
 */
const { JSDOM } = require('jsdom');
const { window } = new JSDOM('<!doctype html><html><body></body></html>');
global.window = window;
global.document = window.document;
global.navigator = window.navigator;

/**
 * Enzyme setup
 */
const React = require('react');
const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const { ApolloProvider } = require('react-apollo');

Enzyme.configure({ adapter: new Adapter() });


/**
 * GraphqlMock setup
 */
const { default: GraphqlMock } = require('graphql-mock');

const graphqlMock = exports.graphqlMock = new GraphqlMock(`
  type Blah {
    id: ID!
  }
`);

global.render = (element) =>
  Enzyme.mount(
    React.createElement(ApolloProvider, {
      client: graphqlMock.client,
      children: element
    })
  );
