import React, {Component} from 'react';
import {View} from 'react-native';
import 'isomorphic-fetch';

class API extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // var localPath = 'http://localhost:8888/ridleytech/lottery/';
    // this.getAvailableGames(1, localPath).then((data) => {
    //   //console.log('results: ' + data);
    //   console.log('results: ' + JSON.stringify(data));
    // });
  }

  testStuff = () => {
    console.log('testing');
  };

  getAvailableGames = (stateid, userid) => {
    var urlStr =
      'http://localhost:8888/ridleytech/lottery/' +
      'get-available-games.php?userid=' +
      userid +
      '&stateid=' +
      stateid;

    //console.log('getAvailableGames: ' + urlStr);

    return (
      fetch(urlStr)
        .then((response) => {
          //console.log('got em component');

          return response.json();
        })
        // .then((response) => {
        //   console.log('response: ' + JSON.stringify(response));
        // })
        .catch((error) => console.log(error))
    );
  };

  render() {
    return <View></View>;
  }
}

export default API;
