import React from 'react';
import renderer from 'react-test-renderer';
import FarmApp from './FarmApp.js';

// snapshot test: https://www.robinwieruch.de/react-testing-jest
describe('FarmApp', () => {
  test('snapshot renders', () => {
  	const component = renderer.create(<FarmApp />);
  	let tree = component.toJSON();
  	expect(tree).toMatchSnapshot();
  });
});

it("renders without crashing", () => {
  shallow(<FarmApp />);
});
