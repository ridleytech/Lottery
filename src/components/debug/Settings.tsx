import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {connect} from 'react-redux';

import {recordVoice, viewAccount} from '../actions';
import SignOutIcon from '../images/sign-out-icon.png';
import AccountIcon from '../images/account-icon.png';
import OrdersIcon from '../images/transactions-icon.png';
import ChevronIcon from '../images/chevron-icon.png';
import ViewAccount from './ViewAccount';

class Settings extends Component {
  constructor() {
    super();
  }

  componentDidMount() {}

  viewAccount() {
    this.props.viewAccount(1);
  }

  viewOrders() {}

  signOut() {}

  buyCredits() {}

  renderInitialView() {
    return (
      <>
        <TouchableOpacity
          style={styles.recordViewPlay}
          onPress={() => this.viewAccount()}>
          <View style={styles.cellInfo}>
            <Image source={AccountIcon} style={styles.icon} />
            <Text style={styles.topLbl}>Your Account</Text>
            {/* <Text style={styles.chevron}>></Text> */}

            <Image source={ChevronIcon} style={styles.chevron} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.recordViewPlay}
          onPress={() => this.signOut()}>
          <View style={styles.cellInfo}>
            <Image source={SignOutIcon} style={styles.icon} />
            <Text style={styles.topLbl}>Sign Out</Text>
            <Image source={ChevronIcon} style={styles.chevron} />
          </View>
        </TouchableOpacity>
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
  };
};

export default connect(mapStateToProps, {recordVoice, viewAccount})(Settings);

const styles = StyleSheet.create({
  topLbl: {
    fontSize: 16,
    color: 'rgb(116,138,157)',
    marginRight: 10,
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
    height: Dimensions.get('window').height - 250,
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
    right: 20,
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 20,
  },
  exerciseCell: {},
  creditsView: {
    flexDirection: 'row',
    marginLeft: 50,
  },
  creditsLbl: {
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
