import RemoveNumberIcon from '../../images/remove-number-icon.png';
import AddNumberIcon from '../../images/add-number-icon.png';

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
import {ListItem, Body} from 'native-base';

function NumbersItem({item, selectItem}) {
  //console.log('item: ' + JSON.stringify(item));
  //console.log('numbers: ' + item.item.numbers);

  //console.log('item');

  var numbers = item.item.numbers.split(' ');

  function randomStr(len, arr) {
    var ans = '';
    for (var i = len; i > 0; i--) {
      ans += arr[Math.floor(Math.random() * arr.length)];
    }
    return ans;
  }

  var akey3 = item.item.gamerowid + randomStr(3, '123khsl');

  return (
    <ListItem style={[styles.listitem2]} noBorder key={akey3}>
      <Body style={styles.cellInfo}>
        <View style={styles.container}>
          <View style={styles.view3}>
            <TouchableOpacity onPress={() => selectItem(item)}>
              <Image
                source={item.item.selected ? RemoveNumberIcon : AddNumberIcon}
                style={styles.selectIcon}
              />
            </TouchableOpacity>

            <Text style={styles.orderCell}>{item.item.order}.</Text>

            {numbers.map((numberItem, index) => {
              return (
                <>
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
                      shadowColor: '#000',
                      shadowOpacity: 0.2,
                      shadowOffset: {width: 0, height: 6},
                      shadowRadius: 9,
                      elevation: 1,
                      borderRadius: 6,
                    }}>
                    <TouchableOpacity>
                      <Text>SKIP LOGIN (for testing)</Text>
                    </TouchableOpacity>
                  </View> */}

                  <View style={styles.numberShadow}>
                    <Text style={styles.numberCell}>{numberItem}</Text>
                  </View>
                </>
              );
            })}
          </View>

          <Text style={styles.playedCell}>
            Played by {item.item.assignedTotal} users
          </Text>
        </View>
      </Body>
    </ListItem>
  );
}

export default NumbersItem;

const styles = StyleSheet.create({
  playedCell: {
    marginTop: 10,
    // backgroundColor: 'green',
    color: 'rgb(151, 151, 151)',
    fontFamily: Platform.OS === 'ios' ? 'Avenir-Oblique' : 'Avenir-Oblique-11',
    fontSize: 14,
  },
  orderCell: {marginLeft: 20},
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
    marginLeft: 20,
    ...Platform.select({
      ios: {},
      android: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2.5},
        shadowOpacity: 0.3,
        shadowRadius: 2.5,
        backgroundColor: 'white',
        elevation: 1,
      },
      default: {
        // other platforms, web for example
      },
    }),
  },
  selectIcon: {width: 38, height: 38},
  numberShadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {width: 0, height: 6},
        shadowRadius: 2.5,
        //elevation: 1,
        //backgroundColor: 'white',
      },
      android: {},
      default: {
        // other platforms, web for example
      },
    }),
  },
  view3: {
    flexDirection: 'row',
    alignItems: 'center',
    width: Dimensions.get('window').width - 40,
  },
  listitem2: {
    marginLeft: 0,
    minHeight: 75,
    height: 90,
    backgroundColor: 'white',
    borderWidth: 0,
  },
  cellInfo: {flexDirection: 'row', alignItems: 'center'},
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
});
