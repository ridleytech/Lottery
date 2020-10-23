import {act} from 'react-test-renderer';
//import {actions} from '../thunks/actions';
//import {initialState} from '../data/initialState';

var local: Boolean = false;
var localPath = 'http://localhost:8888/ridleytech/lottery/';
//var localPath = 'http://10.0.2.2:8888/ridleytech/lottery/';
//var remotePath = 'http://agiledevelopment.xyz/lottery/';
var remotePath = 'http://44.237.238.43/lottery/';

var url;

if (local) {
  url = localPath;
} else {
  url = remotePath;
}

console.log('url: ' + url);

const initialState = {
  mostPlayed: 0,
  gameNumbers: [],
  gamesMyGameNumbers: [],
  myGamesGameNumbers: [],
  myGamesMyGameNumbers: [],

  myGameNumbers: [],
  autoNumbers: [],
  manualNumbers: [],

  myGamesAutoNumbers: [],
  myGamesManualNumbers: [],

  selectedNumbers: [],
  selectedNumber: null,
  lastEditedNumbers: null,
  numberStatus: null,
  games: [],
  myGames: [],

  selectedGame: null,
  updatedGame: null,
  lastSubmittedNumber: null,
  firstName: '',
  lastName: '',
  phone: '',
  email: 'randall.ridley@gmail.com',
  password: '1224',
  _id: '',
  toUpdate: false,
  url: url,
  user: null,
  userid: 502,
  gamesNumbersPage: 0,
  gamesMyNumbersPage: 0,
  myGamesNumbersPage: 0,
  myGamesMyNumbersPage: 0,
  refreshing: false,
  currentScreen: null,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case 'AUTH_USER':
      console.log(
        'redux user: ' +
          JSON.stringify(action.user) +
          ' payload: ' +
          JSON.stringify(action.payload),
      );
      return {
        ...state,
        user: action.user,
        payload: action.payload,
        userid: action.payload.data.userid
      };

    case 'LOGOUT_USER':
      console.log('logout redux');
      return {
        ...state,
        user: null,
      };

    case 'TEST_DISPATCH':
      console.log('TEST_DISPATCH');
      return {
        ...state,
      };

    case 'GET_DATA':
      console.log('stuff: ' + action.data);
      return {
        ...state,
        data: action.data,
      };

    case 'UPDATE_SCREEN':
      //console.log('update screen: ' + action.screen);
      return {
        ...state,
        currentScreen: action.screen,
      };

    case 'SET_REFRESHING':
      return {
        ...state,
        refreshing: action.status,
      };

    case 'SHOW_MOST_PLAYED':
      console.log('SHOW_MOST_PLAYED');
      return {
        ...state,
        mostPlayed: action.mostPlayed,
      };

    case 'USER_GAME_UPDATED':
      console.log('USER_GAME_UPDATED');

      var currentGames = state.games.slice();
      var myCurrentGames = state.myGames.slice();

      if (action.item.status == '0') {
        //status 0 means old status was not joined. join game

        currentGames.map((ob) => {
          if (action.item.gameid === ob.gameid) {
            ob.joined = '1';
            console.log(
              'just joined. change available games change UI action to leave',
            );
          }
        });

        let filteredCG = myCurrentGames.filter(
          (ob) => ob.gameid === action.item.gameid,
        );

        if (filteredCG.length == 0) {
          //add joined game to my games list

          console.log(
            'current my games doesnt have new game. add ' + action.item.gameid,
          );

          myCurrentGames.push(action.item);
        }
      } else {
        currentGames.map((ob) => {
          //just left game. update UI to join game

          if (action.item.gameid === ob.gameid) {
            ob.joined = '0';
            console.log(
              'available games ' +
                action.item.gameid +
                ' change UI action to join',
            );
          }
        });

        console.log('removing game ' + action.item.gameid + ' from my games');

        myCurrentGames = myCurrentGames.filter(
          (ob) => ob.gameid !== action.item.gameid,
        );
      }

      return {
        ...state,
        games: currentGames,
        myGames: myCurrentGames,
      };

    case 'SELECT_NUMBERS':
      var currentSelectedNumbers = state.selectedNumbers.slice();
      var currentGameNumbers = state.gameNumbers.slice();

      currentSelectedNumbers.push(action.selectedNumbers.numbers);

      //loop through current game numbers and update selected state

      currentGameNumbers.map((obj) => {
        if (obj.numbers === action.selectedNumbers.numbers) {
          obj.selected = true;
          console.log('found match');
        }
      });

      return {
        ...state,
        selectedNumber: action.selectedNumbers.numbers,
        selectedNumbers: currentSelectedNumbers,
        gameNumbers: currentGameNumbers,
      };

    case 'REMOVE_NUMBERS':
      var currentSelectedNumbers = state.selectedNumbers.slice();
      var currentGameNumbers = state.gameNumbers.slice();
      var myCurrentNumbers = state.myGameNumbers.slice();

      currentSelectedNumbers = currentSelectedNumbers.filter(
        (ob) => ob !== action.selectedNumbers.numbers,
      );

      currentGameNumbers.map((obj) => {
        if (obj.numbers === action.selectedNumbers.numbers) {
          obj.selected = false;
          console.log('found match');
        }
      });

      //remove if in my current numbers

      myCurrentNumbers = myCurrentNumbers.filter(
        (ob) => ob.numbers !== action.selectedNumbers.numbers,
      );

      return {
        ...state,
        selectedNumbers: currentSelectedNumbers,
        gameNumbers: currentGameNumbers,
        myGameNumbers: myCurrentNumbers,
      };

    case 'SELECTED_GAME':
      return {
        ...state,
        selectedGame: action.selectedGame,
      };

    case 'GAMES_FETCH':
      //console.log('GAMES_FETCH');

      //console.log('GAMES_FETCH: ' +  JSON.stringify(action.payload.data));

      return {
        ...state,
        games: action.payload.data.availableGames,
        myGames: action.payload.data.myGames,
      };

    case 'MY_GAMES_FETCH':
      //console.log('GAMES_FETCH: ' + JSON.stringify(action.payload));

      return {
        ...state,
        myGames: action.payload,
      };

    case 'NUMBERS_MANAGED':
      console.log('NUMBERS_MANAGED: ' + JSON.stringify(action.payload));

      // var myCurrentNumbers = state.myGameNumbers.slice();

      // var newItem = {
      //   numbers: action.payload.numbers,
      //   pick3id: action.payload.pick3id,
      //   assignedTotal: action.payload.assignedTotal,
      //   selected: true,
      //   order: myCurrentNumbers.length + 1,
      // };

      // myCurrentNumbers.push(newItem);

      //

      let currentAvailableGames = state.games;

      let updatedGame = action.payload.data.updatedGame;

      currentAvailableGames.map((obj) => {
        console.log('checking game');

        if (obj.gameid === updatedGame.gameid) {
          (obj.uniqueNumbers = updatedGame.uniqueNumbers),
            (obj.participants = updatedGame.participants);

          console.log('updating game: ' + obj.gameid);
        }
      });

      let currentAvailableGames2 = state.myGames;

      currentAvailableGames2.map((obj) => {
        console.log('checking game myGames');

        if (obj.gameid === updatedGame.gameid) {
          (obj.uniqueNumbers = updatedGame.uniqueNumbers),
            (obj.participants = updatedGame.participants);

          console.log('updating game myGames: ' + obj.gameid);
        }
      });

      return {
        ...state,
        games: currentAvailableGames,
        lastEditedNumbers: action.payload.data.numbersResult.gamerowid,
        numberStatus: action.payload.data.numbersResult.status
      };

    case 'SORT_MY_NUMBERS':
      console.log('SORT_MY_NUMBERS');

      action.payload.map((obj) => {
        if (!state.selectedNumbers.includes(obj.numbers)) {
          obj.selected = false;
        } else {
          obj.selected = true;
        }
      });

      return {
        ...state,
        myGameNumbers: action.payload,
      };

    case 'GAME_NUMBERS_FETCH':
      //var currentGameNumbers = state.gameNumbers.slice();

      var gameNumbers = action.payload.data.gameNumbers;
      console.log('GAME_NUMBERS_FETCH');
      //console.log('GAME_NUMBERS_FETCH: ' + JSON.stringify(action.payload.data));

      // gameNumbers.map((ob) => {
      //   currentGameNumbers.push(ob);
      // });

      var userNumbers = action.payload.data.userNumbers;

      //console.log('userNumbers: ' + JSON.stringify(userNumbers));

      var allNumbers = userNumbers;
      var autoNumbers;
      var manualNumbers;

      if (userNumbers) {
        console.log('has user numbers');

        autoNumbers = userNumbers.filter((item) => item.autogenerated == 1);
        manualNumbers = userNumbers.filter((item) => item.autogenerated != 1);
      } else {
        console.log('no user numbers');
        autoNumbers = [];
        manualNumbers = [];
      }

      // autoNumbers = userNumbers.filter((item) => item.autogenerated == 1);
      // manualNumbers = userNumbers.filter((item) => item.autogenerated != 1);

      //var screen = action.payload.screen;

      return {
        ...state,
        gameNumbers: gameNumbers,
        myGameNumbers: allNumbers,
        autoNumbers: autoNumbers,
        manualNumbers: manualNumbers,
        refreshing: null,
      };

    case 'USER_GAME_NUMBERS_FETCH':
      console.log('USER_GAME_NUMBERS_FETCH');

      var allNumbers = action.payload;
      var autoNumbers = allNumbers.filter((item) => item.autogenerated == 1);
      var manualNumbers = allNumbers.filter((item) => item.autogenerated != 1);

      return {
        ...state,
        myGameNumbers: allNumbers,
        autoNumbers: autoNumbers,
        manualNumbers: manualNumbers,
      };

      case 'CLEAR_GAME_NUMBERS':
      console.log('CLEAR_GAME_NUMBERS');

      return {
        ...state,
        gameNumbers: [],
        gamesMyGameNumbers: [],
        autoNumbers: [],
        manualNumbers: [],
        
      };

      case 'CLEAR_MY_GAME_NUMBERS':
      console.log('CLEAR_MY_GAME_NUMBERS');

      return {
        ...state,
        // myGameNumbers: [],
        // myGamesGameNumbers: [],
        // myGamesMyGameNumbers: [],
        // myGamesAutoNumbers: [],
        // myGamesManualNumbers: [],
      };


    default:
      return state;
  }
};
