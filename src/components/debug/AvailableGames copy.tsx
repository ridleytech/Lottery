import React, {Component} from 'react';
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
import {selectGame, noneContractSelected} from '../actions';
import {getAvailableGames} from '../thunks';

import Cash3 from '../images/cash3.png';

// https://reactnative.dev/docs/flexbox

class AvailableGames extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    console.log('games mounted');
    this.props.getAvailableGames(1, this.props.url);
  }

  componentWillUnmount() {
    console.log('games unmounted');
  }

  closeDetails() {
    this.props.noneContractSelected();
  }

  selectGame(item) {
    this.props.selectGame(item);

    this.props.navigation.push('NumbersList');
  }

  updateList() {
    var arr = [];
    this.state.games.map((obj) => {
      if (obj.header) {
        arr.push(this.state.games.indexOf(obj));
      }
    });
    arr.push(0);
    this.setState({
      gamesHeaderIndices: arr,
    });
  }

  listItem = ({item}) => {
    var flag;
    flag = Cash3;
    if (item.header) {
      // if (item.assigner == 'English') {
      //   flag = USA;
      // } else if (item.assigner == 'Japanese') {
      //   flag = Japan;
      // } else if (item.assigner == 'Italian') {
      //   flag = Italy;
      // } else if (item.assigner == 'Spanish') {
      //   flag = Spain;
      // }

      return (
        <ListItem style={styles.listitem}>
          <Image source={flag} style={styles.headerImg} />
          <Text style={styles.headerLbl}>{item.assigner}</Text>
        </ListItem>
      );
    } else {
      return (
        <ListItem
          style={[styles.listitem2]}
          onPress={() => this.selectGame(item)}
          noBorder>
          <Body style={styles.cellInfo}>
            <View style={styles.container}>
              <View style={styles.view1}>
                {/* <Text style={[styles.exerciseCell]}>{item.game}</Text> */}
                <Image source={flag} style={styles.headerImg} />
                <Text style={styles.gameLbl}>{item.gameDescription}</Text>
                <TouchableOpacity>
                  <Text style={styles.joinBtn}>JOIN</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.view2}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <View style={{flexDirection: 'column'}}>
                    <Text style={styles.numbersCell}>{item.participants}</Text>
                    <Text style={styles.font9}>
                      Number of{'\n'}Participants
                    </Text>
                  </View>

                  <View style={{flexDirection: 'column'}}>
                    <Text style={styles.numbersCell}>{item.uniqueNumbers}</Text>
                    <Text style={styles.font9}>
                      Available{'\n'}Unique Numbers
                    </Text>
                  </View>
                </View>
                <View>
                  <Text style={[styles.nextDraw]}>
                    Next Draw - <Text style={[styles.nextDraw2]}>00:00:00</Text>
                  </Text>
                </View>
              </View>
            </View>

            {/* <Image source={ChevronIcon} style={styles.chevron} /> */}
          </Body>
        </ListItem>
      );
    }
  };

  render() {
    return (
      <>
        <View style={styles.top}>
          <TouchableOpacity>
            <Text style={styles.topHeader}>GEORGIA</Text>
          </TouchableOpacity>
        </View>
        <Image
          style={styles.imggg}
          source={{
            uri:
              'https://www.fullstacklabs.co/img/components/Logo/logo-light@2x.png',
          }}
        />
        <FlatList
          style={styles.list}
          data={this.props.games}
          renderItem={this.listItem}
          keyExtractor={(item, index) => index.toString()}
          gamesHeaderIndices={this.props.gamesHeaderIndices}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    url: state.url,
    games: state.games,
    gamesHeaderIndices: state.gamesHeaderIndices,
    contractDetailsView: state.contractDetailsView,
    selectedContract: state.selectedContract,
  };
};

export default connect(mapStateToProps, {
  getAvailableGames,
  selectGame,
  noneContractSelected,
})(AvailableGames);

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
