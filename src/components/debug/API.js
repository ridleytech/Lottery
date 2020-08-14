import React, {Component} from 'react';
import {View} from 'react-native';
import 'isomorphic-fetch';

class API extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // var localPath = 'http://localhost:8888/ridtech/lotto/';
    // this.getAvailableGames(1, localPath).then((data) => {
    //   //console.log('results: ' + data);
    //   console.log('results: ' + JSON.stringify(data));
    // });
  }

  getAvailableGames = (stateid, url) => {
    var urlStr = url + 'get-games.php?stateid=' + stateid;

    //console.log('getAvailableGames: ' + urlStr);

    return fetch(urlStr)
      .then((response) => {
        //console.log('got em');

        return response.json();
      })
      .catch((error) => console.log(error));
  };

  render() {
    return <View></View>;
  }
}

export default API;
