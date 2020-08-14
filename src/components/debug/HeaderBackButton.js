import React, {Component} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

//https://medium.com/@Daniel.Merrill/build-a-custom-tab-bar-with-a-menu-button-in-react-navigation-in-20-minutes-f7d721551ef
//https://reactnavigation.org/docs/bottom-tab-navigator/

import HeaderBack from '../images/header-back-icon.png';

class HeaderBackButton extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <View>
        <TouchableOpacity>
          <Text>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerImg: {
    width: 30,
    height: 30,
    marginLeft: 17,
    backgroundColor: 'red',
  },
});

export default HeaderBackButton;
