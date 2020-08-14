import React, {Component} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

//https://medium.com/@Daniel.Merrill/build-a-custom-tab-bar-with-a-menu-button-in-react-navigation-in-20-minutes-f7d721551ef
//https://reactnavigation.org/docs/bottom-tab-navigator/

import HeaderBack from '../images/header-back-icon.png';

function HeaderBackImg({state, descriptors, navigation}) {
  return <Image source={HeaderBack} style={styles.headerImg} />;
}

const styles = StyleSheet.create({
  headerImg: {
    width: 20,
    height: 20,
    marginLeft: 17,
    marginBottom: -10,
  },
});

export default HeaderBackImg;
