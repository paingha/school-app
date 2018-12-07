import React, { PureComponent } from 'react';
import { View, Text, ActivityIndicator, NetInfo, StatusBar, Dimensions, StyleSheet, ImageBackground, Image } from 'react-native';
import Loading from './loading';
const { width } = Dimensions.get('window');
function MiniOfflineSign() {
  return (
    <View style={styles.mainContainer}>
    <StatusBar
    barStyle="light-content"
  />
  <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
    </View>
    <ImageBackground source={require('../assets/login-bg.jpg')} style={styles.container}>
                <Image style={styles.logo} source={require('../assets/logo.png')}/>
                <Text style={styles.welcome}>
                Waiting for an Internet Connection
                </Text>
                <ActivityIndicator size="large" color="#ffffff"/>
              </ImageBackground>
              </View>
  );
}
class OfflineNotice extends PureComponent {
  render() {
      return <MiniOfflineSign />;
  }
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
        marginBottom: 15
      },
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    //top: 30
  },
  offlineText: { 
    color: '#fff'
  }
});
export default OfflineNotice;