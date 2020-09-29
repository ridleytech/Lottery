import {c} from './actions';

export const updateNumber = ({number, status, url}) => {
  console.log('saveNumber: ' + number);

  return (dispatch) => {
    fetch(url + 'save-number.php', {
      method: 'POST',
      body: JSON.stringify({
        number: number,
        status: status,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log('response: ' + responseData);
      })
      .then((data) => {
        dispatch({type: 'NUMBER_SAVED', payload: data});
      })
      .catch((error) => console.log('error: ' + error));
  };
};

export const manageNumbers = (
  numbers,
  stateid: string,
  gameid: string,
  timeofday,
  userid: string,
  status,
  quickAdd: string,
  url: string,
) => {
  console.log(
    'numbers: ' +
      numbers +
      ' stateid: ' +
      stateid +
      ' gameid: ' +
      gameid +
      ' timeofday: ' +
      timeofday +
      ' userid: ' +
      userid +
      ' status: ' +
      status +
      ' quickAdd: ' +
      quickAdd,
  );

  console.log('url: ' + url + `manage-numbers.php`);

  return (dispatch) => {
    fetch(url + `manage-numbers.php`, {
      method: 'POST',
      body: JSON.stringify({
        numbers: numbers,
        stateid: stateid,
        gameid: gameid,
        timeofday: timeofday,
        status: status,
        userid: userid,
        quickAdd: quickAdd,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch({type: 'NUMBERS_MANAGED', payload: data});
      })
      .catch((error) => console.log(error));
  };
};

export const manageGame = (item) => {
  console.log('manageGame: ' + item.url + 'manage-game.php');

  console.log('gameid: ' + item.gameid);

  return (dispatch) => {
    fetch(item.url + `manage-game.php`, {
      method: 'POST',
      body: JSON.stringify({
        gameid: item.gameid,
        userid: item.userid,
        status: item.status,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.text())
      .then((response) => console.log(response))
      .then(() => {
        dispatch({type: 'USER_GAME_UPDATED', item: item});
      })
      .catch((error) => console.log(error));
  };
};

export const authUser = (user: any, phone: string) => (dispatch, getState) => {
  console.log('authUser: ' + JSON.stringify(user) + 'phone: ' + phone);

  //return;
  //user: user,

  let url = getState().url;

  fetch(url + `user-auth.php`, {
    method: 'POST',
    body: JSON.stringify({
      firstname: user.first_name,
      lastname: user.last_name,
      fbid: user.id,
      phone: phone,
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      dispatch({type: 'AUTH_USER', payload: response, user: user});
    })
    .catch((error) => console.log(error));
};

export const getGameNumbers = (
  sort: number,
  gameid: string,
  stateid: string,
  userid: string,
  url: string,
  page: number,
  currentMyNumbersPage: number,
  screen: string,
) => {
  var urlStr =
    url +
    'get-game-numbers.php?sort=' +
    sort +
    '&gameid=' +
    gameid +
    '&stateid=' +
    stateid +
    '&userid=' +
    userid +
    '&page=' +
    page +
    '&currentMyNumbersPage=' +
    currentMyNumbersPage;

  console.log('getGameNumbers: ' + urlStr);

  return (dispatch) => {
    fetch(urlStr)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch({type: 'GAME_NUMBERS_FETCH', payload: data, screen: screen});
      })
      .catch((error) => console.log(error));
  };
};

export const getUserNumbers = (
  userid: string,
  gameid: string,
  sort: number,
  url: string,
  page: number,
) => {
  var urlStr =
    url +
    'get-user-numbers.php?gameid=' +
    gameid +
    '&userid=' +
    userid +
    '&sort=' +
    sort +
    '&page=' +
    page;

  console.log('getUserNumbers: ' + urlStr);

  return (dispatch) => {
    fetch(urlStr)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch({type: 'USER_GAME_NUMBERS_FETCH', payload: data});
      })
      .catch((error) => console.log(error));
  };
};

export const getAvailableGames = (
  userid: string,
  stateid: string,
  url: string,
) => {
  var urlStr =
    url + 'get-available-games.php?userid=' + userid + '&stateid=' + stateid;

  console.log('getAvailableGames: ' + urlStr);

  return (dispatch) => {
    fetch(urlStr)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch({type: 'GAMES_FETCH', payload: data});
      })
      .catch((error) => console.log(error));
  };
};

export const getMyGames = (userid: string, url: string) => {
  var urlStr = url + 'get-my-games.php?userid=' + userid;

  console.log('getMyGames: ' + urlStr);

  return (dispatch) => {
    fetch(urlStr)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch({type: 'MY_GAMES_FETCH', payload: data});
      })
      .catch((error) => console.log(error));
  };
};

export const testThunk = () => (dispatch, getState) => {
  fetch('')
    .then((response) => {
      return response.json();
    })
    .then((payload) => {
      dispatch({type: '', payload: payload});
    });
};
