import React, {Component, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {Text, ListItem, Left, Body, Right, Title} from 'native-base';
import {connect} from 'react-redux';
import WeekItem from './WeekItem';
import {selectGame, noneContractSelected} from '../actions';
import {getMyGames, getAvailableGames, manageGame} from '../thunks';
import MoveBall from './MoveBall';
import GamesItem from './GamesItem';
import Cash3 from '../images/cash3.png';
import GameInfo from './GameInfo';

// https://reactnative.dev/docs/flexbox

class MyGames extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    //console.log('myGames mounted');
    //this.props.getMyGames(this.props.userid, this.props.url);
  }

  selectGame(item) {
    if (item.joined == '1') {
      this.props.selectGame(item);

      this.props.navigation.navigate('NumbersList2');
    } else {
      console.log('please join game');
    }
  }

  manageGame = (item) => {
    item.url = this.props.url;
    item.status = item.joined;
    item.userid = this.props.userid;

    console.log('manageGame games: ' + JSON.stringify(item));

    this.props.manageGame(item);
  };

  listItem = ({item}) => {
    var flag;
    flag = Cash3;

    return (
      <ListItem
        style={[styles.listitem2]}
        onPress={() => this.selectGame(item)}
        noBorder>
        <Body style={styles.cellInfo}>
          <GameInfo
            item={item}
            viewingNumbers={false}
            manageGame={() => this.manageGame(item)}
            minutes={60}
            minutes={60}
            url={this.props.url}
          />

          {/* <Image source={ChevronIcon} style={styles.chevron} /> */}
        </Body>
      </ListItem>
    );
  };

  render() {
    return (
      <>
        <View style={styles.top}>
          <TouchableOpacity>
            <Text style={styles.topHeader}>GEORGIA</Text>
          </TouchableOpacity>
        </View>
        {/* <MoveBall /> */}
        <FlatList
          style={styles.list}
          data={this.props.myGames}
          renderItem={this.listItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    url: state.url,
    myGames: state.myGames,
  };
};

export default connect(mapStateToProps, {
  getMyGames,
  getAvailableGames,
  selectGame,
  manageGame,
  noneContractSelected,
})(MyGames);

const styles = StyleSheet.create({
  topHeader: {
    fontSize: 12,
    color: 'rgb(62, 28, 74)',
    letterSpacing: 3,
    fontFamily: 'HelveticaNeue-Medium',
    marginBottom: 5,
  },
  imggg: {width: 100, height: 100, marginLeft: 50},
  top: {marginLeft: 20, marginTop: 20},
  listitem2: {
    marginLeft: 0,
    minHeight: 75,
    height: 135,
    backgroundColor: 'rgba(242, 242, 243, 0.7)',
    borderWidth: 0,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    height: 115,
    alignItems: 'center',
    width: Dimensions.get('window').width - 40,
    marginLeft: 20,
    borderRadius: 12,
  },
  view1: {
    marginLeft: 20,
    // backgroundColor: 'orange',
  },
  view2: {
    // backgroundColor: 'pink',
    marginRight: 20,
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
    borderColor: 'rgb(119,194,88)',
    textAlign: 'center',
    width: 70,
    borderRadius: 10,
    marginTop: 10,
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 9,
    height: 20,
    paddingTop: 3,
    letterSpacing: 2,
    color: 'rgb(119,194,88)',
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
    fontFamily: 'ArialRoundedMTBold',
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
    fontFamily: 'HelveticaNeue-Bold',
    letterSpacing: 3,
  },
  font9: {
    fontFamily: 'HelveticaNeue-CondensedBold',
    fontSize: 9,
    color: 'rgb(102,103,103)',
    letterSpacing: 0.3,
    lineHeight: 12,
  },
  gameLbl: {
    fontFamily: 'HelveticaNeue-CondensedBold',
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
