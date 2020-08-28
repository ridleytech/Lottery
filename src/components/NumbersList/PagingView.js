import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Animated,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {Text} from 'native-base';

const PagingView = ({bgC}) => {
  return (
    <>
      <View
        style={[
          styles.pagingView,
          {
            height: 50,
            backgroundColor: bgC,
          },
        ]}>
        <>
          <TouchableOpacity>
            <Text style={{marginRight: 20}}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Next 25</Text>
          </TouchableOpacity>
        </>
      </View>

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
    marginBottom: 300,
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
