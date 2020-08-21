import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Animated,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {Text} from 'native-base';

const PagingView = ({bgC, startHeight, showStatus}) => {
  const height = useState(new Animated.Value(startHeight))[0];
  const op = useState(new Animated.Value(0))[0];
  const [sizeStatus, setSizeStatus] = useState({
    grown: false,
    height: startHeight,
    op: 0,
  });

  const growView = () => {
    setSizeStatus({grown: true, height: startHeight});
    console.log('grow');

    Animated.spring(height, {
      toValue: 40,
      duration: 500,
      useNativeDriver: false,
    }).start();

    Animated.spring(op, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const shrinkView = () => {
    setSizeStatus({grown: false, height: 0});

    console.log('shrink');

    Animated.spring(height, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();

    Animated.spring(op, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    if (showStatus == true) {
      growView();
    } else {
      shrinkView();
    }
  }, [showStatus]);

  return (
    <>
      <Animated.View
        style={[
          styles.pagingView,
          {
            height: height,
            overflow: 'hidden',
            opacity: op,
            backgroundColor: bgC,
          },
        ]}>
        {sizeStatus.grown ? (
          <>
            <TouchableOpacity
              onPress={sizeStatus.grown == false ? growView : shrinkView}>
              <Text style={{marginRight: 20}}>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>Next 25</Text>
            </TouchableOpacity>
          </>
        ) : null}
      </Animated.View>

      {/* <TouchableOpacity
        onPress={sizeStatus.grown == false ? growView : shrinkView}>
        <Text>Go</Text>
      </TouchableOpacity> */}
    </>
  );
};

export default PagingView;

const styles = StyleSheet.create({
  pagingView: {
    paddingTop: 8,
    //backgroundColor: 'gray',
    width: Dimensions.get('window').width,
    //marginBottom: 300,
    justifyContent: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
  },
});
