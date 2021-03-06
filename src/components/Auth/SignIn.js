import React, {Component} from 'react';
import {Text, View, Image, StyleSheet, Alert, Platform} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {authUser} from '../../thunks';
//import FBLoginButton from './FBLoginButton';
import FBDisabled from '../../images/fb-login-disabled.png';

import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager
} from 'react-native-fbsdk';

class SignIn extends Component<Props> {
  constructor(props: Props) {
    super(props);

    //https://blog.expo.io/google-sign-in-with-react-native-and-expo-9cac6c392f0e
    //https://console.developers.google.com/apis/dashboard?project=flights-188914&pli=1
    //https://github.com/react-native-community/google-signin
    //https://medium.com/@alexb72/how-to-add-facebook-login-to-a-react-native-app-89fab128033
  }

  state = {
    myInformation: {},
    quickAddVal: '',
    phone: null,
  };

  authUserDebug = () => {
    console.log('authUser');

    this.setState({
      user: {username: 'ridley1224'},
    });

    this.props.authUser(this.state.myInformation);
  };

  GetInformationFromToken = (accessToken) => {
    console.log('GetInformationFromToken: ' + accessToken);
    const parameters = {
      fields: {
        string: 'id, first_name,last_name, quotes',
      },
    };
    const myProfileRequest = new GraphRequest(
      '/me',
      {accessToken, parameters: parameters},
      (error, myProfileInfoResult) => {
        if (error) {
          console.log('login info has error: ' + error);
        } else {
          this.setState({myInformation: myProfileInfoResult});
          console.log('result:', myProfileInfoResult);

          this.props.authUser(myProfileInfoResult, this.state.quickAddVal);
        }
      },
    );
    new GraphRequestManager().addRequest(myProfileRequest).start();
  };

  isInt(value) {
    return (
      !isNaN(value) &&
      parseInt(Number(value)) == value &&
      !isNaN(parseInt(value, 10))
    );
  }

  changeVal = (val) => {
    if (val) {
      this.setState({
        quickAddVal: val,
      });
    } else {
      this.setState({
        quickAddVal: '',
      });
    }
  };

  validateQuickAdd = () => {

    var patt = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    //console.log('patt: ' + patt);
    //console.log('val: ' + this.state.quickAddVal);

    var pos = this.state.quickAddVal.match(patt);
    //console.log("pos: " + pos)

    if (pos) {
      console.log('can login');

      this.setState({
        loginEnabled: true,
      });
    } else {
      //console.log('na');

      this.setState({
        loginEnabled: false,
      });
    }
  };

  componentDidMount () {

    AccessToken.getCurrentAccessToken().then(
      (data) => {
        
        if(data)
        {
          console.log("logged in: "+data);

          // this.setState({
          //   loginEnabled: true,
          // });

          // let result = {id: "10105898932818398", first_name: "Randall", last_name: "Ridley"}

          // this.setState({myInformation: result});
          // console.log('result:', result);

          // this.props.authUser(result, 7348901810);

          LoginManager.logOut();
        }      
      } //Refresh it every time
  );
  }

  componentDidUpdate(prevProps, nextState) {
    if (this.state.quickAddVal != nextState.quickAddVal) {
      //console.log('quickValChanged');
      this.validateQuickAdd();
    }
  }

  render() {
    //console.log('SignIn 2 props: ' + JSON.stringify(this.props));

    return (
      //console.log('user: ' + props.user);
      <View style={styles.content}>
        <Text style={styles.header}>Your Mobile Number</Text>
        <Text style={styles.subHeader}>
          To ensure security of your account, we will send the verification to
          your phone via SMS.
        </Text>
        <View style={styles.inputView}>
          <Text style={styles.txtHeader}>Your Mobile Number</Text>
          <TextInput
            style={styles.inputTxt}
            value={this.state.quickAddVal}
            onChangeText={(text) => this.changeVal(text)}
            ></TextInput>
        </View>

        <View
          style={{
            //backgroundColor: 'red',
            alignItems: 'center',
            display: 'flex',
          }}>

{/* <LoginButton
              onLoginFinished={(error, result) => {
                if (error) {
                  console.log('login has error: ' + error);
                } else if (result.isCancelled) {
                  console.log('login is cancelled.');
                } else {
                  AccessToken.getCurrentAccessToken().then((myData) => {
                    const accessToken = myData.accessToken.toString();
                    this.GetInformationFromToken(accessToken);
                  });
                }
              }}
              onLogoutFinished={() => this.setState({myInformation: {}})}
            /> */}

          {this.state.loginEnabled ? (
            <LoginButton
              onLoginFinished={(error, result) => {
                if (error) {
                  console.log('login has error: ' + error);
                } else if (result.isCancelled) {
                  console.log('login is cancelled.');
                } else {
                  AccessToken.getCurrentAccessToken().then((myData) => {
                    const accessToken = myData.accessToken.toString();
                    this.GetInformationFromToken(accessToken);
                  });
                }
              }}
              onLogoutFinished={() => this.setState({myInformation: {}})}
            />
          ) : (
            <>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert('Please enter phone number to login.');
                }} disabled={!this.state.loginEnabled}>
                <Image source={FBDisabled} style={{width: 190, height: 30}} />
              </TouchableOpacity>
            </>
          )}

