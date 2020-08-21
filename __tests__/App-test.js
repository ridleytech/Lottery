/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import API from '../src/components/debug/API';

function sum(a, b) {
  return a + b;
}

describe('the tests', () => {
  // it('renders correctly', () => {
  //   renderer.create(<App />);
  // });

  // test('hi', () => {
  //   expect(sum(1, 2)).toBe(1);
  // });

  test('api', async () => {
    const api = renderer.create(<API />).root.instance;

    // return await api.getAvailableGames(1, 2).then((data) => {
    //   //expect(data).toBe('peanut butter');

    //   console.log('test response: ' + data);
    // });

    let response = await api.getAvailableGames(1, 2);
    //api.testStuff();

    console.log('test response: ' + JSON.stringify(response));

    //expect(response.data.availableGames[0].participants).toEqual('501');

    expect(response.data.availableGames).toEqual(
      expect(
        arrayContaining(
          '{"participants":"500","uniqueNumbers":"0","nextDraw":"8,12,5","gameid":"1","game":"Pick 3","image":"cash3.png","stateid":"1","gameDescription":"Pick 3 | Play Type - Straight","joined":"1","validationPattern":"^[0-9]\\s[0-9]\\s[0-9]$","maxVals":"5","combinations":"1000"}',
        ),
      ),
    );
  });
});
