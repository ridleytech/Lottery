/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
  FlatList,
  Text,
} from 'react-native';

import Home from './src/Home';
import data1 from './src/data';
import PeopleItem from './src/PeopleItem';
import Move from './src/Move';

//console.log('data: ' + JSON.stringify(data1.items));

data1.items.map((ob) => {
  console.log('ob: ' + ob.name);
});

class App extends Component {
  dividNum = (x, y) => x / y;

  checkZero = (func) => (...args) => {
    if (args[1] === 0) {
      return null;
    } else {
      return func(...args);
    }
  };

  checkEven = (x) => {
    return x % 2 === 0;
  };

  ascending = (a, b) => {
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    } else {
      return 0;
    }
  };

  addNumbers = (acc, cv) => {
    return acc + cv;
  };

  loop = () => {
    for (var i = 0; i < 10; i++) {
      console.log('i: ' + i);
    }
  };

  map = (arr, func) => arr.reduce((acc, cv) => [...acc, func(cv)], []);

  arr = [6, 2, 5, 1, 3, 4];

  componentDidMount() {
    //this.loop();
    // const test = this.checkZero(this.dividNum);
    // console.log(test(43, 2));
    // const even = this.arr.filter(this.checkEven);
    // console.log(even);
    // const every = this.arr.some(this.checkEven);
    // console.log(every);
    //const sorted = this.arr.slice().sort(this.ascending);
    // console.log(sorted);
    // const reduced = this.arr.reduce(this.addNumbers);
    // console.log('reduced: ' + reduced);
    //console.log('map: ' + this.map([1, 2, 3], (x) => x * 2));
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          {/* <Home /> */}
          <FlatList
            data={data1.items}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(item) => <PeopleItem item={item.item} />}
          />
          <Move />
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({});

export default App;
