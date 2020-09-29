import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';

class TestDispatch extends Component {
  componentDidMount() {
    //this.props.testDispatch();
  }

  render() {
    return (
      <View>
        <Text>Test</Text>
      </View>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    value: state.currentScreen,
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     testDispatch({type: 'TEST_DISPATCH'}),
//   };
// };

export default connect(mapStateToProps, {})(TestDispatch);
