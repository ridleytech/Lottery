import React, {Component} from 'react';
import {Button} from 'react-native';

import {LoginManager} from 'react-native-fbsdk';

export default class FBLoginButton extends Component {
  handleFacebookLogin() {
    LoginManager.logInWithPermissions(['first_name', 'last_name', 'id']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            'Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  }
  render() {
    return (
      <Button
        onPress={this.handleFacebookLogin}
        title="Continue with fb"
        color="#4267B2"
      />
    );
  }
}
