import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import  Login  from './src/screens/Login';
import  Home  from './src/screens/Home';


const WhereFriends = StackNavigator({
  Inicio: { screen: Login },
  Perfil:  { screen: Home  },
});

AppRegistry.registerComponent('WhereFriends', () => WhereFriends);

