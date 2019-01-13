import React from 'react'
import { StyleSheet, ActivityIndicator, AsyncStorage, ImageBackground, StatusBar, View, Text, Image } from 'react-native';

export default class Loading extends React.Component{
    render(){
        return(
          <ImageBackground source={require('../assets/login-bg.jpg')} style={styles.container}>
                <StatusBar
                  barStyle="light-content"
                />
                <Image style={styles.logo} source={require('../assets/logo.png')}/>
                <Text style={styles.welcome}>
                
                </Text>
                <ActivityIndicator size="large" color="#ffffff"/>
              </ImageBackground>
            )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    logo: {
      width: 160,
      height: 185,
      marginTop: -10
    },
    welcome: {
      fontSize: 30,
      textAlign: 'center',
      marginTop: 20,
      color: '#F5FCFF',
      marginBottom: 15
    }
  });