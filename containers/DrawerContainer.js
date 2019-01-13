import React from 'react'
import { Alert, StyleSheet, FlatList, View, Text, ScrollView, StatusBar, AsyncStorage, TouchableNativeFeedback, Platform, ImageBackground, TouchableOpacity, Button, Image, TextInput, Dimensions, TouchableHighlight } from 'react-native';
import { NavigationActions } from 'react-navigation'
import {onSignOut} from '../lib/auth';
const {height, width} = Dimensions.get('window');

export default class DrawerContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        screenHeight: height,
        clicked: false,
        paddingValue: 50
    }
}
onContentSizeChange = (contentWidth, contentHeight) => {
  this.setState({ screenHeight: contentHeight + 180 });
};

  render() {
    const { navigation } = this.props
    const scrollEnabled = this.state.screenHeight > height - 150;
    return (
      <ScrollView 
                style={{flex:1, paddingBottom: this.state.paddingValue}}
                contentContainerStyle={{flexGrow: 1, alignContent:'center', paddingBottom: this.state.paddingValue}}
                scrollEnabled={scrollEnabled}
                onContentSizeChange={this.onContentSizeChange}
                >
      <View style={styles.container}>
      <View style={{flex:1, minHeight: height, maxHeight:height}}>
        <Text
          onPress={() => navigation.navigate('FirstViewStack')}
          style={styles.uglyDrawerItem}>
          Dashboard
        </Text>
        <Text
          onPress={() => navigation.navigate('ThirdViewStack')}
          style={styles.uglyDrawerItem}>
          Scholarship Search
        </Text>
        <Text
          onPress={() => navigation.navigate('FourthViewStack')}
          style={styles.uglyDrawerItem}>
          School Search by GPA
        </Text>
        <Text
          onPress={() => navigation.navigate('ThirteenthViewStack')}
          style={styles.uglyDrawerItem}>
          School Search by Major
        </Text>
        <Text
          onPress={() => navigation.navigate('FifthViewStack')}
          style={styles.uglyDrawerItem}>
          GPA Calculator
        </Text>
        <Text
          onPress={() => navigation.navigate('SixthViewStack')}
          style={styles.uglyDrawerItem}>
          Buy Coins
        </Text>
        <Text
          onPress={() => navigation.navigate('SeventhViewStack')}
          style={styles.uglyDrawerItem}>
          Blog
        </Text>
        <Text
          onPress={() => navigation.navigate('EightthViewStack')}
          style={styles.uglyDrawerItem}>
          Forum
        </Text>
        <Text
          onPress={() => navigation.navigate('NinethViewStack')}
          style={styles.uglyDrawerItem}>
          About Us
        </Text>
        <Text
          onPress={() => this.setState({clicked: !this.state.clicked, paddingValue: 90, scrollEnabled: true})/*navigation.navigate('TenthViewStack')*/}
          style={styles.uglyDrawerItem}>
          Legal Terms
        </Text>
        {this.state.clicked?
        <View>
          <Text
            onPress={() => this.setState({clicked: !this.state.clicked})/*navigation.navigate('TenthViewStack')*/}
            style={styles.uglyDrawerItem}>
            Disclaimer
          </Text>
          <Text
          onPress={() => this.setState({clicked: !this.state.clicked})/*navigation.navigate('TenthViewStack')*/}
          style={styles.uglyDrawerItem}>
          Privacy Policy
        </Text>
        <Text
          onPress={() => this.setState({clicked: !this.state.clicked})/*navigation.navigate('TenthViewStack')*/}
          style={styles.uglyDrawerItem}>
          Terms and Conditions
        </Text>
        </View>
        :
        null
        }
        <Text
          onPress={()=> {
            let e = navigation;
            onSignOut(e)
          }
        }
          style={styles.uglyDrawerItem1}>
          Log Out
        </Text>
        </View>
      </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 15,
    paddingHorizontal: 20,
    maxHeight: height,
    minHeight: height
  },
  uglyDrawerItem: {
    fontSize: 18,
    fontFamily: 'AdventPro-Medium',
    color: 'black',
    padding: 15,
    margin: 0,
    textAlign: 'center'
  },
  uglyDrawerItem1: {
    fontSize: 19,
    fontFamily: 'AdventPro-Medium',
    color: '#E73536',
    padding: 15,
    margin: 3,
    borderRadius: 2,
    borderColor: '#E73536',
    borderWidth: 1,
    textAlign: 'center'
  }
})