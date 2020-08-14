import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Player from './Player';
class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.add();
  }

  add = () => {
    this.setState({data: 30});
  };

  render() {
    return (
      <View>
        <Text>Hello</Text>
        <Player />
      </View>
    );
  }
}

export default Game;
