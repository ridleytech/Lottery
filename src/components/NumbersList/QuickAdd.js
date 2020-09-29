import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
  Platform,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import SearchIcon from '../../images/search-icon.png';

function QuickAdd({quickAddVal, quickAddEnabled, submitQuickAdd, changeVal}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 22,
        marginBottom: 27,
        marginLeft: 20,
        width: Dimensions.get('window').width - 40,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TextInput
          placeholder="Add Numbers"
          style={{
            borderBottomWidth: 1,
            borderBottomColor: 'rgb(102,103,103)',
            width: 160,
            paddingBottom: 5,
            paddingRight: 20,
            fontSize: 12,
            fontFamily: 'HelveticaNeue-Italic',
            letterSpacing: 0.9,
          }}
          value={quickAddVal}
          onChangeText={(text) => changeVal(text)}></TextInput>
        <Image source={SearchIcon} style={styles.searchIcon} />
      </View>

      <View style={styles.numberShadow}>
        <TouchableOpacity
          onPress={() => submitQuickAdd()}
          disabled={!quickAddEnabled}>
          <Text
            style={quickAddEnabled ? styles.quickAdd : styles.quickAddDisabled}>
            Quick Add
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default QuickAdd;

const styles = StyleSheet.create({
  numberShadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.3,
        shadowRadius: 2.5,
      },
      android: {
        // shadowColor: '#000',
        // shadowOffset: {width: 0, height: 2.5},
        // shadowOpacity: 0.3,
        // shadowRadius: 2.5,
        // backgroundColor: 'white',
        // elevation: 1,
      },
      default: {
        // other platforms, web for example
      },
    }),
  },
  searchIcon: {width: 20, height: 20, marginLeft: -15},
  quickAddDisabled: {
    width: 140,
    borderRadius: 13,
    color: 'white',
    backgroundColor: 'gray',
    textAlign: 'center',
    overflow: 'hidden',
    height: 26,
    paddingTop: 5,
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'Avenir-Heavy' : 'Avenir-Heavy-05',
    letterSpacing: 0.43,
    ...Platform.select({
      ios: {},
      android: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2.5},
        shadowOpacity: 0.3,
        shadowRadius: 2.5,
        elevation: 1,
      },
      default: {
        // other platforms, web for example
      },
    }),
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
    ...Platform.select({
      ios: {},
      android: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2.5},
        shadowOpacity: 0.3,
        shadowRadius: 2.5,
        elevation: 1,
      },
      default: {
        // other platforms, web for example
      },
    }),
  },
});
