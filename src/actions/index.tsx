export const authUser = (user: any) => {
  //console.log('action authUser: ' + JSON.stringify(user));

  return {
    type: 'AUTH_USER',
    user: user,
  };
};

export const logout = () => {
  //console.log('action authUser: ' + JSON.stringify(user));

  return {
    type: 'LOGOUT_USER',
  };
};

export const clearField = (txt: string) => {
  return {
    type: 'CLEAR_FIELD',
    txt: txt,
  };
};

export const selectGame = (game: any) => {
  return {
    type: 'SELECTED_GAME',
    selectedGame: game,
  };
};

export const setRefreshing = (status: any) => {
  return {
    type: 'SET_REFRESHING',
    status: status,
  };
};

export const updateScreen = (screen: number) => {
  return {
    type: 'UPDATE_SCREEN',
    screen: screen,
  };
};

export const sortMyNumbers = (status) => {
  //console.log('selectNumbers');
  return {
    type: 'SORT_MY_NUMBERS',
    sortStatus: status,
  };
};

export const showPlayed = (value) => {
  console.log('showPlayed: ' + value);

  return {
    type: 'SHOW_MOST_PLAYED',
    mostPlayed: value,
  };
};
