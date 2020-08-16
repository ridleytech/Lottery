import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Text, View, Button, Image, StyleSheet} from 'react-native';
import NumbersList from './NumbersList';
import ViewAccount from './ViewAccount';
import AvailableGames from './AvailableGames';
import CustomTabBar from './TabBar/CustomTabBar';

import API from './API';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Loading from './Loading';
import Logout from './Logout';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {authUser} from '../actions';
//import {Ionicons} from '@expo/vector-icons';
import HamburgerImg from '../images/hamburger.png';
import HeaderBackImg from './HeaderBackImg';
import CustomHeader from './CustomHeader';
import HeaderBackButton from './HeaderBackButton';
import HeaderBack from '../images/header-back-icon.png';
import MyGames from './MyGames';

const hamburgerMenu = (props) => {
  return (
    <View style={{marginLeft: 20, marginBottom: -13}}>
      <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
        <Image source={HamburgerImg} />
      </TouchableOpacity>
    </View>
  );
};

const BackBtn = (props, screen) => {
  return (
    <View style={{marginLeft: 17, marginBottom: -13}}>
      <TouchableOpacity onPress={() => props.navigation.navigate(screen)}>
        <Image source={HeaderBack} style={styles.headerImg} />
      </TouchableOpacity>
    </View>
  );
};

//Games screens

const GamesStack = createStackNavigator();
const GameStackScreen = (props) => (
  <GamesStack.Navigator>
    <GamesStack.Screen
      name="AvailableGames"
      component={AvailableGames}
      options={{
        headerTitle: 'Available Games',
        drawerLabel: 'Available Games',
        headerTitleStyle: {
          color: 'white',
          fontFamily: 'HelveticaNeue-Medium',
          fontSize: 21,
          letterSpacing: 0.93,
          marginBottom: -13,
        },
        headerStyle: {
          height: 90,
          backgroundColor: 'rgb(255,114,0)',
        },
        headerLeft: () => hamburgerMenu(props),
      }}
    />
    <GamesStack.Screen
      name="NumbersList"
      component={NumbersList}
      options={{
        // headerTitle: <CustomHeader props={props} />,
        headerTitle: `Numbers List`,
        headerTitleStyle: {
          color: 'white',
          fontFamily: 'HelveticaNeue-Medium',
          fontSize: 21,
          letterSpacing: 0.93,
          marginBottom: -13,
        },
        headerStyle: {
          height: 90,
          backgroundColor: 'rgb(255,114,0)',
        },
        headerTintColor: 'white',
        headerLeft: () => BackBtn(props, 'AvailableGames'),
        // headerBackImage: HeaderBackImg,
        // headerBackTitle: ' ',
        // headerLeft: (
        //   <HeaderBackButton onPress={() => navigation.goBack(null)} />
        // ),
      }}
    />
  </GamesStack.Navigator>
);

//My games screens

const MyGamesStack = createStackNavigator();
const MyGamesStackScreen = (props) => (
  <MyGamesStack.Navigator>
    <MyGamesStack.Screen
      name="MyGames"
      component={MyGames}
      options={{
        headerTitle: 'Joined Games',
        drawerLabel: 'Joined Games',
        headerTitleStyle: {
          color: 'white',
          fontFamily: 'HelveticaNeue-Medium',
          fontSize: 21,
          letterSpacing: 0.93,
          marginBottom: -13,
        },
        headerStyle: {
          height: 90,
          backgroundColor: 'rgb(255,114,0)',
        },
        headerLeft: () => hamburgerMenu(props),
      }}
    />
    <GamesStack.Screen
      name="NumbersList2"
      component={NumbersList}
      options={{
        // headerTitle: <CustomHeader props={props} />,
        headerTitle: `Numbers List`,
        headerTitleStyle: {
          color: 'white',
          fontFamily: 'HelveticaNeue-Medium',
          fontSize: 21,
          letterSpacing: 0.93,
          marginBottom: -13,
        },
        headerStyle: {
          height: 90,
          backgroundColor: 'rgb(255,114,0)',
        },
        headerTintColor: 'white',
        headerLeft: () => BackBtn(props, 'MyGames'),
      }}
    />
  </MyGamesStack.Navigator>
);

//bottom tabs

const AppTabs = createBottomTabNavigator();
const AppTabsScreen = () => (
  <AppTabs.Navigator
    tabBar={(props) => <CustomTabBar {...props} />}
    // tabBarOptions={{
    //   activeTintColor: 'rgb(62,28,74)',
    //   inactiveTintColor: 'rgb(151,151,151)',
    //   labelStyle: {
    //     fontSize: 12,
    //     fontFamily: 'HelveticaNeue-Bold',
    //     letterSpacing: 2,
    //   },
    // }}
  >
    <AppTabs.Screen name="HOME" component={GameStackScreen} key={1} />
    <AppTabs.Screen name="MY GAMES" component={MyGamesStackScreen} key={2} />
  </AppTabs.Navigator>
);

//side nav

const AppDrawer = createDrawerNavigator();
const AppDrawerScreen = () => (
  <AppDrawer.Navigator
    drawerPosition="left"
    drawerType="back"
    drawerContentOptions={{
      activeTintColor: 'rgb(62,28,74)',
    }}>
    <AppDrawer.Screen
      name="Tabs"
      component={AppTabsScreen}
      options={{drawerLabel: 'AvailableGames'}}
    />
    {/* <AppDrawer.Screen name="Settings" component={SettingsStackScreen} /> */}
    <AppDrawer.Screen name="Sign Out" component={Logout} />
  </AppDrawer.Navigator>
);

//authentication screens

const AuthStack = createStackNavigator();
const AuthStackScreen = (props) => {
  //console.log('AuthStackScreen props: ' + JSON.stringify(props));

  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Sign In" component={SignIn} />
      <AuthStack.Screen name="Sign Up" component={SignUp} />
    </AuthStack.Navigator>
  );
};

class Navigation extends Component {
  constructor(props: Props) {
    super(props);
  }

  state = {
    isLoading: true,
  };

  componentDidMount() {
    //throw new Error('My first Sentry error!');

    setTimeout(() => {
      this.setState({
        isLoading: !this.state.isLoading,
        //user: {username: 'ridley1224'},
      });

      this.props.authUser({username: 'ridley1224', password: '1224'});
    }, 500);
  }

  render() {
    return (
      <NavigationContainer>
        {this.state.isLoading ? (
          <Loading />
        ) : this.props.user ? (
          <AppDrawerScreen />
        ) : (
          <AuthStackScreen />
        )}
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const styles = StyleSheet.create({
  tabBar: {
    fontSize: 12,
  },
  headerImg: {
    width: 20,
    height: 20,
    //marginLeft: 17,
    // marginBottom: -10,
  },
});

export default connect(mapStateToProps, {authUser})(Navigation);