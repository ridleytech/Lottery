import React, {Component} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import TabHomeIcon from './TabHomeIcon';
import TabMyGamesIcon from './TabMyGamesIcon';
import {useSelector, useDispatch} from 'react-redux';
import { NavigationActions, StackActions,CommonActions } from '@react-navigation/native';

//https://medium.com/@Daniel.Merrill/build-a-custom-tab-bar-with-a-menu-button-in-react-navigation-in-20-minutes-f7d721551ef
//https://reactnavigation.org/docs/bottom-tab-navigator/

function CustomTabBar({state, descriptors, navigation}) {
  const currentScreen = useSelector((state) => state.currentScreen);
  const dispatch = useDispatch();

  return (
    <View
      index={5}
      style={{
        flexDirection: 'row',
        height: 64,
        backgroundColor: 'white',
        borderTopColor: 'rgb(202,204,203)',
        borderTopWidth: 2,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }

          dispatch({type: 'UPDATE_SCREEN', screen: index});

          if(index == 1)
          {
            //console.log("reset 1st tab")

            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  { name: 'AvailableGames' }
                ],
              })
            );
          }
          else if(index == 0)
          {
            //console.log("reset 2nd tab")

            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [
                  { name: 'MyGames' }
                ],
              })
            );
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });

          dispatch({type: 'UPDATE_SCREEN', screen: index});
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1, marginTop: 16}}
            key={route.key}>
            {route.key.includes('HOME') ? (
              <TabHomeIcon isFocused={isFocused} label={label} />
            ) : (
              <TabMyGamesIcon isFocused={isFocused} label={label} />
            )}

            <View
              style={{
                height: isFocused ? 4 : 0,
                width: 160,
                backgroundColor: 'rgb(255,114,0)',
                marginTop: 4,
              }}></View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default CustomTabBar;
