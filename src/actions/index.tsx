export const calculateOffer = (txt: string, val: Number) => {
  return {
    type: 'CALCULATE_OFFER',
    txt: txt,
    val: val,
  };
};

export const authUser = (user) => {
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

export const selectHome = () => {
  return {
    type: 'SELECTED_HOME',
  };
};

export const selectGame = (game: Any) => {
  return {
    type: 'SELECTED_GAME',
    selectedGame: game,
  };
};

export const selectSettings = () => {
  return {
    type: 'SELECTED_SETTINGS',
  };
};

export const viewAccount = (val) => {
  console.log('viewAccount');

  return {
    type: 'SELECTED_VIEW_ACCOUNT',
    state: val,
  };
};

export const updateSourceIndex = (value: string, index: number) => {
  return {
    type: 'UPDATE_SOURCE_INDEX',
    selectedSourceIndex: index,
    selectedSource: value,
    selectedDestinationIndex: 0,
    selectedDestination: 'Select translation',
  };
};

export const updateDestinationIndex = (value: string, index: number) => {
  return {
    type: 'UPDATE_DESTINATION_INDEX',
    selectedDestinationIndex: index,
    selectedDestination: value,
  };
};

export const recordingSelected = (status, btn) => {
  return {
    type: 'SELECTED_RECORDING',
    selectedStatus: status,
    btn: btn,
  };
};

export const playSelected = (status) => {
  return {
    type: 'SELECTED_PLAY',
    selectedStatus: status,
  };
};

// export const selectNumbers = (numbers) => {
//   //console.log('selectNumbers');
//   return {
//     type: 'SELECT_NUMBERS',
//     selectedNumbers: numbers,
//   };
// };

// export const removeNumbers = (numbers) => {
//   //console.log('selectNumbers');
//   return {
//     type: 'REMOVE_NUMBERS',
//     selectedNumbers: numbers,
//   };
// };

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

export const formUpdate = ({prop, value}) => {
  console.log(prop + ': ' + value);

  return {
    type: 'FORM_UPDATE',
    payload: {prop, value},
  };
};
