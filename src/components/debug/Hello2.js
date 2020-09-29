import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';

class Hello2 extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  testButton = () => {
    return 2;
  };

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text testID={'username'}>Loading...</Text>
      </View>
    );
  }
}

export default Hello2;
