import {Text} from 'react-native';
import React from 'react';
import App from '../App';
import Hello2 from '../src/components/debug/Hello2';
import Enzyme from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {findNodeHandle} from 'react-native';

import {shallow} from 'enzyme';

describe('a', () => {
  //   it('b', () => {
  //     //const api = renderer.create(<Hello />).root.instance;
  //     const snap = renderer.create(<Hello />).toJSON();
  //     //expect(1 + 2).toBe(3);
  //     expect(snap).toMatchSnapshot();
  //   });

  // it('c', () => {
  //   //const api = renderer.create(<Hello />).root.instance;
  //   const snap = renderer.create(<Hello2 />).getInstance();
  //   //expect(1 + 2).toBe(3);
  //   var val = snap.testButton();

  //   expect(val).toBe(3);
  // });

  findEl = (tree, el) => {
    var result = undefined;

    for (node in tree.children) {
      if (tree.children[node].props.testID === el) {
        result = true;
      }
    }

    return result;
  };

  // it('find', () => {
  //   var tree = renderer.create(<Hello2 />).toJSON();

  //   expect(findEl(tree, 'username')).toBe(true);
  // });

  it('render text', () => {
    var wrapper = shallow(<Text>Hello</Text>);
    expect(wrapper.text()).toBe('Hello1');
  });
});
