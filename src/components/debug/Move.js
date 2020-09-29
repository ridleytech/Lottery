import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Animated} from 'react-native';

const Move = () => {
  const opacity = useState(new Animated.Value(1))[0];
  const yPos = useState(new Animated.Value(0))[0];

  useEffect(() => {
    moveView();
  }, []);

  const moveView = () => {
    // console.log('move');
    // Animated.timing(opacity, {
    //   toValue: 1,
    //   duration: 1000,
    //   useNativeDriver: false,
    // }).start();

    Animated.sequence([
      Animated.timing(yPos, {
        toValue: 40,
        duration: 700,
        useNativeDriver: false,
      }),
      Animated.timing(yPos, {
        toValue: 0,
        duration: 700,
        useNativeDriver: false,
      }),
      Animated.timing(yPos, {
        toValue: 40,
        duration: 700,
        useNativeDriver: false,
      }),
      Animated.timing(yPos, {
        toValue: 0,
        duration: 700,
        useNativeDriver: false,
      }),
      Animated.timing(yPos, {
        toValue: 40,
        duration: 700,
        useNativeDriver: false,
      }),
      Animated.timing(yPos, {
        toValue: 0,
        duration: 700,
        useNativeDriver: false,
      }),
    ]).start();
  };

  return (
    <>
      <Animated.View
        style={{
          width: 100,
          height: 100,
          backgroundColor: 'red',
          opacity: opacity,
          transform: [{translateY: yPos}],
        }}></Animated.View>
      <TouchableOpacity onPress={moveView}>
        <Text>Move</Text>
      </TouchableOpacity>
    </>
  );
};

export default Move;
