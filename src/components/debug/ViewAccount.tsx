import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  View,
  Text,
  TextInput,
  StatusBar,
  Switch,
  Dimensions,
  Button,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {ListItem, Left, Body, Right, Title} from 'native-base';

import {Provider, connect} from 'react-redux';
import {
  recordVoice,
  viewAccount,
  updateEmail,
  updatePassword,
} from '../actions';
import {NativeModules} from 'react-native';

import SignOutIcon from '../images/sign-out-icon.png';
import AccountIcon from '../images/account-icon.png';
import OrdersIcon from '../images/transactions-icon.png';
import EditIcon from '../images/edit-icon.png';
import AddCardIcon from '../images/add-card-icon.png';
import SampleCardIcon from '../images/sample-card-icon.png';

var isEnabled = true;

class ViewAccount extends Component {
  state = {switchValue: true};

  // toggleSwitch = (value) => {

  //   console.log("toggle");
  //     //onValueChange of the switch this function will be called
  //     //this.setState({switchValue: value})
  //     //state changes according to switch
  //     //which will result in re-render the text
  //  }

  constructor() {
    super();
  }

  componentDidMount() {}

  manageNotifications() {}

  editEmail() {
    //this.props.viewAccount(2);
    this.props.navigation.push('Edit Email');
  }

  saveEmail() {
    //this.props.updateEmail("",1);

    //return to view account

    this.props.viewAccount(1);
  }

  editPassword() {
    //this.props.viewAccount(3);
    this.props.navigation.push('Edit Password');
  }

  toggleSwitch() {
    console.log('toggleSwitch');
  }

  toggleSwitch = (value) => {
    //onValueChange of the switch this function will be called
    this.setState({switchValue: value});
    //state changes according to switch
    //which will result in re-render the text
  };

  renderInitialView() {
    var previousState;

    //mask password field

    let pw = this.props.password;
    let len = pw.length;

    return (
      <>
        <TouchableOpacity
          style={styles.closeBtnView}
          onPress={() => this.closeDetails()}>
          <Text style={styles.closeBtn}>X</Text>
        </TouchableOpacity>

        <View style={[styles.sv1]}>
          <View style={{marginTop: 70}}>
            <Text style={styles.headerLbl}>My Info</Text>

            <TouchableOpacity
              style={styles.recordViewPlay}
              onPress={() => this.editEmail()}>
              <View style={styles.div1}>
                <View>
                  <Text style={styles.topLbl}>Email</Text>
                  <Text style={styles.exerciseCell}>{this.props.email}</Text>
                </View>
                <Image source={EditIcon} style={styles.icon2} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.recordViewPlay}
              onPress={() => this.editPassword()}>
              <View style={styles.div1}>
                <View>
                  <Text style={styles.topLbl}>Password</Text>
                  <Text style={styles.exerciseCell}>
                    {pw.replace(pw, '*'.repeat(len))}
                  </Text>
                </View>
                <Image source={EditIcon} style={styles.icon2} />
              </View>
            </TouchableOpacity>

            <Text style={styles.headerLbl2}>My Preferences</Text>

            <View style={styles.div1}>
              <View>
                <Text style={styles.topLbl}>Notifications</Text>
              </View>
              {/* <Image source={EditIcon}  style={styles.icon2}/> */}

              <Switch
                style={{marginTop: 30}}
                onValueChange={this.toggleSwitch}
                value={this.state.switchValue}
                style={[styles.icon2, (ios_backgroundColor = '#3e3e3e')]}
                trackColor={{false: '#767577', true: 'rgb(123,237,141)'}}
              />
            </View>
          </View>
        </View>
      </>
    );
  }

  render() {
    return (
      <>
        <View style={styles.container}>{this.renderInitialView()}</View>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    viewAccountView: state.viewAccountView,
    viewEditEmail: state.viewEditEmail,
    viewEditPassword: state.viewEditPassword,
    email: state.email,
    password: state.password,
    viewAddCard: state.viewAddCard,
  };
};

export default connect(mapStateToProps, {
  recordVoice,
  viewAccount,
  updateEmail,
  updatePassword,
})(ViewAccount);

const styles = StyleSheet.create({
  translateBtn: {
    borderRadius: 30,
    overflow: 'hidden',
    paddingTop: 15,
    backgroundColor: 'rgb(160,160,160)',
    color: 'white',
    marginTop: 15,
    width: 300,
    height: 60,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputTxt: {
    color: 'rgb(166,188,208)',
    borderRadius: 8,
    backgroundColor: 'rgb(240,244,248)',
    overflow: 'hidden',
    width: 300,
    height: 50,
    marginTop: 10,
    fontSize: 20,
    textAlign: 'center',
  },
  inputTxt2: {
    color: 'rgb(166,188,208)',
    borderRadius: 8,
    backgroundColor: 'rgb(240,244,248)',
    overflow: 'hidden',
    width: 150,
    height: 50,
    marginTop: 10,
    fontSize: 20,
    textAlign: 'center',
  },
  sv1: {
    backgroundColor: 'white',
    height: Dimensions.get('window').height,
  },
  closeBtnView: {position: 'absolute', top: -40, right: 30},
  closeBtn: {
    color: 'rgb(116,138,157)',
  },
  sv2: {marginLeft: 30, height: 180},
  cardIcon: {
    marginRight: 10,
  },
  div1: {
    flexDirection: 'row',
    backgroundColor: 'rgb(240,244,248)',
    marginLeft: 30,
    marginRight: 30,
    height: 60,
    paddingLeft: 30,
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
  },
  fieldLbl: {
    color: 'rgb(116,138,157)',
    fontSize: 20,
  },
  headerLbl: {
    marginLeft: 30,
    marginBottom: 30,
    color: 'rgb(116,138,157)',
    fontSize: 20,
  },

  headerLbl2: {
    marginTop: 30,
    marginLeft: 30,
    marginBottom: 30,
    color: 'rgb(116,138,157)',
    fontSize: 20,
  },
  subHeaderLbl: {
    marginLeft: 30,
    marginBottom: 30,
    color: 'rgb(116,138,157)',
    fontSize: 20,
  },

  bottomView: {
    position: 'absolute',
    bottom: -20,
  },
  btnView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
  },
  container: {
    height: Dimensions.get('window').height - 190,
  },
  recordViewPlay: {
    marginBottom: 2,
  },

  doneBtn: {
    borderRadius: 30,
    borderRadius: 30,
    overflow: 'hidden',
    paddingTop: 15,
    backgroundColor: 'rgb(123,237,141)',
    color: 'white',
    marginTop: 15,
    height: 60,
    width: 300,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  chevron: {
    color: 'rgb(116,138,157)',
    fontSize: 17,
    fontWeight: 'bold',
    position: 'absolute',
    right: 20,
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 20,
  },
  icon2: {
    width: 25,
    height: 25,
    position: 'absolute',
    right: 30,
  },
  exerciseCell: {
    color: 'rgb(166,188,208)',
    fontSize: 16,
  },
  creditsView: {
    flexDirection: 'row',
    marginLeft: 50,
  },
  topLbl: {
    fontSize: 16,
    color: 'rgb(116,138,157)',
    marginRight: 10,
  },
  creditsTotalLbl: {
    fontSize: 16,
    color: 'rgb(116,138,157)',
  },
  cellInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgb(240,244,248)',
    marginLeft: 30,
    marginRight: 30,
    height: 60,
    paddingLeft: 15,
    borderRadius: 8,
    overflow: 'hidden',
  },
});
