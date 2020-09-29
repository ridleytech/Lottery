import React, {Component, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';
import {Text, ListItem, Left, Body, Right, Title} from 'native-base';
import {connect} from 'react-redux';
import {selectGame} from '../actions';
import {getAvailableGames, getMyGames, manageGame} from '../thunks';
import MoveBall from './MoveBall';
import GamesItem from './GamesItem';
import Cash3 from '../images/cash3.png';
import GameInfo from './GameInfo';
import TestDispatch from './debug/TestDispatch';

// https://reactnative.dev/docs/flexbox

class AvailableGames extends Component<Props> {
  constructor(props: Props) {
    super(props);

    //console.log('props: ' + JSON.stringify(props));

    //props.navigation.navigator.setOnNavigatorEvent(
    //this.onNavigatorEvent.bind(this),
    //);
  }

  onNavigatorEvent(event) {
    console.log('nav event');
    // if (event.id === 'bottomTabSelected') {
    //   console.log('Tab selected!');
    // }
    // if (event.id === 'bottomTabReselected') {
    //   console.log('Tab reselected!');
    // }
  }

  componentDidMount() {
    this.props.getAvailableGames(this.props.userid, 1, this.props.url);
    //this.props.getMyGames(this.props.userid, this.props.url);

    // var ar = [1, 2, 3];

    // var total = ar.reduce(ar, 5);

    // console.log('total: ' + total);
  }

  addVals = (acc, cv) => {
    return acc + cv;
  };

  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce

  componentDidUpdate(prevProps) {
    if (prevProps.lastEditedNumbers !== this.props.lastEditedNumbers) {
      //user added/removed number from number list screen. now resfresh games info
      console.log(
        'lastEditedNumbers available games: ' +
          prevProps.lastEditedNumbers +
          ' currentProps: ' +
          this.props.lastEditedNumbers,
      );

      // console.log('refresh available games');

      // this.props.getAvailableGames(this.props.userid, 1, this.props.url);
      // this.props.getMyGames(this.props.userid, this.props.url);
    }

    if (prevProps.games !== this.props.games && this.props.games.length > 0) {
      //update UI for available numbers from refresh when users adds/removes number from numbers list screen
      console.log('games changed available games');

      // this.props.games.map((game) => {
      //   if (game.gameid === this.props.selectedGame.gameid) {
      //     console.log('update game: ' + JSON.stringify(game));
      //     this.props.selectGame(game);
      //   }
      // });
    }
  }

  selectGame(item) {
    if (item.joined == '1') {
      this.props.selectGame(item);

      this.props.navigation.navigate('NumbersList');
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
            url={this.props.url}
          />
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
        {/* <TestDispatch /> */}
        {/* <MoveBall /> */}
        <FlatList
          style={styles.list}
          data={this.props.games}
          renderItem={this.listItem}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
          gamesHeaderIndices={this.props.gamesHeaderIndices}
        />
      </>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    url: state.url,
    userid: state.userid,
    games: state.games,
    lastEditedNumbers: state.lastEditedNumbers,
    selectedGame: state.selectedGame,
  };
};

export default connect(mapStateToProps, {
  getAvailableGames,
  selectGame,
  manageGame,
  getMyGames,
})(AvailableGames);

const styles = StyleSheet.create({
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
    fontFamily:
      Platform.OS === 'ios' ? 'HelveticaNeue-Bold' : 'HelveticaNeue-Bold-02',
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
