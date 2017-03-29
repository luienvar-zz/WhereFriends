import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Navigator
} from 'react-native';


const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} = FBSDK;

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 'false' means responseToken is not required. 'true' means responseToken is required
      responseToken: false,
    };
  }
  switchToMain() {
    this.props.navigator.push({
      component: Home, // Render the app
      props: {
        onLogOut: this.onLogOut.bind(this)
      }
    });
  }
 async getAccesToken() {
     await(AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log(data)
                    let accessToken = data.accessToken
                    /*let req = new GraphRequest('/me', 
                        {
                          parameters: {
                            fields: {string : 'email,name,friends,picture'},
                            accessToken: {string : accessToken.toString()}
                          }
                        },
                        (err, res) => {
                            if (err) {
                              console.log(err)
                            } else {
                              console.log(res)
                              console.log('Navegando a Home')
                              this.setState({responseToken: true};
                              this.props.route.props.onLogin({user: true}));
                              this.switchToMain();
                            }
                        }
                    )
                    new GraphRequestManager().addRequest(req).start();*/
                  }));
  }


  render() {
    return (
      <Image source={require('../images/login.jpg')} style={styles.container}>
        <View style={styles.vista}>
          <Text style={styles.welcome}>
            Welcome to React Native!
          </Text>
          <LoginButton
          readPermissions={['public_profile']}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("Login failed with error: " + result.error);
              } else if (result.isCancelled) {
                alert("Login was cancelled");
              } else {
                console.log("Login was successful with permissions: " + result.grantedPermissions)   
                //this.props.onLoginPress
                this.setState({result});
                this.getAccessToken();
              }
            }
          }
          onLogoutFinished={() => alert("User logged out")}
          LoginButton/>
        </View>
      </Image>
    );
  }
}

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
