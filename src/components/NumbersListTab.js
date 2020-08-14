import React, {Component} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CurrentRenderContext} from '@react-navigation/native';
import {Dimensions} from 'react-native';
//https://medium.com/@Daniel.Merrill/build-a-custom-tab-bar-with-a-menu-button-in-react-navigation-in-20-minutes-f7d721551ef
//https://reactnavigation.org/docs/bottom-tab-navigator/

function NumbersListTab({
  state,
  descriptors,
  navigation,
  showCombos,
  showMyNumbers,
  showTotal,
}) {
  return (
    <View
      style={{
        height: 23,
        // backgroundColor: 'green',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderBottomColor: 'rgb(202,204,203)',
        borderBottomWidth: 2,
        width: Dimensions.get('window').width - 40,
        marginLeft: 20,
      }}>
      <TouchableOpacity onPress={() => showCombos()}>
        <Text style={showTotal ? styles.textEnabled : styles.textDisabled}>
          Total Possible Combinatons
        </Text>
        <View
          style={{
            height: 4,
            width: 165,
            backgroundColor: showTotal ? 'rgb(255,114,0)' : 'white',
            marginTop: 4,
          }}></View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => showMyNumbers()}>
        <Text style={!showTotal ? styles.textEnabled : styles.textDisabled}>
          My Numbers
        </Text>
        <View
          style={{
            height: 4,
            width: 165,
            backgroundColor: !showTotal ? 'rgb(255,114,0)' : 'white',
            marginTop: 4,
          }}></View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  textEnabled: {
    color: 'rgb(62,28,74)',
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'HelveticaNeue-Bold',
    letterSpacing: 0.38,
    marginBottom: 1,
  },
  textDisabled: {
    color: 'rgb(151,151,151)',
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'HelveticaNeue-Medium',
    letterSpacing: 0.38,
    marginBottom: 1,
  },
});

export default NumbersListTab;