          {this.props.user != null ? (
            <Text style={{fontSize: 16}}>
              Logged in As {this.props.user.first_name}{' '}
              {this.props.user.last_name}
            </Text>
          ) : null}
        </View>

        {/* shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 1,
    backgroundColor: '#0000', */}

        {/* <View
          style={{
            fontFamily:
              Platform.OS === 'ios'
                ? 'HelveticaNeue-Medium'
                : 'HelveticaNeue-Medium-11',
            fontSize: 18,
            color: 'white',
            textAlign: 'center',
            backgroundColor: 'rgb(255,114,0)',
            height: 45,
            alignItems: 'center',
            padding: 8,
            marginTop: 20,
            // borderWidth: 2,
            // borderStyle: 'solid',
            // borderColor: 'rgb(255,114,0)',
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowOffset: {width: 0, height: 6},
            shadowRadius: 9,
            elevation: 1,
            borderRadius: 6,
          }}>
          <TouchableOpacity onPress={this.authUserDebug}>
            <Text style={styles.submitBtn2}>SKIP LOGIN (for testing)</Text>
          </TouchableOpacity>
        </View> */}

        {/* <View
          style={{
            width: 56,
            height: 56,
            borderRadius: 28,
            marginBottom: 3,
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowOffset: {width: 0, height: 6},
            shadowRadius: 4,
            elevation: 1,
            backgroundColor: 'white',
          }}></View> */}

        {/* <TouchableOpacity style={styles.loginBtn} onPress={this.authUserDebug}>
          <Text style={[styles.submitBtn, {marginTop: 30}]}>
            SKIP LOGIN (for testing)
          </Text>
        </TouchableOpacity> */}
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
  authUser,
})(SignIn);

const styles = StyleSheet.create({
  content: {
    flex: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 20,
  },
  submitBtn: {
    fontFamily:
      Platform.OS === 'ios'
        ? 'HelveticaNeue-Medium'
        : 'HelveticaNeue-Medium-11',
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'rgb(255,114,0)',
    height: 45,
    //borderRadius: 6,
    //overflow: 'hidden',
    alignItems: 'center',
    padding: 10,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'rgb(255,114,0)',
  },
  submitBtn2: {
    fontFamily:
      Platform.OS === 'ios'
        ? 'HelveticaNeue-Medium'
        : 'HelveticaNeue-Medium-11',
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'rgb(255,114,0)',
    //borderRadius: 6,
    //overflow: 'hidden',
    alignItems: 'center',
  },
  loginBtn: {
    elevation: 1,
    // shadowColor: '#000',
    // shadowOpacity: 0.2,
    // shadowOffset: {width: 0, height: 6},
    // shadowRadius: 4,
    elevation: 1,
    backgroundColor: 'white',
  },
  enabled: {
    fontFamily:
      Platform.OS === 'ios'
        ? 'HelveticaNeue-Medium'
        : 'HelveticaNeue-Medium-11',
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    backgroundColor: '#1876f1',
    height: 30,
    borderRadius: 2,
    overflow: 'hidden',
    alignItems: 'center',
    padding: 4,
    width: 190,
  },
  disabled: {
    fontFamily:
      Platform.OS === 'ios'
        ? 'HelveticaNeue-Medium'
        : 'HelveticaNeue-Medium-11',
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'gray',
    height: 30,
    borderRadius: 2,
    overflow: 'hidden',
    alignItems: 'center',
    padding: 4,
    width: 190,
  },
  header: {
    marginTop: 85,
    marginBottom: 20,
    fontFamily:
      Platform.OS === 'ios' ? 'HelveticaNeue-Bold' : 'HelveticaNeue-Bold-02',
    fontSize: 21,
    color: 'rgb(62,28,74)',
  },
  subHeader: {marginBottom: 30, fontFamily: 'HelveticaNeue', fontSize: 14},
  txtHeader: {fontFamily: 'Helvetica', fontSize: 12, color: 'rgb(74,74,74)'},
  inputTxt: {
    fontFamily: 'Helvetica',
    fontSize: 16,
    color: 'rgb(24,38,66)',
    marginTop: 5,
  },
  inputView: {
    marginBottom: 30,
    height: 60,
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 8,
  },
});
