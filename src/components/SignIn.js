import React, {Component} from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {authUser} from '../actions';

class SignIn extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  authUser1 = () => {
    console.log('authUser');

    // this.setState({
    //   user: {username: 'ridley1224'},
    // });

    this.props.authUser({username: 'ridley1224', password: '1224'});
  };

  render() {
    //console.log('SignIn 2 props: ' + JSON.stringify(this.props));

    return (
      //console.log('user: ' + props.user);
      <View style={{flex: 1, marginLeft: 'auto', marginRight: 'auto'}}>
        <Text style={styles.header}>Your Mobile Number</Text>
        <Text style={styles.subHeader}>
          To ensure security of your account, we will send the verification to
          your phone via SMS.
        </Text>
        <View style={styles.inputView}>
          <Text style={styles.txtHeader}>Your Mobile Number</Text>
          <TextInput style={styles.inputTxt}>(222) 222-2222</TextInput>
        </View>

        <TouchableOpacity onPress={this.authUser1}>
          <Text style={styles.submitBtn}>SUBMIT</Text>
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
  authUser,
})(SignIn);

const styles = StyleSheet.create({
  submitBtn: {
    fontFamily: 'HelveticaNeue-Medium',
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'rgb(255,114,0)',
    height: 45,
    borderRadius: 6,
    overflow: 'hidden',
    alignItems: 'center',
    padding: 10,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'rgb(255,114,0)',
  },
  header: {
    marginTop: 85,
    marginBottom: 20,
    fontFamily: 'HelveticaNeue-Bold',
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
    marginBottom: 5,
  },
  inputView: {
    marginBottom: 50,
    height: 60,
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 8,
    width: 315,
  },
});
