/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

function sum(a, b) {
  return a + b;
}

describe('the tests', () => {
  it('renders correctly', () => {
    renderer.create(<App />);
  });

  test('hi', () => {
    expect(sum(1, 2)).toBe(1);
  });
});
