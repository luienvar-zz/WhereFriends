
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';


export default class Login extends Component {
  render() {
    return (
      <Image source={require('../images/login.jpg')} style={styles.container}>
        <View style={styles.vista}>
          <Text style={styles.welcome}>
            Welcome to React Native!
          </Text>
          <login/>
        </View>
      </Image>
    );
  }
}

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
} = FBSDK;
      
var login = React.createClass({
  render: function() {
    return (
      <View>
        <LoginButton
          readPermissions={['public_profile']}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("Login failed with error: " + result.error);
              } else if (result.isCancelled) {
                alert("Login was cancelled");
              } else {
                alert("Login was successful with permissions: " + result.grantedPermissions)
                console.log(result)
                this.props.onLoginPress
              }
            }
          }
          onLogoutFinished={() => alert("User logged out")}/>
        </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#F5FCFF',
    width: null,
    height: null,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color: '#F0FFFF',
    margin: 10,
  },
  vista: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

AppRegistry.registerComponent('WhereFriends', () => WhereFriends);
