import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import HomeIconEn from '../../images/home-icon-enabled.png';
import HomeIconDis from '../../images/home-icon-disabled.png';

export default function TabHomeIcon({isFocused, label}) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
      }}>
      <Image
        source={isFocused ? HomeIconEn : HomeIconDis}
        style={{height: 20, width: 20, marginRight: 40}}
      />
      <Text
        style={{
          color: isFocused ? 'rgb(62,28,74)' : 'rgb(151,151,151)',
          textAlign: 'center',
        }}>
        {label}
      </Text>
    </View>
  );
}
