import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Cash3 from '../images/cash3.png';
import {render} from '@testing-library/react-native';

function GameInfo({item, manageGame, viewingNumbers, minutes, url}) {
  var flag = Cash3;

  // const [currentTime, setCurrentTime] = useState({time: ''});

  // let seconds = minutes * 60;
  // let totalTime = seconds * 100;
  // var usedTime = 0;
  // var startTime = +new Date();
  // var timer = null;

  // useEffect(() => {
  //   //timer = setInterval(count, 10);

  //   setCurrentTime({time: '00:00.00'});
  // }, []);

  // var count = function () {
  //   usedTime = Math.floor((+new Date() - startTime) / 10);

  //   var tt = totalTime - usedTime;
  //   if (tt <= 0) {
  //     setCurrentTime({time: '00:00.00'});

  //     clearInterval(timer);
  //   } else {
  //     var mi = Math.floor(tt / (60 * 100));
  //     var ss = Math.floor((tt - mi * 60 * 100) / 100);
  //     var ms = tt - Math.floor(tt / 100) * 100;

  //     setCurrentTime({
  //       time: fillZero(mi) + ':' + fillZero(ss) + '.' + fillZero(ms),
  //     });
  //   }
  // };

  var fillZero = function (num) {
    if (num === 0) {
      return '00';
    } else {
      return num < 10 ? '0' + num : num;
    }
  };

  function timezoneShifter(date, timezone) {
    let isBehindGTM = false;
    if (timezone.startsWith('-')) {
      timezone = timezone.substr(1);
      isBehindGTM = true;
    }

    const [hDiff, mDiff] = timezone.split(':').map((t) => parseInt(t));
    const diff = hDiff * 60 + mDiff * (isBehindGTM ? 1 : -1);
    const currentDiff = new Date().getTimezoneOffset();

    return new Date(date.valueOf() + (currentDiff - diff) * 60 * 1000);
  }

  const calculateTimeLeft = () => {
    //let year = new Date().getFullYear();
    //const difference = +new Date(`8 24, 2020 ${item.nextDraw}:00:00`) - +new Date();

    const difference = +new Date(item.nextDraw.date) - +new Date();

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        //days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  //const [year] = useState(new Date().getFullYear());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    // if (!timeLeft[interval]) {
    //   return;
    // }

    timerComponents.push(<Text>{fillZero(timeLeft[interval])}</Text>);
  });

  //console.log('timerComponents: ' + JSON.stringify(timerComponents));

  let image = url + '/images/lottery/' + item.image;

  const _now = new Date();

  return (
    <View style={styles.container2}>
      <View style={styles.view1}>
        <Image
          source={{
            uri: image,
          }}
          style={styles.headerImg}
        />
        <Text style={styles.gameLbl}>{item.gameDescription}</Text>
        <TouchableOpacity onPress={() => manageGame()}>
          <Text style={item.joined == '1' ? styles.leaveBtn : styles.joinBtn}>
            {item.joined == '1' ? 'LEAVE' : 'JOIN'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.view2}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.numbersCell}>{item.participants}</Text>
            <Text style={styles.font9}>Number of{'\n'}Participants</Text>
          </View>

          <View style={{flexDirection: 'column'}}>
            <Text style={styles.numbersCell}>{item.uniqueNumbers}</Text>
            <Text style={styles.font9}>Available{'\n'}Unique Numbers</Text>
          </View>
        </View>
        <View>
          <Text style={[styles.nextDraw]}>
            Next Draw -{' '}
            {/* <Text style={[styles.nextDraw2]}>{currentTime.time}</Text> */}
            {timerComponents.length ? (
              <Text style={[styles.nextDraw2]}>
                {fillZero(timerComponents[0])}
                {':'}
                {fillZero(timerComponents[1])}
                {':'}
                {fillZero(timerComponents[2])}
              </Text>
            ) : (
              <Text>Time's up!</Text>
            )}
            {/* <Text>{timezoneShifter(_now, '-04:00').toLocaleString()}</Text> */}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default GameInfo;

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
    //backgroundColor: 'red',
    minWidth: 140,
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
