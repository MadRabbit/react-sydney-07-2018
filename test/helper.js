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

const graphqlMock = exports.graphqlMock = new GraphqlMock(``);

global.render = (element) => (
  React.createElement(ApolloProvider, {
    client: graphqlMock.client,
    children: element
  })
)
