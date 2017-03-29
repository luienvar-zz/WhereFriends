import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator
} from 'react-native';

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  LoginManager
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} = FBSDK;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 'false' means responseToken is not required. 'true' means responseToken is required
      responseToken: false,
    };
  }

  // This method gets the fb access token, if the token is returned then 
  // I render the Main App component (switchToMain method). If the
  // access token is not returned then I render a login Button (Refer to render method)
  async getAccessToken() {
    let _this = this;
    await (FBSDKAccessToken.getCurrentAccessToken((token) => {
      if(!token) {
        _this.setState({responseToken: true})
        return;
      }

      _this.setState({responseToken: true});
      _this.props.route.props.onLogin({user: true});
      _this.switchToMain();
    }));
  }

  switchToMain() {
    this.props.navigator.push({
      component: Home, // Render the app
      props: {
        onLogOut: this.onLogOut.bind(this)
      }
    });
  }

  componentDidMount() {
    this.getAccessToken();
  }

  onLoginButtonPress() {
    // Shows transition between login and Main Screen
    this.setState({responseToken: false})
    LoginManager.logInWithReadPermissions(['public_profile','email','user_friends'], (error, result) => {
      if (error) {
        alert('Error logging in');
      } else {
        if (result.isCancelled) {
          alert('Login cancelled');
        } else {
          this.setState({result});
          this.getAccessToken();
        }
      }
    });
  }

  onLogOut() {
    this.setState({responseToken: true});
  }

  render() {
    // This component renders when I am calling getAccessToken method
    if(!this.state.responseToken) {
      return (
        <Text></Text>
      );
    }

    // This renders when access token is not available after calling getAccessToken
    return (
      <View style={styles.container}>
        <TouchableHighlight
          onPress={this.onLoginButtonPress.bind(this)}
          >
          <View>
            // Login Button
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

// Removed the styling code