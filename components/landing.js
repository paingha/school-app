import React from 'react';
import { StyleSheet, AsyncStorage, StatusBar, View, Text, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

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
    image: require('../assets/logo.png'),
    imageStyle: styles.image1,
    backgroundColor: '#67e6dc',
  },
  {
    key: 'second',
    title: 'Search School by GPA / Major',
    titleStyle: styles.title2,
    text: 'Personalize your evaluated GPA to search for schools you might qualify for and the opportunities abound. Search schools based by your GPA.',
    textStyle: styles.text4,
    image: require('../assets/logo.png'),
    imageStyle: styles.image4,
    backgroundColor: '#ff7f50',
  },
  {
    key: 'third',
    title: 'Scholarship Search',
    titleStyle: styles.title,
    text: 'Over 3,000 scholarships are made available specifically for international students. Find out which you qualify for!',
    textStyle: styles.text2,
    image: require('../assets/logo.png'),
    imageStyle: styles.image2,
    backgroundColor: '#febe29',
  },
  {
    key: 'fourth',
    title: 'GPA Calculator',
    titleStyle: styles.title,
    text: 'As an aspiring undergraduate/graduate student, evaluate your GPA to the US and Canada grade system; and it’s eligibility to your school of interest.',
    textStyle: styles.text3,
    image: require('../assets/logo.png'),
    imageStyle: styles.image3,
    backgroundColor: '#1abc9c',
  }
];

export default class Landing extends React.Component {
  constructor(props){
    super(props)
  this.state = {
    loadingNow: true,
    hasToken: false
  }
}
  _onDone = () => {
    AsyncStorage.setItem('@OnBoarded', "true", ()=> {
      this.setState({loadingNow: true})
    })
  }
  render() {
      return <AppIntroSlider slides={slides} onDone={this._onDone} onSkip={this._onDone} scrollEnabled={false} showSkipButton={true} bottomButton/>
  } 
}

