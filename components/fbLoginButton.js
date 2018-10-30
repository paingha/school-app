import React from 'react';
import { StyleSheet, View, Text, Image, TextInput, Dimensions, TouchableHighlight, KeyboardAvoidingView  } from 'react-native';
import {LoginButton} from 'react-native-fbsdk';

export default class FBLoginButton extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            response: '',
        }
    }

  render() {
      return(
        <LoginButton
          publishPermissions={["email"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("Login failed with error: " + error.message);
              } else if (result.isCancelled) {
                alert("Login was cancelled");
              } else {
                alert("Login was successful with permissions: " + result.grantedPermissions);
                this.setState({response: result})
                console.log(result)
              }
            }
          }
          onLogoutFinished={() => alert("User logged out")}/>
      )
  }
}