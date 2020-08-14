import RemoveNumberIcon from '../images/remove-number-icon.png';
import AddNumberIcon from '../images/add-number-icon.png';

import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
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

  return (
    <ListItem style={[styles.listitem2]} noBorder>
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
              // var a = Math.random() * 10;
              var akey =
                item.item.gamerowid +
                '' +
                item.item.order +
                '' +
                numberItem +
                randomStr(3, '123ksl');

              var akey2 =
                item.item.gamerowid +
                '' +
                item.item.order +
                '' +
                numberItem +
                randomStr(4, '123ksl');

              //console.log('akey: ' + akey);
              return (
                <>
                  <View style={styles.numberShadow} key={akey}>
                    <Text style={styles.numberCell} key={akey2}>
                      {numberItem}
                    </Text>
                  </View>
                </>
              );
            })}
          </View>

          <Text style={styles.playedCell}>
            Played by {item.item.assignedTotal} users
          </Text>
        </View>

        {/* <Image source={ChevronIcon} style={styles.chevron} /> */}
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
    fontFamily: 'Avenir-Oblique',
    fontSize: 14,
  },
  orderCell: {marginLeft: 20},
  numberCell: {
    fontFamily: 'ArialRoundedMTBold',
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
  },
  selectIcon: {width: 38, height: 38},
  numberShadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 2.5,
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
