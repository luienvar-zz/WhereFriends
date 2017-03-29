import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableHighlight,
  Button,
} from 'react-native';

export const FBSDK = require('react-native-fbsdk');
export const {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} = FBSDK;

class Login extends React.Component {
  static navigationOptions = {
    header: {
      visible : false,
    }
  }

  //Funcion que obtiene el accestoken de la cuenta que ingresa a facebook.
  //Para obtener el perfil de usuario se utiliza el accestoken y el metodo de GraphRequest de facebook
  async getAccesToken(_this) {
    var __this=_this
     await(AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log(data)
                    let accessToken = data.accessToken
                    let req = new GraphRequest('/me', 
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
                              __this.props.navigation.navigate('Perfil',{ user: res })
                            }
                        }
                    )
                    new GraphRequestManager().addRequest(req).start();
                  }));
  }

  //Funcion que se ejecuta una vez que se apreta el boton y que ejecuta la funcion para conectarse a facebook
  onLoginButton() {
    var _this=this
    LoginManager.logInWithReadPermissions(['public_profile']).then(
      function(result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log('Login success with permissions: '+result.grantedPermissions.toString());
          _this.getAccesToken(_this)
        }
      },
      function(error) {
        console.log('Login fail with error: ' + error);
      }
    );
  }

  render() {
    return (
      <Image source={require('../images/login.jpg')} style={styles.container}>
        <View style={styles.vista}>
          <TouchableHighlight onPress={this.onLoginButton.bind(this)}>
            <Text>
              Ingresa con Facebook
            </Text>
          </TouchableHighlight>
          <Button onPress={this.onLoginButton.bind(this)} title='Ingresa con Facebook' style={styles.boton}/>
        </View>
      </Image>
    );
  }

}

export default Login;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: null,
    height: null,
    //backgroundColor: '#F5FCFF',

  },
  vista: {
    justifyContent: 'center',
    flex:1,
  },
});