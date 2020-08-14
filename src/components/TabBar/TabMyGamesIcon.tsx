import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import MyGamesIconEn from '../../images/my-games-icon-enabled.png';
import MyGamesIconDis from '../../images/my-games-icon-disabled.png';
export default function TabMyGamesIcon({isFocused, label}) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
      }}>
      <Text
        style={{
          color: isFocused ? 'rgb(62,28,74)' : 'rgb(151,151,151)',
          textAlign: 'center',
        }}>
        {label}
      </Text>
      <Image
        source={isFocused ? MyGamesIconEn : MyGamesIconDis}
        style={{height: 20, width: 20, marginLeft: 40}}
      />
    </View>
  );
}
