import React, {Component, createRef} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Text, ListItem, Left, Body, Right, Title} from 'native-base';
import {connect} from 'react-redux';
import WeekItem from './WeekItem';
import NumbersListTab from './NumbersListTab';
import {selectNumbers, removeNumbers, sortMyNumbers} from '../actions';
import {
  getGameNumbers,
  manageNumbers,
  updateNumber,
  getUserNumbers,
  manageGame,
} from '../thunks';

import Cash3 from '../images/cash3.png';
import SearchIcon from '../images/search-icon.png';
import AddNumberIcon from '../images/add-number-icon.png';
import RemoveNumberIcon from '../images/remove-number-icon.png';
import {TextInput} from 'react-native-gesture-handler';
import GameInfo from './GameInfo';
import NumbersRow from './NumbersRow';
import MostLeastPlayed from './MostLeastPlayed';
import MyNumbersOptions2 from './MyNumbersOptions2';
import QuickAdd from './QuickAdd';
import NumbersItem from './NumbersItem';

// https://reactnative.dev/docs/flexbox

class NumbersList extends Component<Props> {
  constructor(props: Props) {
    super(props);

    this.selectItem = this.selectItem.bind(this);
  }

  flatList = createRef<FlatList<any>>();

  state = {
    addingNumber: true,
    showTotal: true,
    quickAddVal: '',
    quickAddEnabled: false,
  };

  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon name={'user'} size={50} color={tintColor} />
    ),
  };

  componentDidMount() {
    this.props.getGameNumbers(
      0,
      this.props.selectedGame.gameid,
      this.props.selectedGame.stateid,
      this.props.userid,
      this.props.url,
      this.props.gamesNumbersPage,
    );

    this.props.getUserNumbers(
      this.props.userid,
      this.props.selectedGame.gameid,
      0,
      this.props.url,
      this.props.gamesMyNumbersPage,
    );
  }

  closeDetails() {
    this.props.noneContractSelected();
  }

  componentDidUpdate(prevProps, nextState) {
    //console.log("update1: " + JSON.stringify(prevState) )

    if (this.state.quickAddVal != nextState.quickAddVal) {
      //console.log("quickValChanged")
      this.validateQuickAdd();
    }

    if (prevProps.lastEditedNumbers !== this.props.lastEditedNumbers) {
      //console.log('lastEditedNumbers changed');

      //update state to show new list of handpicked numbes after add/removing
      //disable for now

      // this.setState({
      //   showTotal: false,
      //   sort: 1,
      // });

      this.setState({
        quickAddVal: '',
      });

      //query latest numbers

      this.props.getGameNumbers(
        0,
        this.props.selectedGame.gameid,
        this.props.selectedGame.stateid,
        this.props.userid,
        this.props.url,
        this.props.gamesMyNumbersPage,
      );

      console.log('reload user numbers');

      this.props.getUserNumbers(
        this.props.userid,
        this.props.selectedGame.gameid,
        0,
        this.props.url,
        this.props.gamesMyNumbersPage,
      );
    }
  }

  showCombos = () => {
    console.log('showCombos');

    this.setState({
      showTotal: true,
    });

    this.props.getGameNumbers(
      0,
      this.props.selectedGame.gameid,
      this.props.selectedGame.stateid,
      this.props.userid,
      this.props.url,
      this.props.gamesNumbersPage,
    );
  };

  showMyNumbers = () => {
    console.log('showMyNumbers');

    this.setState({
      showTotal: false,
      sort: 0,
    });

    this.props.getUserNumbers(
      this.props.userid,
      this.props.selectedGame.gameid,
      0,
      this.props.url,
      this.props.gamesMyNumbersPage,
    );
  };

  showAll = () => {
    this.setState({
      sort: 0,
    });
  };

  showPicked = () => {
    this.setState({
      sort: 1,
    });
  };

  showAssigned = () => {
    this.setState({
      sort: 2,
    });
  };

  selectItem(item) {
    console.log('number item: ' + JSON.stringify(item));
    //console.log('state: ' + JSON.stringify(this.state));

    var status;

    if (item.item.selected == true) {
      console.log('remove numbers');
      //this.props.removeNumbers(item);

      status = 0;

      this.setState({
        addingNumber: false,
      });
    } else {
      console.log('add numbers');
      //this.props.selectNumbers(item);

      status = 1;

      this.setState({
        addingNumber: true,
      });
    }

    this.props.manageNumbers(
      item.item.numbers,
      1,
      this.props.selectedGame.gameid,
      1,
      this.props.userid,
      status,
      0,
      this.props.url,
    );
  }

  validateQuickAdd = () => {
    var patt = /^[0-9]\s[0-9]\s[0-9]$/;
    var pos = this.state.quickAddVal.match(patt);
    //console.log("pos: " + pos)

    if (pos) {
      //console.log("quickAdd")

      var myCurrentNumbers = this.props.myGameNumbers.filter(
        (item) => item.numbers == this.state.quickAddVal,
      );

      var gameCurrentNumbers = this.props.gameNumbers.filter(
        (item) => item.numbers == this.state.quickAddVal,
      );

      // console.log('myCurrentNumbers: ' + myCurrentNumbers.length);
      // console.log('gameCurrentNumbers: ' + gameCurrentNumbers.length);

      if (myCurrentNumbers.length == 0 && gameCurrentNumbers.length == 0) {
        this.setState({
          quickAddEnabled: true,
        });
      }
    } else {
      //console.log("na")

      this.setState({
        quickAddEnabled: false,
      });
    }
  };

  submitQuickAdd = () => {
    if (this.state.quickAddEnabled) {
      console.log('submitQuickAdd');
    }

    this.props.manageNumbers(
      this.state.quickAddVal,
      1,
      this.props.selectedGame.gameid,
      1,
      this.props.userid,
      0,
      1,
      this.props.url,
    );
  };

  changeVal = (val) => {
    console.log('changeVal: ' + val);

    if (val) {
      if (val.length <= 5) {
        this.setState({
          quickAddVal: val,
        });
      }
    }
  };

  manageGame = (item) => {
    item.url = this.props.url;
    item.status = item.joined;
    item.userid = this.props.userid;

    console.log('manageGame numbersList: ' + JSON.stringify(item));

    this.props.manageGame(item);

    this.props.navigation.pop();
  };

  render() {
    //console.log('nl: ' + JSON.stringify(this.props));

    var list;

    if (this.state.showTotal == true) {
      //console.log('game');

      list = this.props.gameNumbers;
    } else if (this.state.showTotal == false && this.state.sort == 0) {
      //console.log('game');

      list = this.props.myGameNumbers;
    } else if (this.state.sort == 1) {
      //console.log('manual');

      list = this.props.manualNumbers;
    } else {
      //console.log('auto');
      list = this.props.autoNumbers;
    }

    //console.log(this.state.sort);

    return (
      <>
        <View style={{backgroundColor: 'white'}}>
          <View style={styles.top2}>
            <ListItem style={[styles.listitem2]} noBorder>
              <Body style={styles.cellInfo}>
                <GameInfo
                  item={this.props.selectedGame}
                  viewingNumbers={true}
                  manageGame={() => this.manageGame(this.props.selectedGame)}
                  minutes={60}
                  url={this.props.url}
                />
              </Body>
            </ListItem>
          </View>

          <QuickAdd
            quickAddVal={this.state.quickAddVal}
            quickAddEnabled={this.state.quickAddEnabled}
            submitQuickAdd={this.submitQuickAdd}
            changeVal={this.changeVal}
          />

          <NumbersListTab
            showMyNumbers={() => this.showMyNumbers()}
            showCombos={() => this.showCombos()}
            showTotal={this.state.showTotal}
          />

          {this.state.showTotal ? (
            <MostLeastPlayed mostPlayed={this.props.mostPlayed} />
          ) : (
            <MyNumbersOptions2
              sort={this.state.sort}
              showAll={() => this.showAll()}
              showPicked={() => this.showPicked()}
              showAssigned={() => this.showAssigned()}
              totalUserNumberCount={this.props.myGameNumbers.length}
              autoUserNumberCount={this.props.autoNumbers.length}
              manualNumberCount={this.props.manualNumbers.length}
            />
          )}

          <FlatList
            ref={this.flatList}
            style={styles.list}
            data={list}
            renderItem={(item) => (
              <NumbersItem item={item} selectItem={this.selectItem} />
            )}
            //key={(item) => item.gamerowid}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    url: state.url,
    userid: state.userid,
    gamesHeaderIndices: state.gamesHeaderIndices,
    selectedGame: state.selectedGame,
    mostPlayed: state.mostPlayed,
    selectedNumbers: state.selectedNumbers,
    gameNumbers: state.gameNumbers,
    myGameNumbers: state.myGameNumbers,
    autoNumbers: state.autoNumbers,
    manualNumbers: state.manualNumbers,
    //lastSubmittedNumber: state.lastSubmittedNumber,
    lastEditedNumbers: state.lastEditedNumbers,
    gamesNumbersPage: state.gamesNumbersPage,
    gamesMyNumbersPage: state.gamesMyNumbersPage,
    myGamesNumbersPage: state.myGamesNumbersPage,
    myGamesMyNumbersPage: state.myGamesMyNumbersPage,
  };
};

export default connect(mapStateToProps, {
  getGameNumbers,
  manageNumbers,
  updateNumber,
  getUserNumbers,
  sortMyNumbers,
  manageGame,
})(NumbersList);

const styles = StyleSheet.create({
  list: {marginBottom: 300},
  searchIcon: {width: 20, height: 20, marginLeft: -15},
  playedActive: {
    width: 110,
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
    fontFamily: 'Avenir-Heavy',
    letterSpacing: 0.43,
  },
  playedDisabled: {
    width: 110,
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
    fontFamily: 'Avenir-Heavy',
    letterSpacing: 0.43,
  },
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
    fontFamily: 'Avenir-Heavy',
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
    fontFamily: 'Avenir-Heavy',
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
    fontFamily: 'Avenir-Oblique',
    fontSize: 14,
  },
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
    fontFamily: 'HelveticaNeue-Medium',
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
    fontFamily: 'HelveticaNeue-Bold',
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
    fontFamily: 'HelveticaNeue-Bold',
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
