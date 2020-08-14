import React, {Component, useState} from 'react';
import {View, Animated, TouchableOpacity} from 'react-native';
import {Text} from 'native-base';

const MoveBall = () => {
  const wh = useState(new Animated.Value(100))[0];
  const [sizeStatus, setSizeStatus] = useState({grown: false, radius: 100});

  const growBall = () => {
    setSizeStatus({grown: true, radius: 200});
    console.log('grow');

    Animated.spring(wh, {
      toValue: 200,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const shrinkBall = () => {
    setSizeStatus({grown: false, radius: 200});

    console.log('shrink');

    Animated.spring(wh, {
      toValue: 100,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  return (
    <>
      <Animated.View
        style={{
          width: wh,
          height: wh,
          //marginTop: moveVal,
          borderRadius: sizeStatus.radius / 2,
          backgroundColor: 'red',
        }}
      />
      <TouchableOpacity
        onPress={sizeStatus.grown == false ? growBall : shrinkBall}>
        <Text>Go</Text>
      </TouchableOpacity>
    </>
  );
};

export default MoveBall;
