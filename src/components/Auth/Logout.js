import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {logout} from '../../actions';
import {LoginManager} from 'react-native-fbsdk';
import {TouchableOpacity} from 'react-native-gesture-handler';

class Logout extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.logout();
  }

  logout = () => {
    console.log('logout');
    LoginManager.logOut();

    this.props.logout();
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity onPress={() => this.logout()}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
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
