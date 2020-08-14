import PlayBtnDisabled from '../images/play-btn-disabled.png';
import PlayBtn from '../images/play-button.png';
import StopBtn from '../images/stop-button.png';
import RecordBtn from '../images/record-btn.png';
import {act} from 'react-test-renderer';

var local: Boolean = true;
var localPath = 'http://localhost:8888/ridtech/lotto/';
var remotePath = 'http://agiledevelopment.xyz/lotto/';
remotePath = 'http://ridleytechnologies.com/lotto/';

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
  myGameNumbers: [],
  selectedNumbers: [],
  selectedNumber: null,
  games: [],
  myGames: [],
  autoNumbers: [],
  manualNumbers: [],
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
  userid: 2,
  gamesNumbersPage: 0,
  gamesMyNumbersPage: 0,
  myGamesNumbersPage: 0,
  myGamesMyNumbersPage: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_USER':
      console.log('redux user: ' + JSON.stringify(action.user));
      return {
        ...state,
        user: action.user,
      };

    case 'LOGOUT_USER':
      console.log('logout redux');
      return {
        ...state,
        user: null,
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

      return {
        ...state,
        games: action.payload,
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

      return {
        ...state,
        //myGameNumbers: myCurrentNumbers,
        lastEditedNumbers: action.payload.gamerowid,
      };

    case 'SORT_MY_NUMBERS':
      console.log('SORT_MY_NUMBERS');

      action.sortStatus;

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
      console.log('GAME_NUMBERS_FETCH');

      return {
        ...state,
        gameNumbers: action.payload,
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

    default:
      return state;
  }
};
