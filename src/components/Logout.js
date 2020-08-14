import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {logout} from '../actions';

class Logout extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.props.navigation.navigate('Tabs');

    console.log('logout');

    this.props.logout();
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}></View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, {
  logout,
})(Logout);
