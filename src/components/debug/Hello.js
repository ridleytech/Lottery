//import {TouchableOpacity} from 'react-native-gesture-handler';

import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';

testButton = () => {
  return 2;
};

const Hello = () => {
  return (
    <TouchableOpacity onPress={testButton}>
      <Text>Hello</Text>
    </TouchableOpacity>
  );
};

export default Hello;
