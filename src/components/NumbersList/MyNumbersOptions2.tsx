import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';

function MyNumbersOptions2({
  sort,
  showAll,
  showPicked,
  showAssigned,
  totalUserNumberCount,
  autoUserNumberCount,
  manualNumberCount,
}) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        marginBottom: 10,
        marginLeft: 20,
        width: Dimensions.get('window').width - 40,
      }}>
      <TouchableOpacity onPress={() => showAll()} style={{width: 74}}>
        <Text style={sort == 0 ? styles.playedActive : styles.playedDisabled}>
          All ({totalUserNumberCount})
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => showPicked()} style={{width: 129}}>
        <Text style={sort == 1 ? styles.playedActive : styles.playedDisabled}>
          Handpicked ({manualNumberCount})
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => showAssigned()} style={{width: 108}}>
        <Text style={sort == 2 ? styles.playedActive : styles.playedDisabled}>
          Assigned ({autoUserNumberCount})
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default MyNumbersOptions2;

const styles = StyleSheet.create({
  list: {marginBottom: 300},
  searchIcon: {width: 20, height: 20, marginLeft: -15},
  playedActive: {
    borderWidth: 2,
    borderRadius: 13,
    color: 'rgb(62, 28, 74)',
    borderColor: 'rgb(246,183,61)',
    backgroundColor: 'rgba(246,183,61,.2)',
    textAlign: 'center',
    overflow: 'hidden',
    height: 26,
    paddingTop: 3,
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'Avenir-Heavy' : 'Avenir-Heavy-05',
    letterSpacing: 0.43,
  },
  playedDisabled: {
    borderWidth: 1,
    borderRadius: 13,
    color: 'rgb(202,204,203)',
    borderColor: 'rgb(202,204,203)',
    backgroundColor: 'white',
    textAlign: 'center',
    overflow: 'hidden',
    height: 26,
    paddingTop: 3,
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'Avenir-Heavy' : 'Avenir-Heavy-05',
    letterSpacing: 0.43,
  },
  quickAdd: {
    width: 140,
    borderRadius: 13,
    color: 'white',
    backgroundColor: '(rgb(119,194,88))',
    textAlign: 'center',
    overflow: 'hidden',
    height: 26,
    paddingTop: 5,
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'Avenir-Heavy' : 'Avenir-Heavy-05',
    letterSpacing: 0.43,
  },
  top2: {
    marginTop: 40,
    marginBottom: 18,
  },
  playedCell: {
    marginTop: 10,
    // backgroundColor: 'green',
    color: 'rgb(151, 151, 151)',
    fontFamily: Platform.OS === 'ios' ? 'Avenir-Oblique' : 'Avenir-Oblique-11',
    fontSize: 14,
  },
  numberCell: {
    fontFamily:
      Platform.OS === 'ios' ? 'Arial Rounded MT Bold' : 'Arial-Rounded-Bold',
    fontSize: 18,
    color: 'rgb(255,114,0)',
    width: 32,
    height: 32,
    backgroundColor: 'white',
    textAlign: 'center',
    paddingTop: 5,
    borderRadius: 16,
    overflow: 'hidden',
  },
  numberShadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 2.5,
  },
  selectIcon: {width: 38, height: 38},
  topHeader: {
    fontSize: 12,
    color: 'rgb(62, 28, 74)',
    letterSpacing: 3,
    fontFamily:
      Platform.OS === 'ios'
        ? 'HelveticaNeue-Medium'
        : 'HelveticaNeue-Medium-11',
    marginBottom: 5,
  },

  top: {marginLeft: 20, marginTop: 20},
  listitem2: {
    marginLeft: 0,
    minHeight: 75,
    height: 90,
    backgroundColor: 'white',
    borderWidth: 0,
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    // backgroundColor: 'red',
    height: 80,
    alignItems: 'center',
    width: Dimensions.get('window').width - 40,
    marginLeft: 20,
    borderRadius: 12,
  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    height: 130,
    alignItems: 'center',
    width: Dimensions.get('window').width - 40,
    marginLeft: 20,
    borderRadius: 12,
    borderColor: 'rgb(202,204,203)',
    borderWidth: 1,
  },
  view1: {
    marginLeft: 20,

    // backgroundColor: 'orange',
  },
  view2: {
    // backgroundColor: 'pink',
    marginRight: 20,
  },
  view3: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-around',
    // backgroundColor: 'yellow',
    width: Dimensions.get('window').width - 40,
  },
  closeBtn: {
    color: 'rgb(116,138,157)',
  },
  cellInfo: {flexDirection: 'row', alignItems: 'center'},
  inputTxt: {
    marginTop: 20,
    fontSize: 16,
    color: 'rgb(116,138,157)',
  },
  headerTxt: {
    marginTop: 20,
  },

  chevron: {},
  listitem: {
    marginLeft: 5,
    backgroundColor: 'rgb(248,248,248)',
  },
  headerImg: {
    width: 90,
    height: 45,
    marginRight: 10,
    marginLeft: 10,
  },
  joinBtn: {
    borderWidth: 1,
    borderColor: 'green',
    textAlign: 'center',
    width: 70,
    borderRadius: 10,
    marginTop: 10,
    fontFamily:
      Platform.OS === 'ios' ? 'HelveticaNeue-Bold' : 'HelveticaNeue-Bold-02',
    fontSize: 9,
    height: 20,
    paddingTop: 3,
    letterSpacing: 2,
    color: 'rgb(119,194,88)',
  },
  leaveBtn: {
    borderWidth: 1,
    borderColor: 'rgb(208,47,119)',
    textAlign: 'center',
    width: 70,
    borderRadius: 10,
    marginTop: 10,
    fontFamily:
      Platform.OS === 'ios' ? 'HelveticaNeue-Bold' : 'HelveticaNeue-Bold-02',
    fontSize: 9,
    height: 20,
    paddingTop: 3,
    letterSpacing: 2,
    color: 'rgb(208,47,119)',
  },
  item2: {
    backgroundColor: 'white',
  },
  headerLbl: {
    color: 'black',
    width: Dimensions.get('window').width,
    marginLeft: 0,
  },
  numbersCell: {
    fontFamily:
      Platform.OS === 'ios' ? 'Arial Rounded MT Bold' : 'Arial-Rounded-Bold',
    fontSize: 28,
    color: 'rgb(255,114,0)',
  },
  exerciseCell: {
    marginTop: 0,
    fontSize: 9,
    color: 'rgb(116,138,157)',
    backgroundColor: 'yellow',
  },
  nextDraw: {
    fontSize: 11,
    color: 'rgb(62,28,74)',
    marginTop: 14,
    fontFamily: 'HelveticaNeue',
    letterSpacing: 0.3,
  },
  nextDraw2: {
    fontSize: 11,
    color: 'rgb(62,28,74)',
    marginTop: 14,
    fontFamily:
      Platform.OS === 'ios' ? 'HelveticaNeue-Bold' : 'HelveticaNeue-Bold-02',
    letterSpacing: 3,
  },
  font9: {
    fontFamily:
      Platform.OS === 'ios'
        ? 'HelveticaNeue-CondensedBold'
        : 'HelveticaNeue-CondensedBold-05',
    fontSize: 9,
    color: 'rgb(102,103,103)',
    letterSpacing: 0.3,
    lineHeight: 12,
  },
  gameLbl: {
    fontFamily:
      Platform.OS === 'ios'
        ? 'HelveticaNeue-CondensedBold'
        : 'HelveticaNeue-CondensedBold-05',
    fontSize: 9,
    color: 'rgb(102,103,103)',
    marginTop: 5,
    letterSpacing: 0.3,
  },
  body1: {
    marginRight: Dimensions.get('window').width,
    backgroundColor: 'white',
  },
});
