import React from 'react';
import { StyleSheet, View, Text, Image, TextInput, Dimensions, ImageBackground, TouchableHighlight, KeyboardAvoidingView, StatusBar  } from 'react-native';

export default class SentScreen extends React.Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }
    static navigationOptions = {
        header: null
      };

      render(){
        return(
          <ImageBackground source={require('../assets/login-bg.jpg')} style={styles.container}>
                <Image style={styles.logo} source={require('../assets/logo.png')}/>
                <Text style={styles.welcome}>
                A password reset email
                </Text>
                <Text style={styles.welcome1}>
                has been sent to your email!
                </Text>
                <Text style={styles.link} onPress={() => this.props.navigation.navigate('SignIn')}>
                Login
                </Text>
                </ImageBackground>
            
            )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#4F6D7A',
    },
    logo: {
      width: 160,
      height: 185,
      marginTop: -10
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      marginTop: 20,
      color: '#F5FCFF',
    },
    welcome1: {
      fontSize: 20,
      textAlign: 'center',
      marginTop: 3,
      color: '#F5FCFF',
    },
    link: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 80,
        color: '#F5FCFF',
      }
  });