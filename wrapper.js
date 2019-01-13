import React from 'react';
import { StyleSheet, AsyncStorage, StatusBar, View, Text, Image, NetInfo } from 'react-native';
import { createRootNavigator } from "./router";
import { isSignedIn } from "./lib/auth";
import AppIntroSlider from 'react-native-app-intro-slider';
import OfflineNotice from './components/offline';
import { withNetworkConnectivity } from 'react-native-offline';

const styles = StyleSheet.create({
  image1: {
    width: 180,
    height: 220,
  },
  image2: {
    width: 180,
    height: 220,
  },
  image4: {
    width: 180,
    height: 220,
  },
  image3: {
    width: 180,
    height: 220,
  },
  title:{
    fontSize: 30,
    color: '#ffffff',
    //fontWeight: 'bold'
  },
  title2:{
    fontSize: 28,
    color: '#ffffff',
    //fontWeight: 'bold'
  },
  text:{
    fontSize: 25,
    color: '#ffffff',
  },
  text2:{
    fontSize: 20,
    color: '#ffffff',
  },
  text3:{
    fontSize: 20,
    color: '#ffffff',
  },
  text4:{
    fontSize: 19,
    color: '#ffffff',
    paddingBottom: 10
  }
}); 
const slides = [
  {
    key: 'first',
    title: 'Welcome to The Academist',
    titleStyle: styles.title,
    text: 'Where Education Transcends Borders',
    textStyle: styles.text,
    image: require('./assets/logo.png'),
    imageStyle: styles.image1,
    backgroundColor: '#67e6dc',
  },
  {
    key: 'second',
    title: 'Search School by GPA / Major',
    titleStyle: styles.title2,
    text: 'Personalize your evaluated GPA to search for schools you might qualify for and the opportunities abound. Search schools based by your GPA.',
    textStyle: styles.text4,
    image: require('./assets/logo.png'),
    imageStyle: styles.image4,
    backgroundColor: '#ff7f50',
  },
  {
    key: 'third',
    title: 'Scholarship Search',
    titleStyle: styles.title,
    text: 'Over 3,000 scholarships are made available specifically for international students. Find out which you qualify for!',
    textStyle: styles.text2,
    image: require('./assets/logo.png'),
    imageStyle: styles.image2,
    backgroundColor: '#febe29',
  },
  {
    key: 'fourth',
    title: 'GPA Calculator',
    titleStyle: styles.title,
    text: 'As an aspiring undergraduate/graduate student, evaluate your GPA to the US and Canada grade system; and it’s eligibility to your school of interest.',
    textStyle: styles.text3,
    image: require('./assets/logo.png'),
    imageStyle: styles.image3,
    backgroundColor: '#1abc9c',
  }
];


class Wrapper extends React.Component {
  constructor(props){
    super(props)
  this.state = {
    signedIn: null,
    checkedSignIn: false,
    boardingState: this.props.boardState,
    isConnected: false
  }
}
  _onDone = () => {
    AsyncStorage.setItem('@OnBoarded', "true").then(()=>
      this.setState({boardingState: "true"})
  )
  }
  render() { 
    const { checkedSignIn, signedIn } = this.props;
    if (!checkedSignIn) {
      return null;
    }
      if(this.state.boardingState == "true") {
        const Layout = createRootNavigator(signedIn);
        if (this.props.isConnected){
          return <Layout />
        }else{
          return <OfflineNotice />
        }
      
    } else {
      return <AppIntroSlider slides={slides} onDone={this._onDone} onSkip={this._onDone} scrollEnabled={false} showSkipButton={true} bottomButton/>;
    }
  } 
}

export default withNetworkConnectivity({
  withRedux: false,
  timeout: 4000,
  pingServerUrl: 'https://www.google.com/',
  withExtraHeadRequest: true,
  checkConnectionInterval: 3000,
  checkIntervalOfflineOnly: false,
  checkInBackground: false,
  httpMethod: 'HEAD',
})(Wrapper);